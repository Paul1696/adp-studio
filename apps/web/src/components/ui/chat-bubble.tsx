import { cn } from '@/lib/utils'

interface ChatBubbleProps {
  role: 'user' | 'agent' | 'system'
  content: string
  timestamp: string
  authorName: string
  authorInitials: string
  authorColorBg?: string | undefined
  authorColor?: string | undefined
}

export function ChatBubble({
  role, content, timestamp, authorName, authorInitials, authorColorBg, authorColor,
}: ChatBubbleProps) {
  const isUser = role === 'user'

  return (
    <div className={cn('flex gap-3', isUser && 'flex-row-reverse')}>
      {/* Avatar */}
      <div className={cn(
        'flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-[12px] font-bold',
        isUser ? 'bg-adp-blue text-white' : (authorColorBg ?? 'bg-slate-100'),
        !isUser && (authorColor ?? 'text-slate-600'),
      )}>
        {authorInitials}
      </div>

      {/* Bulle */}
      <div className={cn('max-w-[75%] space-y-1', isUser && 'items-end')}>
        {/* Méta */}
        <div className={cn('flex items-center gap-2 text-[11px] text-adp-muted', isUser && 'flex-row-reverse')}>
          <span className="font-semibold text-adp-slate">{authorName}</span>
          <span>{timestamp}</span>
        </div>

        {/* Corps */}
        <div className={cn(
          'rounded-2xl px-4 py-3 text-[13px] leading-relaxed',
          isUser
            ? 'rounded-tr-sm bg-adp-blue text-white'
            : 'rounded-tl-sm border border-slate-200/80 bg-white text-adp-slate shadow-sm',
        )}>
          {content.split('\n').map((line, i) => (
            <span key={i}>
              {line}
              {i < content.split('\n').length - 1 && <br />}
            </span>
          ))}
        </div>
      </div>
    </div>
  )
}
