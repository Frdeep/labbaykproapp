'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Upload, CheckCircle2, AlertCircle, File, Loader2 } from 'lucide-react';
import { createClient } from '@/lib/supabase-browser';
import type { DocType } from '@/types/document';

interface DocumentUploadCardProps {
  userId: string;
  docType: DocType;
  title: string;
  description: string;
  onUploadSuccess?: (url: string) => void;
}

export function DocumentUploadCard({ userId, docType, title, description, onUploadSuccess }: DocumentUploadCardProps) {
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');

  async function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const selected = e.target.files?.[0];
    if (!selected) return;

    if (selected.size > 5 * 1024 * 1024) {
      alert('Le fichier est trop volumineux (max 5 Mo).');
      return;
    }

    setFile(selected);
    await uploadFile(selected);
  }

  async function uploadFile(fileToUpload: File) {
    setUploading(true);
    setStatus('idle');
    setProgress(10);

    const supabase = createClient();
    const fileExt = fileToUpload.name.split('.').pop();
    const fileName = `${userId}/${docType}_${Date.now()}.${fileExt}`;

    try {
      // 1. Upload to storage
      setProgress(50);
      const { data: storageData, error: storageError } = await supabase.storage
        .from('documents')
        .upload(fileName, fileToUpload, {
          cacheControl: '3600',
          upsert: true,
        });

      if (storageError) throw storageError;
      setProgress(80);

      // 2. Get Public URL
      const { data: { publicUrl } } = supabase.storage.from('documents').getPublicUrl(fileName);

      // 3. Save to database
      const { error: dbError } = await supabase.from('documents').insert({
        user_id: userId,
        doc_type: docType,
        file_url: publicUrl,
        file_name: fileToUpload.name,
        file_size: fileToUpload.size,
        mime_type: fileToUpload.type,
        validation_status: 'pending',
      });

      if (dbError) throw dbError;

      setProgress(100);
      setStatus('success');
      onUploadSuccess?.(publicUrl);
    } catch (err: any) {
      console.error('Upload Error:', err);
      setStatus('error');
    } finally {
      setTimeout(() => setUploading(false), 500);
    }
  }

  return (
    <div className="bg-white rounded-2xl p-5 shadow-card flex flex-col gap-4">
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-ink-100 flex items-center justify-center text-ink-500">
            {status === 'success' ? (
              <CheckCircle2 className="w-5 h-5 text-state-success" />
            ) : status === 'error' ? (
              <AlertCircle className="w-5 h-5 text-state-error" />
            ) : (
              <File className="w-5 h-5" />
            )}
          </div>
          <div>
            <h3 className="text-body font-semibold text-ink-900">{title}</h3>
            <p className="text-[12px] text-ink-400">{description}</p>
          </div>
        </div>
      </div>

      {uploading ? (
        <div className="flex flex-col gap-2">
          <div className="flex items-center justify-between text-[11px] text-ink-500 font-medium">
            <span className="flex items-center gap-1">
              <Loader2 className="w-3 h-3 animate-spin" /> Transfert en cours...
            </span>
            <span>{progress}%</span>
          </div>
          <div className="h-1.5 w-full bg-ink-100 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-beige-900"
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
            />
          </div>
        </div>
      ) : status === 'success' ? (
        <div className="flex items-center justify-between py-2 px-3 bg-state-success/10 rounded-xl">
          <span className="text-[13px] text-state-success font-medium truncate max-w-[200px]">
            {file?.name || 'Document reçu'}
          </span>
          <button
            onClick={() => { setFile(null); setStatus('idle'); }}
            className="text-[11px] text-state-success underline hover:opacity-80"
          >
            Modifier
          </button>
        </div>
      ) : (
        <label className="flex items-center justify-center gap-2 py-3 border border-dashed border-ink-200 rounded-xl text-[13px] text-ink-500 hover:bg-ink-50 hover:border-ink-300 transition-colors cursor-pointer cursor-allowed">
          <Upload className="w-4 h-4" />
          {status === 'error' ? <span className="text-state-error">Échec, réessayer</span> : <span>Choisir un fichier</span>}
          <input
            type="file"
            accept="image/*,.pdf"
            className="hidden"
            onChange={handleFileChange}
          />
        </label>
      )}
    </div>
  );
}
