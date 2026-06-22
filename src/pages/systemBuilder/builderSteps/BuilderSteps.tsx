import { useState, type ComponentType } from 'react'
import { Accordion } from '@/components/molecules/accordion/Accordion'
import { useMockProductResponseStore } from '@/store/mockProductResponse/mockProductResponseStore'
import { CamerasSection } from './components/camerasSection/CamerasSection'
import { PlanSection } from './components/planSection/PlanSection'
import { SensorsSection } from './components/sensorsSection/SensorsSection'
import { ProtectionSection } from './components/protectionSection/ProtectionSection'
import { useSelectedProductCounts } from './hooks/useSelectedProductCounts'
import camerasIcon from '@/assets/products/cameras-icon.svg'
import planIcon from '@/assets/products/plan-icon.svg'
import sensorsIcon from '@/assets/products/sensors-icon.svg'
import protectionIcon from '@/assets/products/protection-icon.svg'
import type { SectionContentProps, SectionType } from './types'
import { builderStepsStyles } from './builderStepsStyles'

interface Section {
  id: string
  title: string
  Content: ComponentType<SectionContentProps>
  icon: string
  type: SectionType
  staticSelectedCount?: number
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
    staticSelectedCount: 1,
  },
  {
    id: '3',
    title: 'Choose your sensors',
    Content: SensorsSection,
    icon: sensorsIcon,
    type: 'sensors',
    staticSelectedCount: 2,
  },
  {
    id: '4',
    title: 'Add extra protection',
    Content: ProtectionSection,
    icon: protectionIcon,
    type: 'protection',
    staticSelectedCount: 1,
  },
]

export const BuilderSteps = () => {
  const [openSection, setOpenSection] = useState<string | null>(sections[0].id)
  const selectedProductCounts = useSelectedProductCounts()
  const isCatalogLoading = useMockProductResponseStore(
    (state) => state.status === 'loading',
  )

  return (
    <div className={builderStepsStyles.container}>
      {sections.map((section, index) => {
        const stepNumber = index + 1
        const nextSection = sections[index + 1]
        const { Content } = section

        return (
          <div
            key={section.id}
            className={builderStepsStyles.section(openSection === section.id)}
          >
            <p className={builderStepsStyles.stepLabel}>
              STEP {stepNumber} OF {sections.length}
            </p>
            <Accordion
              title={section.title}
              open={openSection === section.id}
              onOpenChange={(isOpen) =>
                setOpenSection(isOpen ? null : section.id)
              }
              icon={section.icon}
              selectedCount={
                selectedProductCounts[section.type] ??
                section.staticSelectedCount
              }
              countLoading={isCatalogLoading && section.type === 'cameras'}
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
