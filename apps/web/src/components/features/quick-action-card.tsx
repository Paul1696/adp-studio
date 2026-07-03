'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import type { LucideIcon } from 'lucide-react'
import { ArrowRight } from 'lucide-react'
import { cn } from '@/lib/utils'

interface QuickActionCardProps {
  icon: LucideIcon
  label: string
  description: string
  actionLabel: string
  href: string
  gradient: string
  iconColor: string
  iconBg: string
  delay?: number
}

export function QuickActionCard({
  icon: Icon, label, description, actionLabel, href,
  gradient, iconColor, iconBg, delay = 0,
}: QuickActionCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.3, ease: 'easeOut' }}
    >
      <Link
        href={href}
        className="group relative flex flex-col overflow-hidden rounded-xl border border-slate-200/80 bg-white p-4 shadow-sm transition-all duration-150 hover:-translate-y-0.5 hover:border-slate-300 hover:shadow-md"
      >
        {/* Fond coloré au hover */}
        <div className={cn('pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-200 group-hover:opacity-100', gradient)} />

        <div className="relative">
          {/* Icône + CTA inline */}
          <div className="mb-3 flex items-center justify-between">
            <div className={cn('flex h-8 w-8 items-center justify-center rounded-lg transition-transform duration-150 group-hover:scale-110', iconBg)}>
              <Icon className={cn('h-4 w-4', iconColor)} strokeWidth={1.75} />
            </div>
            <span className={cn('flex items-center gap-0.5 text-[12px] font-semibold transition-colors duration-150', iconColor)}>
              {actionLabel}
              <ArrowRight className="h-2.5 w-2.5 transition-transform duration-150 group-hover:translate-x-0.5" />
            </span>
          </div>

          {/* Texte */}
          <p className="text-[14px] font-semibold leading-snug text-adp-slate transition-colors duration-150 group-hover:text-adp-blue">{label}</p>
          <p className="mt-1 text-[12px] leading-relaxed text-adp-muted">{description}</p>
        </div>
      </Link>
    </motion.div>
  )
}
