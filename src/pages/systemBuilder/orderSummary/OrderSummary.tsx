import { Divider } from '@/components/atoms/Divider'
import { useMockProductResponseStore } from '@/store/mockProductResponse/mockProductResponseStore'
import { useOrderItems } from './hooks/useOrderItems'
import { OrderItem } from './components/orderItem/OrderItem'
import { OrderItemSkeleton } from './components/orderItemSkeleton/OrderItemSkeleton'
import { StaticOrderSection } from './components/static/staticOrderSection/StaticOrderSection'
import { StaticOrderPlan } from './components/static/staticOrderPlan/StaticOrderPlan'
import { StaticOrderShipping } from './components/static/staticOrderShipping/StaticOrderShipping'
import { OrderTotal } from './components/orderTotal/OrderTotal'
import { STATIC_SECTIONS } from './staticSections'
import { orderSummaryStyles } from './orderSummaryStyles'

const SKELETON_COUNT = 2

export const OrderSummary = () => {
  const items = useOrderItems()
  const status = useMockProductResponseStore((state) => state.status)

  const renderCameras = () => {
    if (status === 'error') {
      return (
        <p className={orderSummaryStyles.errorText}>Couldn't load products.</p>
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
    <div className={orderSummaryStyles.container}>
      <p className={orderSummaryStyles.reviewLabel}>REVIEW</p>

      <div className={orderSummaryStyles.grid}>
        <div>
          <p className={orderSummaryStyles.heading}>Your security system</p>

          <p className={orderSummaryStyles.subheading}>
            Review your personalized protection system designed to keep what
            matters most safe.
          </p>

          <Divider />

          <p className={orderSummaryStyles.sectionLabel}>CAMERAS</p>

          <div className={orderSummaryStyles.list}>{renderCameras()}</div>

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
