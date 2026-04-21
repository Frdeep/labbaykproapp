'use client';

import { 
  Plane, Hotel, Gift, HeartHandshake, 
  Compass, Map, Sparkles, User, Home
} from 'lucide-react';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { ActionSquare } from '@/components/ui/action-square';
import { BottomTabBar } from '@/components/ui/bottom-tab-bar';
import { DestinationCard } from '@/components/ui/destination-card';
import { Input } from '@/components/ui/input';
import { Logo } from '@/components/common';

export default function UIKitPage() {
  const [activeTab, setActiveTab] = useState('home');

  const tabs = [
    { id: 'home', icon: <Home size={24} strokeWidth={1.5} />, activeIcon: <Home size={24} strokeWidth={2.5} />, label: 'Home' },
    { id: 'compass', icon: <Compass size={24} strokeWidth={1.5} />, activeIcon: <Compass size={24} strokeWidth={2.5} />, label: 'Compass' },
    { id: 'explore', icon: <Map size={24} strokeWidth={1.5} />, activeIcon: <Map size={24} strokeWidth={2.5} />, label: 'Explore' },
    { id: 'services', icon: <Sparkles size={24} strokeWidth={1.5} />, activeIcon: <Sparkles size={24} strokeWidth={2.5} />, label: 'Services' },
    { id: 'profile', icon: <User size={24} strokeWidth={1.5} />, activeIcon: <User size={24} strokeWidth={2.5} />, label: 'Profile' },
  ];

  return (
    <div className="min-h-screen bg-ivory-50 pb-28">
      {/* Simulated Topbar */}
      <header className="px-6 pt-14 pb-4 flex items-center justify-between">
        <div className="w-10 h-10 rounded-full bg-sand-200" />
        <Logo size="md" />
        <div className="w-10 h-10 flex flex-col justify-center items-end gap-1.5 opacity-80 cursor-pointer">
          <div className="w-6 h-0.5 bg-ink-900" />
          <div className="w-4 h-0.5 bg-ink-900" />
          <div className="w-6 h-0.5 bg-ink-900" />
        </div>
      </header>

      <main className="px-6 mt-8 space-y-12">
        
        {/* Buttons Showcase */}
        <section>
          <h2 className="text-title mb-4">Shadcn Custom Buttons</h2>
          <div className="flex flex-wrap gap-4">
            <Button variant="emerald" shape="bubble">Primary Emerald</Button>
            <Button variant="gold" shape="bubble">Primary Gold</Button>
            <Button variant="default">Default Ink</Button>
            <Button variant="secondary" shape="pill">Secondary Pill</Button>
            <Button variant="ghost-gold">Ghost Gold</Button>
          </div>
        </section>

        {/* Inputs */}
        <section>
          <h2 className="text-title mb-4">Inputs</h2>
          <div className="space-y-4 max-w-sm">
            <Input placeholder="Enter your email address" />
            <Input type="password" placeholder="Password" />
          </div>
        </section>

        {/* Action Squares (Grid matches the reference) */}
        <section>
          <h2 className="text-title mb-4">Quick Actions</h2>
          <div className="grid grid-cols-4 gap-3 max-w-md mx-auto">
            <ActionSquare icon={<Plane size={24} />} label="Vols" />
            <ActionSquare icon={<Hotel size={24} />} label="Hôtels" />
            <ActionSquare icon={<Gift size={24} />} label="Packages" />
            <ActionSquare icon={<HeartHandshake size={24} />} label="Concierge" />
          </div>
        </section>

        {/* Carousel / Destination Cards */}
        <section>
          <h2 className="text-title mb-4">Destinations (Bento Cards)</h2>
          <div className="flex gap-4 overflow-x-auto pb-4 snap-x snap-mandatory hide-scrollbar">
            <DestinationCard 
              imageSrc="https://images.unsplash.com/photo-1565552645632-d725f8bfc19a?q=80&w=600&auto=format&fit=crop"
              title="Luxury Umrah - Makkah"
              price="2 500 €"
            />
            <DestinationCard 
              imageSrc="https://images.unsplash.com/photo-1580418827493-f2b22c0a76cb?q=80&w=600&auto=format&fit=crop"
              title="Luxury Umrah - Resort"
              price="2 300 €"
            />
            <DestinationCard 
              imageSrc="https://images.unsplash.com/photo-1598132906801-fcaf3cddcecb?q=80&w=600&auto=format&fit=crop"
              title="Madinah Serenity"
              price="1 800 €"
            />
          </div>
        </section>
      </main>

      {/* Bottom Bar Interactive */}
      <BottomTabBar tabs={tabs} activeId={activeTab} onChange={setActiveTab} />
    </div>
  );
}
