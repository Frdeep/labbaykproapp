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
        "fixed z-50",
        // Mobile positioning
        "bottom-0 left-0 right-0 h-[80px] safe-bottom px-6 border-t border-ink-100/50",
        "flex flex-row items-center justify-between",
        // Desktop positioning
        "lg:top-0 lg:bottom-0 lg:right-auto lg:w-[240px] lg:h-dvh lg:px-4 lg:py-8 lg:border-t-0 lg:border-r lg:flex-col lg:justify-start lg:gap-2",
        "bg-ivory-50/80 backdrop-blur-2xl",
        className
      )}
    >
      <div className="hidden lg:flex mb-8 px-4 items-center gap-2">
        <div className="w-8 h-8 bg-beige-900 rounded-lg flex items-center justify-center">
          <span className="text-gold-300 font-bold text-sm">L</span>
        </div>
        <span className="text-h2 text-ink-900">Labbayk</span>
      </div>

      {tabs.map((tab) => {
        const isActive = activeId === tab.id;
        
        return (
          <button
            key={tab.id}
            onClick={() => onChange(tab.id)}
            className={cn(
              "relative flex outline-none tap-highlight-transparent transition-all",
              // Mobile style
              "flex-col items-center justify-center w-12 h-12",
              // Desktop style
              "lg:flex-row lg:w-full lg:h-auto lg:py-3 lg:px-4 lg:rounded-2xl lg:justify-start lg:gap-3",
              isActive ? "lg:bg-beige-900/5" : "hover:lg:bg-ink-100/30"
            )}
          >
            <div className={cn(
              "transition-colors duration-300",
              isActive ? "text-beige-900" : "text-ink-300"
            )}>
              {isActive ? tab.activeIcon : tab.icon}
            </div>
            
            <span className={cn(
              "hidden lg:block text-[15px] font-medium transition-colors duration-300",
              isActive ? "text-beige-900" : "text-ink-500"
            )}>
              {tab.label}
            </span>

            {/* Animated active dot indicator (Mobile only) */}
            {isActive && (
              <motion.div
                layoutId="tab-indicator"
                className="absolute -bottom-1 lg:hidden w-1 h-1 rounded-full bg-gold-600"
                transition={{ type: "spring", stiffness: 500, damping: 30 }}
              />
            )}
          </button>
        )
      })}
    </div>
  )
}
