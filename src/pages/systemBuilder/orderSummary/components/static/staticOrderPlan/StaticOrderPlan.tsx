import planSummary from '@/assets/general/plan-summary.svg'
import { staticOrderPlanStyles } from './staticOrderPlanStyles'

export const StaticOrderPlan = () => {
  return (
    <>
      <p className={staticOrderPlanStyles.label}>PLAN</p>

      <div className={staticOrderPlanStyles.row}>
        <div className={staticOrderPlanStyles.iconWrapper}>
          <img
            loading="lazy"
            src={planSummary}
            alt="Wyze Cam Unlimited"
            className={staticOrderPlanStyles.icon}
          />
        </div>

        <p className={staticOrderPlanStyles.title}>
          Cam{' '}
          <span className={staticOrderPlanStyles.titleAccent}>Unlimited</span>
        </p>

        <div className={staticOrderPlanStyles.priceBlock}>
          <span className={staticOrderPlanStyles.originalPrice}>$12.99/mo</span>
          <span className={staticOrderPlanStyles.price}>$9.99/mo</span>
        </div>
      </div>
    </>
  )
}
