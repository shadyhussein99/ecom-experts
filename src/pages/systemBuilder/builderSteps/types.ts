export type SectionType = 'cameras' | 'plan' | 'sensors' | 'protection'

export interface SectionContentProps {
  nextSectionType?: SectionType
  onNext?: () => void
}
