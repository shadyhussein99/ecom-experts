import { useState, type ReactNode } from 'react'
import { Accordion } from '@/components/organisms/accordion/Accordion'
import camerasIcon from '@/assets/products/cameras-icon.svg'
import planIcon from '@/assets/products/plan-icon.svg'
import sensorsIcon from '@/assets/products/sensors-icon.svg'
import protectionIcon from '@/assets/products/protection-icon.svg'

interface Section {
  id: string
  title: string
  content: ReactNode
  icon: string
}

const sections: Section[] = [
  {
    id: '1',
    title: 'Choose your cameras',
    content: 'Cameras options go here.',
    icon: camerasIcon,
  },
  {
    id: '2',
    title: 'Choose your plan',
    content: 'Plan options go here.',
    icon: planIcon,
  },
  {
    id: '3',
    title: 'Choose your sensors',
    content: 'Sensors options go here.',
    icon: sensorsIcon,
  },
  {
    id: '4',
    title: 'Add extra protection',
    content: 'Protection options go here.',
    icon: protectionIcon,
  },
]

export const BuilderSteps = () => {
  const [openSection, setOpenSection] = useState<string | null>(sections[0].id)

  return (
    <div className="flex flex-col">
      {sections.map((section, index) => {
        const stepNumber = index + 1

        return (
          <div
            key={section.id}
            className={`${openSection === section.id ? 'bg-secondary' : ''} rounded-lg p-2`}
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
              {typeof section.content === 'string' ? (
                <h3 className="text-foreground text-center">
                  {section.content}
                </h3>
              ) : (
                section.content
              )}
            </Accordion>
          </div>
        )
      })}
    </div>
  )
}
