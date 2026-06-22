import type { Product } from '@/types/product'
import { useProductCard } from './hooks/useProductCard'
import { CardVariants } from './components/cardVariants/CardVariants'
import { CardStepper } from './components/cardStepper/CardStepper'
import { CardPrice } from './components/cardPrice/CardPrice'
import { productCardStyles } from './productCardStyles'

interface ProductCardProps {
  product: Product
}

export const ProductCard = ({ product }: ProductCardProps) => {
  const { id, title, description, image, variants, sale, price } = product

  const variantsIDs = variants?.map((variant) => variant.id) || []

  const {
    selectedVariantId,
    setSelectedVariantId,
    selectedQuantity,
    totalQuantity,
    setSelectedQuantity,
  } = useProductCard({ productID: id, variantsIDs })

  return (
    <div className={productCardStyles.container(totalQuantity > 0)}>
      {/* Image and Sale Badge */}
      <div className={productCardStyles.imageColumn}>
        {sale && (
          <span className={productCardStyles.saleBadge}>
            Save {sale.discount}
          </span>
        )}
        <div className={productCardStyles.imageWrapper}>
          <img
            loading="lazy"
            src={image}
            alt={title}
            className={productCardStyles.image}
          />
        </div>
      </div>

      <div className={productCardStyles.body}>
        {/* Card title and description */}
        <div className={productCardStyles.titleBlock}>
          <p className={productCardStyles.title}>{title}</p>

          <p className={productCardStyles.description}>
            {description}{' '}
            <a href="#" className={productCardStyles.learnMore}>
              Learn More
            </a>
          </p>
        </div>

        {variants && (
          <CardVariants
            variants={variants}
            selectedVariantId={selectedVariantId}
            onSelect={setSelectedVariantId}
          />
        )}

        <div className={productCardStyles.footer}>
          <CardStepper
            quantity={selectedQuantity}
            onChange={setSelectedQuantity}
          />

          <CardPrice sale={sale} price={price} />
        </div>
      </div>
    </div>
  )
}
