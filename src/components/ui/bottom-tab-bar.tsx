"use client"

import * as React from "react"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"

export type TabItem = {
  id: string;
  icon: React.ReactNode;
  activeIcon: React.ReactNode;
  label: string;
}

interface BottomTabBarProps {
  tabs: TabItem[];
  activeId: string;
  onChange: (id: string) => void;
  className?: string;
}

export function BottomTabBar({ tabs, activeId, onChange, className }: BottomTabBarProps) {
  return (
    <div
      className={cn(
        "fixed bottom-0 left-0 right-0 z-50",
        "h-[80px] safe-bottom px-6",
        "bg-ivory-50/80 backdrop-blur-2xl border-t border-ink-100/50",
        "flex items-center justify-between",
        className
      )}
    >
      {tabs.map((tab) => {
        const isActive = activeId === tab.id;
        
        return (
          <button
            key={tab.id}
            onClick={() => onChange(tab.id)}
            className="relative flex flex-col items-center justify-center w-12 h-12 outline-none tap-highlight-transparent"
          >
            <div className={cn(
              "transition-colors duration-300",
              isActive ? "text-beige-900" : "text-ink-300"
            )}>
              {isActive ? tab.activeIcon : tab.icon}
            </div>
            
            {/* Animated active dot indicator */}
            {isActive && (
              <motion.div
                layoutId="tab-indicator"
                className="absolute -bottom-1 w-1 h-1 rounded-full bg-gold-600"
                transition={{ type: "spring", stiffness: 500, damping: 30 }}
              />
            )}
          </button>
        )
      })}
    </div>
  )
}
