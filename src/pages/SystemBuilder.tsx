import type { Product } from '@/types/product'
import products from '@/mocks/products.json'
import { ProductCard } from '@/components/organisms/productCard/ProductCard'

const data = products as Product[]

function SystemBuilder() {
  return (
    <div className="flex flex-col gap-6">
      {data.map((product) => (
        <ProductCard key={product.title} product={product} />
      ))}
    </div>
  )
}

export default SystemBuilder
