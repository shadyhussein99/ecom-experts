import { Divider } from '@/components/atoms/Divider'
import { useOrderItems } from './hooks/useOrderItems'
import { OrderItem } from './components/OrderItem'
import { StaticOrderSection } from './components/static/StaticOrderSection'
import { OrderPlan } from './components/static/OrderPlan'
import { OrderShipping } from './components/static/OrderShipping'
import { OrderTotal } from './components/static/OrderTotal'
import { STATIC_SECTIONS } from './staticSections'

export const OrderSummary = () => {
  const items = useOrderItems()

  return (
    <div className="bg-secondary rounded-lg px-4 pb-4">
      <p className="text-foreground pt-2.5 pb-1 text-xs">REVIEW</p>

      <div className="py-4">
        <p className="flex-1 text-xl font-semibold">Your security system</p>

        <p className="text-foreground pt-2 text-sm">
          Review your personalized protection system designed to keep what
          matters most safe.
        </p>

        <Divider />

        <p className="text-grey-600 pb-1 text-xs">CAMERAS</p>

        <div className="flex flex-col">
          {items.map((item) => (
            <OrderItem key={item.key} item={item} />
          ))}
        </div>

        {STATIC_SECTIONS.map((section) => (
          <div key={section.label}>
            <Divider />
            <StaticOrderSection section={section} />
          </div>
        ))}

        <Divider />
        <OrderPlan />

        <Divider />
        <OrderShipping />

        <OrderTotal />
      </div>
    </div>
  )
}
