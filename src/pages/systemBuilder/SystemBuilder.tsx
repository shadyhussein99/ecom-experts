import { BuilderSteps } from './builderSteps/BuilderSteps'
import { OrderSummary } from './orderSummary/OrderSummary'

function SystemBuilder() {
  return (
    <div className="grid grid-cols-1 items-start gap-4 lg:grid-cols-3">
      <div className="lg:col-span-2">
        <BuilderSteps />
      </div>
      <div className="lg:col-span-1">
        <OrderSummary />
      </div>
    </div>
  )
}

export default SystemBuilder
