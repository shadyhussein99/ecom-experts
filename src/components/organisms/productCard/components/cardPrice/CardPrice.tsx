import type { ProductSale } from '@/types/product'
import { formatAmount } from '@/lib/formatAmount'
import { cardPriceStyles } from './cardPriceStyles'

interface CardPriceProps {
  sale: ProductSale | null
  price: string
}

export const CardPrice = ({ sale, price }: CardPriceProps) => {
  return (
    <div className={cardPriceStyles.container}>
      {sale && (
        <span className={cardPriceStyles.originalPrice}>
          ${formatAmount(Number(sale.originalPrice))}
        </span>
      )}
      <span className={cardPriceStyles.price}>
        ${formatAmount(Number(price))}
      </span>
    </div>
  )
}
