import { useState, type ComponentType } from 'react'
import { Accordion } from '@/components/molecules/accordion/Accordion'
import { CamerasSection } from './components/CamerasSection'
import { PlanSection } from './components/PlanSection'
import { SensorsSection } from './components/SensorsSection'
import { ProtectionSection } from './components/ProtectionSection'
import camerasIcon from '@/assets/products/cameras-icon.svg'
import planIcon from '@/assets/products/plan-icon.svg'
import sensorsIcon from '@/assets/products/sensors-icon.svg'
import protectionIcon from '@/assets/products/protection-icon.svg'
import type { SectionContentProps, SectionType } from './types'

interface Section {
  id: string
  title: string
  Content: ComponentType<SectionContentProps>
  icon: string
  type: SectionType
}

const sections: Section[] = [
  {
    id: '1',
    title: 'Choose your cameras',
    Content: CamerasSection,
    icon: camerasIcon,
    type: 'cameras',
  },
  {
    id: '2',
    title: 'Choose your plan',
    Content: PlanSection,
    icon: planIcon,
    type: 'plan',
  },
  {
    id: '3',
    title: 'Choose your sensors',
    Content: SensorsSection,
    icon: sensorsIcon,
    type: 'sensors',
  },
  {
    id: '4',
    title: 'Add extra protection',
    Content: ProtectionSection,
    icon: protectionIcon,
    type: 'protection',
  },
]

export const BuilderSteps = () => {
  const [openSection, setOpenSection] = useState<string | null>(sections[0].id)

  return (
    <div className="flex flex-col">
      {sections.map((section, index) => {
        const stepNumber = index + 1
        const nextSection = sections[index + 1]
        const { Content } = section

        return (
          <div
            key={section.id}
            className={`${openSection === section.id ? 'bg-secondary px-4' : ''} rounded-lg p-2`}
          >
            <p className="text-foreground pt-2.5 pb-1 text-xs">
              STEP {stepNumber} OF {sections.length}
            </p>
            <Accordion
              title={section.title}
              open={openSection === section.id}
              onOpenChange={(isOpen) =>
                setOpenSection(isOpen ? null : section.id)
              }
              icon={section.icon}
            >
              <Content
                nextSectionType={nextSection?.type}
                onNext={nextSection && (() => setOpenSection(nextSection.id))}
              />
            </Accordion>
          </div>
        )
      })}
    </div>
  )
}
