import { useEffect } from 'react'
import { useMockProductResponseStore } from '@/store/mockProductResponse/mockProductResponseStore'
import { BuilderSteps } from './builderSteps/BuilderSteps'
import { OrderSummary } from './orderSummary/OrderSummary'
import { SEO } from '@/components/atoms/SEO'
import { systemBuilderStyles } from './systemBuilderStyles'

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
      <div className={systemBuilderStyles.grid}>
        <div className={systemBuilderStyles.buildersColumn}>
          <BuilderSteps />
        </div>
        <div className={systemBuilderStyles.summaryColumn}>
          <OrderSummary />
        </div>
      </div>
    </>
  )
}

export default SystemBuilder
