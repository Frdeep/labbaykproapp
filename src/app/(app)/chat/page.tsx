'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, Sparkles, RotateCcw } from 'lucide-react';
import { ScreenHeader } from '@/components/layout/screen-header';
import { useChatStore, type ChatMessage } from '@/features/chat/use-chat-store';

const suggestions = [
  'Comment faire le Tawaf ?',
  'Quels documents pour la Omra ?',
  'Horaires de l\'agence ?',
  'Les étapes du Hajj ?',
];

export default function ChatPage() {
  const [input, setInput] = useState('');
  const { messages, isStreaming, addMessage, setStreaming, clearMessages } = useChatStore();
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: 'smooth' });
  }, [messages]);

  async function handleSend(text?: string) {
    const message = text || input.trim();
    if (!message || isStreaming) return;

    setInput('');
    addMessage({ role: 'user', content: message });
    setStreaming(true);

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: [...messages, { role: 'user', content: message }],
        }),
      });

      const data = await res.json();
      addMessage({ role: 'assistant', content: data.content });
    } catch {
      addMessage({ role: 'assistant', content: 'Désolé, une erreur est survenue. Réessayez.' });
    } finally {
      setStreaming(false);
    }
  }

  return (
    <div className="flex flex-col h-dvh">
      <ScreenHeader
        title={
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-gold-500" />
            <span>Assistant Labbayk</span>
          </div>
        }
        rightAction={
          messages.length > 0 ? (
            <button onClick={clearMessages} className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-ink-100/50">
              <RotateCcw className="w-4 h-4 text-ink-400" />
            </button>
          ) : null
        }
      />

      {/* Messages */}
      <div ref={scrollRef} className="flex-1 overflow-y-auto px-5 py-4 space-y-4 pb-32">
        {messages.length === 0 && (
          <div className="flex flex-col items-center justify-center py-12 gap-6">
            <div className="w-20 h-20 rounded-3xl bg-beige-900 flex items-center justify-center shadow-float">
              <Sparkles className="w-10 h-10 text-gold-300" />
            </div>
            <div className="text-center space-y-2">
              <h2 className="text-h2 text-ink-900">Assalamu Alaykum !</h2>
              <p className="text-body text-ink-400 max-w-[280px]">
                Je suis votre assistant spirituel. Posez-moi vos questions sur le Hajj, la Omra ou nos formules.
              </p>
            </div>

            {/* Suggestion pills */}
            <div className="flex flex-wrap gap-2 justify-center">
              {suggestions.map((s) => (
                <button
                  key={s}
                  onClick={() => handleSend(s)}
                  className="px-4 py-2 rounded-pill border border-ink-200 text-[13px] text-ink-500 hover:bg-beige-900 hover:text-gold-300 hover:border-beige-900 transition-all duration-200"
                >
                  {s}
                </button>
              ))}
            </div>
          </div>
        )}

        <AnimatePresence>
          {messages.map((msg) => (
            <motion.div
              key={msg.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-[85%] rounded-2xl px-4 py-3 ${
                  msg.role === 'user'
                    ? 'bg-beige-900 text-gold-100 rounded-br-md'
                    : 'bg-white text-ink-700 shadow-card rounded-bl-md'
                }`}
              >
                <p className="text-body whitespace-pre-wrap">{msg.content}</p>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>

        {isStreaming && (
          <div className="flex justify-start">
            <div className="bg-white rounded-2xl rounded-bl-md px-4 py-3 shadow-card">
              <div className="flex gap-1">
                {[0, 1, 2].map((i) => (
                  <motion.div
                    key={i}
                    className="w-2 h-2 rounded-full bg-ink-300"
                    animate={{ opacity: [0.3, 1, 0.3] }}
                    transition={{ duration: 1, repeat: Infinity, delay: i * 0.2 }}
                  />
                ))}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Input bar */}
      <div className="fixed bottom-[80px] left-0 right-0 bg-ivory-50/90 backdrop-blur-xl border-t border-ink-100/30 px-5 py-3 safe-bottom">
        <form
          onSubmit={(e) => { e.preventDefault(); handleSend(); }}
          className="flex items-center gap-3"
        >
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Posez votre question..."
            className="flex-1 h-12 rounded-xl border border-ink-200 bg-white px-4 text-body placeholder:text-ink-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus"
            disabled={isStreaming}
          />
          <button
            type="submit"
            disabled={!input.trim() || isStreaming}
            className="w-12 h-12 rounded-xl bg-beige-900 flex items-center justify-center text-gold-300 disabled:opacity-50 transition-opacity"
          >
            <Send className="w-5 h-5" />
          </button>
        </form>
      </div>
    </div>
  );
}
