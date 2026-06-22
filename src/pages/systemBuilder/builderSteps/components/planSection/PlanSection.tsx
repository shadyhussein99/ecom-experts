import { Button } from '@/components/atoms/button/Button'
import type { SectionContentProps } from '@/pages/systemBuilder/builderSteps/types'
import { planSectionStyles } from './planSectionStyles'

export const PlanSection = ({
  nextSectionType,
  onNext,
}: SectionContentProps) => {
  return (
    <div className={planSectionStyles.container}>
      <h3 className={planSectionStyles.text}>Plan options go here.</h3>
      <Button variant={'outline'} onClick={onNext}>
        Next: Choose your {nextSectionType}
      </Button>
    </div>
  )
}
