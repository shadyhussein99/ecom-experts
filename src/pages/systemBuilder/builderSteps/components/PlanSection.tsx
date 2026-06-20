import { Button } from '@/components/atoms/button/Button'
import type { SectionContentProps } from '../types'

export const PlanSection = ({
  nextSectionType,
  onNext,
}: SectionContentProps) => {
  return (
    <div className="flex flex-col items-center justify-center gap-4">
      <h3 className="text-foreground text-center">Plan options go here.</h3>
      <Button variant={'outline'} onClick={onNext}>
        Next: Choose your {nextSectionType}
      </Button>
    </div>
  )
}
