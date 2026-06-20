import type { ProductSale } from '@/types/product'

interface CardPriceProps {
  sale: ProductSale | null
  price: string
}

export const CardPrice = ({ sale, price }: CardPriceProps) => {
  return (
    <div className="flex flex-col items-end leading-tight">
      {sale && (
        <span className="text-danger text-lg line-through sm:text-xl">
          {sale.originalPrice}
        </span>
      )}
      <span className="text-grey-700 text-lg sm:text-xl">{price}</span>
    </div>
  )
}
