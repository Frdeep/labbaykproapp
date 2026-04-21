import * as React from "react"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"

interface DestinationCardProps {
  imageSrc: string;
  title: string;
  pricePrefix?: string;
  price: string;
  className?: string;
}

export function DestinationCard({ 
  imageSrc, 
  title, 
  pricePrefix = "From", 
  price, 
  className 
}: DestinationCardProps) {
  return (
    <motion.div 
      whileHover={{ y: -4 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      className={cn(
        "flex flex-col bg-white rounded-3xl overflow-hidden shadow-card cursor-pointer group",
        "w-[160px] flex-shrink-0",
        className
      )}
    >
      {/* Top half: Image taking approx 1.2 aspect ratio */}
      <div className="w-full h-[180px] bg-ink-100 overflow-hidden relative">
        {/* Placeholder if no real src in dev, otherwise next/image */}
        <img 
          src={imageSrc} 
          alt={title} 
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        
        {/* Optional inner top shadow/glow like the reference */}
        <div className="absolute top-0 left-0 w-full h-12 bg-gradient-to-b from-black/10 to-transparent pointer-events-none" />
      </div>

      {/* Bottom half: Text area */}
      <div className="p-4 flex flex-col gap-1">
        <h3 className="font-serif text-[15px] font-medium text-ink-900 leading-snug line-clamp-2">
          {title}
        </h3>
        <p className="text-gold-600 text-[13px] font-medium mt-1">
          <span className="text-gold-600/70">{pricePrefix}</span> {price}
        </p>
      </div>
    </motion.div>
  )
}
