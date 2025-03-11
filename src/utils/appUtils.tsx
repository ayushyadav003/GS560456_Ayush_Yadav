import { Storefront } from '@mui/icons-material'

export const sidebar = [
  { title: 'Store', route: '/store', icon: <Storefront /> },
  { title: 'SKU', route: '/sku', icon: <Storefront /> },
  { title: 'Planning', route: '/planning', icon: <Storefront /> },
  { title: 'Charts', route: '/chart', icon: <Storefront /> },
]

export interface Store {
  seqNo: number
  id: string
  label: string
  city: string
  state: string
}
export interface SKU {
  id: string
  label: string
  class: string
  department: string
  price: string
  cost: string
}

export const initialStores: Store[] = [
  {
    seqNo: 1,
    id: 'ST035',
    label: 'San Francisco Bay Trends',
    city: 'San Francisco',
    state: 'CA',
  },
  {
    seqNo: 2,
    id: 'ST036',
    label: 'Los Angeles Trends',
    city: 'Los Angeles',
    state: 'CA',
  },
  {
    seqNo: 3,
    id: 'ST037',
    label: 'New York Style',
    city: 'New York',
    state: 'NY',
  },
]
export const initialSKUs: SKU[] = [
  {
    id: 'SK00158',
    label: 'Crew Neck Merino Wool Sweater',
    class: 'Tops',
    department: "Men's Apparel",
    price: '$114.99',
    cost: '$114.99',
  },
]

export const calenderData = [
  {
    seqNo: 1,
    week: 'W01',
    weekLabel: 'Week 01',
    month: 'M01',
    monthLabel: 'Feb',
  },
]
export const planningData = [
  {
    store: 1,
    sku: 'W01',
    week: 'Week 01',
    salesUnit: 'M01',
  },
]
export const calculationData = [
  {
    store: 1,
    sku: 'W01',
    week: 'Week 01',
    salesUnit: 'M01',
    salesDollars: 'M01',
    costDollars: 'M01',
    gm: '84%',
  },
]
export const chartData = [
  {
    week: 'Week 01',
    gmDollars: 'M01',
    salesDollars: 'M01',
    gm: '84%',
  },
]
