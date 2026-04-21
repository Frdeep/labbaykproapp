import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap text-[15px] font-semibold ring-offset-ivory-50 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 active:scale-[0.98]",
  {
    variants: {
      variant: {
        default: "bg-ink-900 text-ivory-50 hover:bg-ink-900/90 shadow-card",
        beige: "bg-beige-900 text-gold-300 hover:bg-beige-800 shadow-float",
        gold: "bg-grad-gold text-white shadow-float",
        white: "bg-white text-ink-900 shadow-float hover:bg-white/90",
        secondary: "bg-ivory-200 text-ink-900 hover:bg-ivory-200/80",
        ghost: "hover:bg-ink-100/50 hover:text-ink-900",
        "ghost-gold": "text-gold-600 hover:bg-gold-100/20",
        link: "text-ink-900 underline-offset-4 hover:underline",
      },
      size: {
        default: "h-12 px-5 py-2",
        sm: "h-9 px-3 text-[13px]",
        lg: "h-14 px-8 text-body-l",
        icon: "h-12 w-12",
        square: "h-16 w-16 flex-col gap-1 text-[11px]",
      },
      shape: {
        default: "rounded-md",
        pill: "rounded-pill",
        bubble: "rounded-2xl",
        squircle: "rounded-3xl",
      }
    },
    defaultVariants: {
      variant: "default",
      size: "default",
      shape: "default",
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, shape, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, shape, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }
