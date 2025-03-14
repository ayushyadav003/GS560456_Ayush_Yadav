/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useMemo, useState } from 'react'
import { AgGridReact } from 'ag-grid-react'
import { ColDef, ValueGetterParams, ValueFormatterParams, CellClassParams, ValueParserParams } from 'ag-grid-community'
import 'ag-grid-community/styles/ag-grid.css'
import 'ag-grid-community/styles/ag-theme-alpine.css'
import {
  calenderData,
  initialSKUs,
  initialStores,
  planningData,
} from '../utils/appUtils'

interface SKU {
  ID: string
  Label: string
  Price: number
  Cost: number
}

interface Store {
  id: string
  label: string
}

interface PlanningData {
  Store: string
  SKU: string
  Week: string
  'Sales Units': number
}

interface CalendarWeek {
  week: string
  weekLabel: string
}

interface PlanningRowData {
  store: string
  sku: string
  [key: string]: string | number
}

const PlanningScreen: React.FC = () => {
  const [rowData, setRowData] = useState<PlanningRowData[]>(() => {
    return initialStores.flatMap((store: Store) =>
      initialSKUs.map((sku: SKU) => ({
        store: store.label,
        sku: sku.Label,
        ...Object.fromEntries(
          calenderData.map((week: CalendarWeek) => [
            `${week.week}_SalesUnits`,
            planningData.find(
              (p: PlanningData) =>
                p.Store === store.id &&
                p.SKU === sku.ID &&
                p.Week === week.week,
            )?.['Sales Units'] || 0,
          ]),
        ),
      })),
    )
  })

  const columns: ColDef<PlanningRowData>[] = useMemo(() => {
    const weekColumns: ColDef<PlanningRowData>[] = calenderData.map(
      (week: CalendarWeek) => ({
        headerName: week.weekLabel,
        children: [
          {
            headerName: 'Sales Units',
            field: `${week.week}_SalesUnits`,
            editable: true,
            valueParser: (params: ValueParserParams) => parseInt(params.newValue, 10) || 0,
          },
          {
            headerName: 'Sales Dollars',
            valueGetter: (params: ValueGetterParams<PlanningRowData>) => {
              const sku = initialSKUs.find((s: SKU) => s.Label === params.data?.sku)
              return sku
                ? Number((params.data?.[`${week.week}_SalesUnits`] as number) * sku.Price).toFixed(2)
                : '0.00'
            },
            valueFormatter: (params: ValueFormatterParams) => `$ ${params.value}`,
          },
          {
            headerName: 'GM Dollars',
            valueGetter: (params: ValueGetterParams<PlanningRowData>) => {
              const sku = initialSKUs.find((s: SKU) => s.Label === params.data?.sku)
              return sku
                ? Number(
                    (params.data?.[`${week.week}_SalesUnits`] as number) * (sku.Price - sku.Cost),
                  ).toFixed(2)
                : '0.00'
            },
            valueFormatter: (params: ValueFormatterParams) => `$ ${params.value}`,
          },
          {
            headerName: 'GM %',
            valueGetter: (params: ValueGetterParams<PlanningRowData>) => {
              const salesDollars =
                (params.data?.[`${week.week}_SalesUnits`] as number) *
                (initialSKUs.find((s: SKU) => s.Label === params.data?.sku)?.Price || 0)

              const gmDollars =
                (params.data?.[`${week.week}_SalesUnits`] as number) *
                ((initialSKUs.find((s: SKU) => s.Label === params.data?.sku)?.Price || 0) -
                  (initialSKUs.find((s: SKU) => s.Label === params.data?.sku)?.Cost || 0))

              return salesDollars ? ((gmDollars / salesDollars) * 100).toFixed(2) : '0.00'
            },
            valueFormatter: (params: ValueFormatterParams) => `${params.value} %`,
            cellStyle: (params: CellClassParams) => {
              const value = parseFloat(params.value as string)
              if (value >= 40) return { backgroundColor: 'green', color: 'white' }
              if (value >= 10) return { backgroundColor: 'yellow', color: 'black' }
              if (value > 5) return { backgroundColor: 'orange', color: 'black' }
              return { backgroundColor: 'red', color: 'white' }
            },
          },
        ],
      }),
    )

    return [
      { headerName: 'Store', field: 'store', pinned: 'left' },
      { headerName: 'SKU', field: 'sku', pinned: 'left' },
      ...weekColumns,
    ]
  }, [rowData])

  return (
    <div className="ag-theme-alpine" style={{ height: 600, width: '100%' }}>
      <AgGridReact
        rowData={rowData}
        columnDefs={columns}
        defaultColDef={{ resizable: true }}
      />
    </div>
  )
}

export default PlanningScreen
