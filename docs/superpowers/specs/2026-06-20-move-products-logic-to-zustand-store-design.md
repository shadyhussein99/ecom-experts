# Move "adding products" logic to a Zustand store

## Goal

Move the "adding products" logic (the quantities/cart data and its mutation)
out of `ProductCard` and into a Zustand store, while keeping the toast warning
inside `ProductCard`. The store must be shaped so a future checkout screen can
list added products with their selected variants and adjust their quantities.
No checkout UI is built here.

## Current behavior (reference)

In `src/components/organisms/productCard/ProductCard.tsx`:

- `quantities: Record<string, number>` — local per-card state, keyed by variant
  id (or the product id when the product has no variants).
- `selectedVariantId` — per-card color selection.
- `setSelectedQuantity(quantity)` — if no variant is selected,
  `toast.warning('Please select a color')` and bail; otherwise write the
  quantity into `quantities`.
- `totalQuantity` — sum of this card's quantities; highlights the card border
  (`border-primary`) when `> 0`.

## Store

New file: `src/store/productsStore.ts`

```ts
interface CartItem {
  productId: string
  variantId: string | null   // null when the product has no variants
  quantity: number
}

interface ProductsState {
  items: Record<string, CartItem>   // keyed by variantId ?? productId
  setQuantity: (
    target: { productId: string; variantId: string | null },
    quantity: number,
  ) => void
}
```

- **`setQuantity`** is the entire "adding products" logic:
  - `key = variantId ?? productId`
  - `quantity <= 0` → delete `items[key]` (natural "remove")
  - otherwise → `items[key] = { productId, variantId, quantity }`
- One absolute-value action serves both the card stepper and a future
  checkout's add/remove. No separate increment/decrement (YAGNI).
- The store contains **no toast logic and no checkout logic**.

Rationale for the `CartItem` shape over a flat `Record<string, number>`: each
line carries `productId` + `variantId`, so checkout can group by product and
show the selected variant without reverse-mapping variants back to products.

## ProductCard changes

- `selectedVariantId` **stays local** (per-card UI state).
- `selectedQuantity` reads from the store:
  `items[selectedVariantId]?.quantity ?? 0` (0 when nothing selected).
- `totalQuantity` is computed from **this card's keys only**
  (`variants.map(v => v.id)`, or `[id]` when there are no variants), summing
  `items[key]?.quantity`. This preserves the per-card border highlight now that
  `items` is global/shared.
- `setSelectedQuantity` **keeps the toast**: no variant selected →
  `toast.warning('Please select a color')` and bail; otherwise call
  `setQuantity({ productId: id, variantId: hasVariants ? selectedVariantId : null }, quantity)`.

`CardVariants` and `CardStepper` are unchanged.

## Out of scope

- Any checkout screen or component.
- Persistence, increment/decrement helpers, or product-detail storage in the
  store (the store holds ids + quantity; details are joined from the product
  data when needed).

## Success criteria

- UI behavior is identical to today: stepper, toast on unselected variant, and
  per-card border highlight all work the same.
- `quantities` no longer lives in `ProductCard`; it lives in the Zustand store.
- The store exposes enough (`productId`, `variantId`, `quantity` per line) for a
  later checkout to list and adjust added products by variant.
