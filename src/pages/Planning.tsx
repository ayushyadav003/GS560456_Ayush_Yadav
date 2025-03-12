import React, { useMemo, useState } from 'react'
import { AgGridReact } from 'ag-grid-react'
import 'ag-grid-community/styles/ag-grid.css'
import 'ag-grid-community/styles/ag-theme-alpine.css'
import {
  calenderData,
  initialSKUs,
  initialStores,
  planningData,
} from '../utils/appUtils'

const PlanningScreen = () => {
  const [rowData, setRowData] = useState(() => {
    return initialStores.flatMap((store) =>
      initialSKUs.map((sku) => ({
        store: store.label,
        sku: sku.Label,
        ...Object.fromEntries(
          calenderData.map((week) => [
            `${week.week}_SalesUnits`,
            planningData.find(
              (p) =>
                p.Store == store.id &&
                p.SKU == sku.ID &&
                p.Week == week.week,
            )?.['Sales Units'] || 0,
          ]),
        ),
      })),
    )
  })

  const columns = useMemo(() => {
    const weekColumns = calenderData.map((week) => ({
      headerName: week.weekLabel,
      children: [
        {
          headerName: 'Sales Units',
          field: `${week.week}_SalesUnits`,
          editable: true,
          valueParser: (params) => parseInt(params.newValue, 10) || 0,
        },
        {
          headerName: 'Sales Dollars',
          valueGetter: (params) => {
            const sku = initialSKUs.find((s) => s.Label === params.data.sku)
            return sku
              ? (params.data[`${week.week}_SalesUnits`] * sku.Price).toFixed(2)
              : 0
          },
          valueFormatter: (params) => `$ ${params.value}`,
        },
        {
          headerName: 'GM Dollars',
          valueGetter: (params) => {
            const sku = initialSKUs.find((s) => s.Label === params.data.sku)
            return sku
              ? (
                  params.data[`${week.week}_SalesUnits`] *
                  (sku.Price - sku.Cost)
                ).toFixed(2)
              : 0
          },
          valueFormatter: (params) => `$ ${params.value}`,
        },
        {
          headerName: 'GM %',
          valueGetter: (params) => {
            const salesDollars = parseFloat(
              params.getValue(`${week.week}_SalesUnits`) *
                initialSKUs.find((s) => s.Label === params.data.sku)?.Price ||
                0,
            )
            const gmDollars = parseFloat(
              params.getValue(`${week.week}_SalesUnits`) *
                (initialSKUs.find((s) => s.Label === params.data.sku)?.Price -
                  initialSKUs.find((s) => s.Label === params.data.sku)?.Cost) ||
                0,
            )
            return salesDollars
              ? ((gmDollars / salesDollars) * 100).toFixed(2)
              : 0
          },
          valueFormatter: (params) => `${params.value} %`,
          cellStyle: (params) => {
            const value = parseFloat(params.value)
            if (value >= 40) return { backgroundColor: 'green', color: 'white' }
            if (value >= 10)
              return { backgroundColor: 'yellow', color: 'black' }
            if (value > 5) return { backgroundColor: 'orange', color: 'black' }
            return { backgroundColor: 'red', color: 'white' }
          },
        },
      ],
    }))
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
