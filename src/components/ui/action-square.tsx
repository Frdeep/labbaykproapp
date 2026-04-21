"use client"

import * as React from "react"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"

interface ActionSquareProps extends React.ComponentProps<typeof motion.button> {
  icon: React.ReactNode;
  label: string;
}

export function ActionSquare({ icon, label, className, ...props }: ActionSquareProps) {
  return (
    <motion.button
      whileTap={{ scale: 0.94 }}
      whileHover={{ y: -2 }}
      transition={{ type: "spring", stiffness: 400, damping: 17 }}
      className={cn(
        "flex flex-col items-center justify-center gap-2",
        "w-full aspect-square bg-emerald-900 rounded-[28px]",
        "shadow-card focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus",
        "group",
        className
      )}
      {...props}
    >
      <div className="text-gold-300 group-hover:text-gold-100 transition-colors duration-300">
        {icon}
      </div>
      <span className="text-[12px] font-medium text-gold-300/90 leading-tight">
        {label}
      </span>
    </motion.button>
  )
}
