export interface ProductVariant {
  id: string
  color: string
  icon: string | null
}

export interface ProductSale {
  discount: string
  originalPrice: string
}

export interface Product {
  id: string
  title: string
  description: string
  variants: ProductVariant[] | null
  sale: ProductSale | null
  price: string
  image: string
}
