import accessoriesSummary from '@/assets/products/accessories-summary.svg'
import sensorsSummaryOne from '@/assets/products/sensors-summary-one.svg'
import sensorsSummaryTwo from '@/assets/products/sensors-summary-two.svg'
import type { StaticOrderSectionModel } from './types'

export const STATIC_SECTIONS: StaticOrderSectionModel[] = [
  {
    label: 'SENSORS',
    items: [
      {
        id: 'sensor-one',
        title: 'Wyze Sense Motion Sensor',
        image: sensorsSummaryOne,
        quantity: 2,
        price: 59.98,
      },
      {
        id: 'sensor-two',
        title: 'Wyze Sense Hub (Required)',
        image: sensorsSummaryTwo,
        quantity: 1,
        originalPrice: 29.92,
        isFree: true,
      },
    ],
  },
  {
    label: 'ACCESSORIES',
    items: [
      {
        id: 'accessory-one',
        title: 'Wyze MicroSD Card (256GB)',
        image: accessoriesSummary,
        quantity: 2,
        price: 41.96,
      },
    ],
  },
]
