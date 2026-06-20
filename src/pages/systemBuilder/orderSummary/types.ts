export interface OrderItemViewModel {
  key: string
  productID: string
  variantID: string | null
  title: string
  icon: string
  unitPrice: number
  unitOriginalPrice: number | null
  quantity: number
}

export interface StaticOrderItemModel {
  id: string
  title: string
  image: string
  quantity: number
  price?: number
  originalPrice?: number
  isFree?: boolean
}

export interface StaticOrderSectionModel {
  label: string
  items: StaticOrderItemModel[]
}
