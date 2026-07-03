'use client'

import { useState } from 'react'
import { cn } from '@/lib/utils'

const FALLBACK_GRADIENTS = [
  'from-blue-400 to-blue-600',
  'from-violet-400 to-violet-600',
  'from-emerald-400 to-emerald-600',
  'from-amber-400 to-amber-600',
  'from-rose-400 to-rose-600',
  'from-teal-400 to-teal-600',
  'from-slate-400 to-slate-600',
]

interface ProjectImageProps {
  src: string
  alt: string
  className?: string
  index?: number
}

export function ProjectImage({ src, alt, className, index = 0 }: ProjectImageProps) {
  const [error, setError] = useState(false)
  const gradient = FALLBACK_GRADIENTS[index % FALLBACK_GRADIENTS.length]

  if (error) {
    return (
      <div className={cn(`bg-gradient-to-br ${gradient} flex items-center justify-center`, className)}>
        <span className="text-[13px] font-semibold text-white/80 drop-shadow">{alt}</span>
      </div>
    )
  }

  return (
    <img
      src={src}
      alt={alt}
      className={className}
      onError={() => setError(true)}
    />
  )
}
