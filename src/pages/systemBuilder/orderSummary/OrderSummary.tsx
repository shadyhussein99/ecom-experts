import { Divider } from '@/components/atoms/Divider'
import { useMockProductResponseStore } from '@/store/mockProductResponse/mockProductResponseStore'
import { useOrderItems } from './hooks/useOrderItems'
import { OrderItem } from './components/OrderItem'
import { OrderItemSkeleton } from './components/OrderItemSkeleton'
import { StaticOrderSection } from './components/static/StaticOrderSection'
import { StaticOrderPlan } from './components/static/StaticOrderPlan'
import { StaticOrderShipping } from './components/static/StaticOrderShipping'
import { OrderTotal } from './components/OrderTotal'
import { STATIC_SECTIONS } from './staticSections'

const SKELETON_COUNT = 2

export const OrderSummary = () => {
  const items = useOrderItems()
  const status = useMockProductResponseStore((state) => state.status)

  const renderCameras = () => {
    if (status === 'error') {
      return (
        <p className="text-foreground py-2 text-sm">Couldn't load products.</p>
      )
    }

    if (status !== 'success') {
      return Array.from({ length: SKELETON_COUNT }, (_, index) => (
        <OrderItemSkeleton key={index} />
      ))
    }

    return items.map((item) => <OrderItem key={item.key} item={item} />)
  }

  return (
    <div className="bg-secondary rounded-lg px-4 pb-4">
      <p className="text-foreground pt-2.5 pb-1 text-xs">REVIEW</p>

      <div className="py-4 lg:grid lg:grid-cols-2 lg:items-start lg:gap-8 xl:block">
        <div>
          <p className="text-xl font-semibold">Your security system</p>

          <p className="text-foreground pt-2 text-sm">
            Review your personalized protection system designed to keep what
            matters most safe.
          </p>

          <Divider />

          <p className="text-grey-600 pb-1 text-xs">CAMERAS</p>

          <div className="flex flex-col">{renderCameras()}</div>

          {STATIC_SECTIONS.map((section) => (
            <div key={section.label}>
              <Divider />
              <StaticOrderSection section={section} />
            </div>
          ))}

          <Divider />
          <StaticOrderPlan />

          <Divider />
          <StaticOrderShipping />
        </div>

        <OrderTotal />
      </div>
    </div>
  )
}
