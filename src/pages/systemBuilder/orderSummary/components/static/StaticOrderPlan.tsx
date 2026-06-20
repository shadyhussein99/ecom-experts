import planSummary from '@/assets/general/plan-summary.svg'

export const StaticOrderPlan = () => {
  return (
    <>
      <p className="text-grey-600 pb-1 text-xs">PLAN</p>

      <div className="flex items-center">
        <div className="flex size-8 shrink-0 items-center justify-center">
          <img
            loading="lazy"
            src={planSummary}
            alt="Wyze Cam Unlimited"
            className="max-h-full w-auto object-contain"
          />
        </div>

        <p className="flex-1 text-sm font-bold text-neutral-900">
          Cam <span className="text-primary">Unlimited</span>
        </p>

        <div className="flex flex-col items-end leading-tight">
          <span className="text-grey-600 text-sm line-through">$12.99/mo</span>
          <span className="text-primary text-sm font-semibold">$9.99/mo</span>
        </div>
      </div>
    </>
  )
}
