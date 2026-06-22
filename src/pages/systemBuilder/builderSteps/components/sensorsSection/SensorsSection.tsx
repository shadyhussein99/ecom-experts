import { Button } from '@/components/atoms/button/Button'
import type { SectionContentProps } from '@/pages/systemBuilder/builderSteps/types'
import { sensorsSectionStyles } from './sensorsSectionStyles'

export const SensorsSection = ({
  nextSectionType,
  onNext,
}: SectionContentProps) => {
  return (
    <div className={sensorsSectionStyles.container}>
      <h3 className={sensorsSectionStyles.text}>Sensors options go here.</h3>
      <Button variant={'outline'} onClick={onNext}>
        Next: Choose your {nextSectionType}
      </Button>
    </div>
  )
}
