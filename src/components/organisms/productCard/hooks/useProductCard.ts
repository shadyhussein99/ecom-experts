import { useState } from 'react'
import { toast } from 'sonner'
import { useProductsStore } from '@/store/productsStore'

interface UseProductCardProps {
  productID: string
  variantsIDs: string[] | []
}

export const useProductCard = ({
  productID,
  variantsIDs,
}: UseProductCardProps) => {
  const [selectedVariantId, setSelectedVariantId] = useState<string | null>(
    variantsIDs?.length ? null : productID,
  )

  const selectedProducts = useProductsStore((state) => state.selectedProducts)
  const setQuantity = useProductsStore((state) => state.setQuantity)

  // To handle both products with and without variants, we use the selectedVariantId to determine the key for the selectedProducts state.
  // If there are variants, we use the selected variant's ID; otherwise, we use the product's ID.
  const selectedQuantity = selectedVariantId
    ? (selectedProducts[selectedVariantId]?.quantity ?? 0)
    : 0

  const productKeys = variantsIDs?.length ? variantsIDs : [productID]

  const totalQuantity = productKeys.reduce(
    (sum, key) => sum + (selectedProducts[key]?.quantity ?? 0),
    0,
  )

  const setSelectedQuantity = (quantity: number) => {
    if (!selectedVariantId) {
      toast.warning('Please select a color')
      return
    }

    setQuantity(
      {
        productID: productID,
        variantID: variantsIDs?.length ? selectedVariantId : null,
      },
      quantity,
    )
  }

  return {
    selectedVariantId,
    setSelectedVariantId,
    selectedQuantity,
    totalQuantity,
    setSelectedQuantity,
  }
}
