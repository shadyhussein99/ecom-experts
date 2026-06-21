import { useEffect } from 'react'
import { useMockProductResponseStore } from '@/store/mockProductResponse/mockProductResponseStore'
import { BuilderSteps } from './builderSteps/BuilderSteps'
import { OrderSummary } from './orderSummary/OrderSummary'
import { SEO } from '@/components/atoms/SEO'

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
    <>
      <SEO
        keywords="Products,  Ecom Experts"
        title="Products | Ecom Experts"
        description="Products of Ecom Experts."
      />
      <div className="grid grid-cols-1 items-start gap-6 xl:grid-cols-10">
        <div className="xl:col-span-7">
          <BuilderSteps />
        </div>
        <div className="xl:col-span-3">
          <OrderSummary />
        </div>
      </div>
    </>
  )
}

export default SystemBuilder
