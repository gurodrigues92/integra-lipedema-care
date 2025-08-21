"use client"

import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const gradientButtonVariants = cva(
  [
    "gradient-button",
    "inline-flex items-center justify-center gap-3",
    "rounded-2xl min-w-[280px] px-10 py-5",
    "text-lg leading-tight font-bold text-white",
    "font-sans tracking-tight whitespace-nowrap",
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50",
    "disabled:pointer-events-none disabled:opacity-50",
    "transition-all duration-300 ease-out",
  ],
  {
    variants: {
      variant: {
        primary: "gradient-button-primary",
        secondary: "gradient-button-secondary", 
        accent: "gradient-button-accent",
        whatsapp: "gradient-button-whatsapp",
      },
      size: {
        default: "px-10 py-5 text-lg min-w-[280px]",
        sm: "px-8 py-3 text-base min-w-[220px]",
        lg: "px-12 py-6 text-xl min-w-[320px]",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "default",
    },
  }
)

export interface GradientButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof gradientButtonVariants> {
  asChild?: boolean
}

const GradientButton = React.forwardRef<HTMLButtonElement, GradientButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return (
      <Comp
        className={cn(gradientButtonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
GradientButton.displayName = "GradientButton"

export { GradientButton, gradientButtonVariants }