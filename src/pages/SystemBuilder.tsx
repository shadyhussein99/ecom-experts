import type { Product } from '@/types/product'
import products from '@/mocks/products.json'

const data = products as Product[]

function SystemBuilder() {
  console.log('data ====', data)

  return <></>
}

export default SystemBuilder
