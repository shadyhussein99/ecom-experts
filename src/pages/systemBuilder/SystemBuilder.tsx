import { useEffect } from 'react'
import { useMockProductResponseStore } from '@/store/mockProductResponse/mockProductResponseStore'
import { BuilderSteps } from './builderSteps/BuilderSteps'
import { OrderSummary } from './orderSummary/OrderSummary'

function SystemBuilder() {
  const status = useMockProductResponseStore((state) => state.status)
  const loadProducts = useMockProductResponseStore(
    (state) => state.loadProducts,
  )

  // Mock fetching products from API on component mount
  useEffect(() => {
    if (status === 'idle') loadProducts()
  }, [status, loadProducts])

  return (
    <div className="grid grid-cols-1 items-start gap-6 lg:grid-cols-10">
      <div className="lg:col-span-7">
        <BuilderSteps />
      </div>
      <div className="lg:col-span-3">
        <OrderSummary />
      </div>
    </div>
  )
}

export default SystemBuilder
