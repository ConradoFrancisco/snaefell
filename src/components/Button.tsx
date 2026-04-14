"use client"

import React from 'react'
import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'glass'
  size?: 'sm' | 'md' | 'lg'
}

export default function Button({
  className,
  variant = 'primary',
  size = 'md',
  ...props
}: ButtonProps) {
  const variants = {
    primary: 'bg-primary text-white hover:bg-primary/90 shadow-[0_0_20px_rgba(98,0,238,0.3)]',
    secondary: 'bg-secondary text-black hover:bg-secondary/90',
    outline: 'border-2 border-primary text-primary hover:bg-primary hover:text-white',
    glass: 'glass hover:bg-white/10 text-white border-white/20',
  }

  const sizes = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3 text-base',
    lg: 'px-8 py-4 text-lg font-bold',
  }

  return (
    <button
      className={cn(
        'inline-flex items-center justify-center rounded-full transition-all active:scale-95 disabled:opacity-50',
        variants[variant],
        sizes[size],
        className
      )}
      {...props}
    />
  )
}
