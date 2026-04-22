import * as React from "react"
import { motion } from "motion/react"
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
  pricePrefix = "À partir de", 
  price, 
  className 
}: DestinationCardProps) {
  return (
    <motion.div 
      whileHover={{ y: -6, boxShadow: '0 16px 40px rgba(10,14,12,0.10)' }}
      whileTap={{ scale: 0.98 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      className={cn(
        "flex flex-col bg-white rounded-3xl overflow-hidden shadow-card cursor-pointer group",
        "w-[160px] flex-shrink-0",
        className
      )}
    >
      {/* Image with 4:5 ratio */}
      <div className="w-full aspect-[4/5] bg-ink-100 overflow-hidden relative">
        <img 
          src={imageSrc} 
          alt={title} 
          className="w-full h-full object-cover group-hover:scale-[1.06] transition-transform duration-700 ease-out"
          loading="lazy"
        />
        
        {/* Premium top gradient vignette */}
        <div className="absolute top-0 left-0 w-full h-16 bg-gradient-to-b from-black/15 to-transparent pointer-events-none" />
        {/* Bottom gradient for text readability */}
        <div className="absolute bottom-0 left-0 w-full h-20 bg-gradient-to-t from-black/20 to-transparent pointer-events-none" />
      </div>

      {/* Text area */}
      <div className="p-4 flex flex-col gap-1.5">
        <h3 className="font-serif text-[15px] font-medium text-ink-900 leading-snug line-clamp-2">
          {title}
        </h3>
        <div className="flex items-baseline gap-1">
          <span className="text-[11px] text-gold-600/60">{pricePrefix}</span>
          <span className="text-[15px] font-semibold text-gold-600 tabular">{price}</span>
        </div>
      </div>
    </motion.div>
  )
}
