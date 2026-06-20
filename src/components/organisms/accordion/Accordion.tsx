import { useId, useState, type ReactNode } from 'react'
import { ChevronDown } from 'lucide-react'
import { cn } from '@/lib/clsx'

interface AccordionProps {
  title: string
  icon: string
  defaultOpen?: boolean
  open?: boolean
  onOpenChange?: (open: boolean) => void
  children: ReactNode
}

export const Accordion = ({
  title,
  icon,
  defaultOpen = false,
  open,
  onOpenChange,
  children,
}: AccordionProps) => {
  const id = useId()
  const triggerId = `${id}-trigger`
  const contentId = `${id}-content`

  const [internalOpen, setInternalOpen] = useState(defaultOpen)
  const isControlled = open !== undefined
  const isOpen = isControlled ? open : internalOpen

  const toggle = () => {
    if (!isControlled) setInternalOpen((prev) => !prev)
    onOpenChange?.(isOpen)
  }

  return (
    <div
      className={`border-foreground border-t-[0.5px] ${isOpen ? '' : 'border-b-[0.5px]'}`}
    >
      <button
        id={triggerId}
        aria-expanded={isOpen}
        aria-controls={contentId}
        onClick={toggle}
        className="flex w-full items-center gap-4 py-3 text-left"
      >
        <img
          loading="lazy"
          src={icon}
          alt={title}
          className="size-5 object-contain"
        />
        <span className="flex-1 text-xl font-semibold">{title}</span>
        <ChevronDown
          aria-hidden
          className={cn(
            'text-primary size-6 shrink-0 transition-transform duration-200',
            isOpen && 'rotate-180',
          )}
        />
      </button>

      <div
        className={cn(
          'grid transition-[grid-template-rows] duration-200 ease-out',
          isOpen ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]',
        )}
      >
        <div className="overflow-hidden">
          <div className="pb-5">{children}</div>
        </div>
      </div>
    </div>
  )
}
