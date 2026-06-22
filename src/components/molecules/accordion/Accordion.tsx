import { useState, type ReactNode } from 'react'
import { Skeleton } from '@/components/atoms/Skeleton'
import ChevronDown from '@/assets/icons/chevron-down.svg'
import { accordionStyles } from './accordionStyles'

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
    <div className={accordionStyles.root(isOpen)}>
      <button onClick={toggle} className={accordionStyles.trigger(isOpen)}>
        <img
          loading="lazy"
          src={icon}
          alt={title}
          className={accordionStyles.icon}
        />
        <span className={accordionStyles.title}>{title}</span>

        <div className={accordionStyles.count(isOpen)}>
          {countLoading ? (
            <Skeleton className={accordionStyles.countSkeleton} />
          ) : (
            <span className={accordionStyles.countText}>
              {selectedCount === undefined ? '0' : selectedCount} selected
            </span>
          )}
        </div>

        <img
          loading="lazy"
          src={ChevronDown}
          alt={title}
          className={accordionStyles.chevron(isOpen)}
        />
      </button>

      <div className={accordionStyles.panel(isOpen)}>
        <div className={accordionStyles.panelInner}>
          <div className={accordionStyles.panelContent}>{children}</div>
        </div>
      </div>
    </div>
  )
}
