"use client"

import { useEffect, useState } from 'react'

interface PriceProps {
  amount: number
  className?: string
}

export default function Price({ amount, className }: PriceProps) {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return <span className={className}>$...</span>
  }

  return (
    <span className={className}>
      ${amount.toLocaleString()}
    </span>
  )
}
