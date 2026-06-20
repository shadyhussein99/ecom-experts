import type { StaticOrderSectionModel } from '../../types'
import { StaticOrderItem } from './StaticOrderItem'

interface StaticOrderSectionProps {
  section: StaticOrderSectionModel
}

export const StaticOrderSection = ({ section }: StaticOrderSectionProps) => {
  return (
    <>
      <p className="text-grey-600 pt-2.5 pb-1 text-xs">{section.label}</p>

      <div className="flex flex-col">
        {section.items.map((item) => (
          <StaticOrderItem key={item.id} item={item} />
        ))}
      </div>
    </>
  )
}
