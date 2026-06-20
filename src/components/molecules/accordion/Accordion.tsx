import { useState, type ReactNode } from 'react'
import { cn } from '@/lib/clsx'
import { Skeleton } from '@/components/atoms/Skeleton'
import ChevronDown from '@/assets/icons/chevron-down.svg'

interface AccordionProps {
  title: string
  icon: string
  defaultOpen?: boolean
  open?: boolean
  onOpenChange?: (open: boolean) => void
  selectedCount?: number
  countLoading?: boolean
  children: ReactNode
}

export const Accordion = ({
  title,
  icon,
  defaultOpen = false,
  open,
  onOpenChange,
  selectedCount,
  countLoading = false,
  children,
}: AccordionProps) => {
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
        onClick={toggle}
        className="flex w-full cursor-pointer items-center gap-4 pt-3 pb-6 text-left"
      >
        <img
          loading="lazy"
          src={icon}
          alt={title}
          className="size-5 object-contain"
        />
        <span className="flex-1 text-xl font-semibold">{title}</span>

        {isOpen &&
          (countLoading ? (
            <Skeleton className="h-4 w-16" />
          ) : (
            <span className="text-primary text-base font-medium whitespace-nowrap">
              {selectedCount === undefined ? '0' : selectedCount} selected
            </span>
          ))}

        <img
          loading="lazy"
          src={ChevronDown}
          alt={title}
          className={cn(
            'size-3 object-contain transition-transform duration-200',
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
