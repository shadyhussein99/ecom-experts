import type { StaticOrderSectionModel } from '@/pages/systemBuilder/orderSummary/types'
import { StaticOrderItem } from '../staticOrderItem/StaticOrderItem'
import { staticOrderSectionStyles } from './staticOrderSectionStyles'

interface StaticOrderSectionProps {
  section: StaticOrderSectionModel
}

export const StaticOrderSection = ({ section }: StaticOrderSectionProps) => {
  return (
    <>
      <p className={staticOrderSectionStyles.label}>{section.label}</p>

      <div className={staticOrderSectionStyles.list}>
        {section.items.map((item) => (
          <StaticOrderItem key={item.id} item={item} />
        ))}
      </div>
    </>
  )
}
