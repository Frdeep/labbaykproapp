"use client"

import * as React from "react"
import { motion } from "motion/react"
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
    <nav
      aria-label="Navigation principale"
      className={cn(
        "fixed z-50",
        // Mobile positioning
        "bottom-0 left-0 right-0 h-[80px] safe-bottom px-4 border-t border-ink-100/40",
        "flex flex-row items-center justify-around",
        // Desktop positioning — sidebar
        "lg:top-0 lg:bottom-0 lg:right-auto lg:w-[240px] lg:h-dvh lg:px-4 lg:py-8 lg:border-t-0 lg:border-r lg:border-ink-100/30 lg:flex-col lg:justify-start lg:gap-1",
        "bg-ivory-50/85 backdrop-blur-2xl backdrop-saturate-150",
        className
      )}
    >
      {/* Desktop Logo */}
      <div className="hidden lg:flex mb-8 px-4 items-center gap-3">
        <div className="w-9 h-9 bg-beige-900 rounded-xl flex items-center justify-center shadow-card">
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
            aria-label={tab.label}
            aria-current={isActive ? 'page' : undefined}
            className={cn(
              "relative flex outline-none tap-highlight-transparent transition-all duration-200",
              // Mobile — column icon + label
              "flex-col items-center justify-center gap-1 w-16 h-14",
              // Desktop — row icon + label
              "lg:flex-row lg:w-full lg:h-auto lg:py-3 lg:px-4 lg:rounded-2xl lg:justify-start lg:gap-3",
              isActive
                ? "lg:bg-beige-900/8"
                : "hover:lg:bg-ink-100/30"
            )}
          >
            <div className={cn(
              "transition-colors duration-300",
              isActive ? "text-beige-900" : "text-ink-300"
            )}>
              {isActive ? tab.activeIcon : tab.icon}
            </div>
            
            {/* Mobile label — always visible */}
            <span className={cn(
              "text-[10px] font-medium transition-colors duration-300 lg:hidden",
              isActive ? "text-beige-900" : "text-ink-400"
            )}>
              {tab.label}
            </span>

            {/* Desktop label */}
            <span className={cn(
              "hidden lg:block text-[15px] font-medium transition-colors duration-300",
              isActive ? "text-beige-900" : "text-ink-500"
            )}>
              {tab.label}
            </span>

            {/* Animated active indicator — mobile dot */}
            {isActive && (
              <motion.div
                layoutId="tab-indicator"
                className="absolute -bottom-1.5 lg:hidden w-5 h-[3px] rounded-full bg-gold-600"
                transition={{ type: "spring", stiffness: 500, damping: 30 }}
              />
            )}

            {/* Desktop active indicator — left bar */}
            {isActive && (
              <motion.div
                layoutId="tab-indicator-desktop"
                className="hidden lg:block absolute left-0 top-1/2 -translate-y-1/2 w-[3px] h-6 rounded-r-full bg-gold-600"
                transition={{ type: "spring", stiffness: 500, damping: 30 }}
              />
            )}
          </button>
        )
      })}
    </nav>
  )
}
