import React, { useState, useMemo } from 'react'
import { ColDef, ModuleRegistry } from 'ag-grid-community'
import { ClientSideRowModelModule } from 'ag-grid-community'
import { AgGridReact } from 'ag-grid-react'
import { initialStores, initialSKUs, calenderData } from '../utils/appUtils'

ModuleRegistry.registerModules([ClientSideRowModelModule])

// Generate cross-joined row data (Stores x SKUs)
const generateRows = () => {
  let rows: any[] = []
  initialStores.forEach((store) => {
    initialSKUs.forEach((sku) => {
      let row: any = {
        store: store.label,
        sku: sku.label,
        price: parseFloat(sku.price.replace(/[^0-9.]/g, '')),
        cost: parseFloat(sku.cost.replace(/[^0-9.]/g, '')),
      }

      calenderData.forEach(({ monthLabel, weekLabel }) => {
        row[`${monthLabel}_${weekLabel}_salesUnits`] = 0 // Editable Sales Units
      })

      rows.push(row)
    })
  })
  return rows
}

const Planning: React.FC = () => {
  const [rowData, setRowData] = useState(generateRows())

  const getColumnDefs = useMemo(() => {
    let columns: ColDef[] = [
      { headerName: 'Store', field: 'store', rowGroup: true, hide: true },
      { headerName: 'SKU', field: 'sku', rowGroup: true, hide: true },
    ]

    calenderData.forEach(({ monthLabel, weekLabel }) => {
      columns.push({
        headerName: monthLabel,
        marryChildren: true,
        children: [
          {
            headerName: weekLabel,
            children: [
              {
                headerName: 'Sales Units',
                field: `${monthLabel}_${weekLabel}_salesUnits`,
                editable: true,
                width: 120,
                valueSetter: (params) => {
                  if (!/^\d*$/.test(params.newValue)) return false
                  params.data[params.colDef.field] = parseInt(params.newValue)
                  return true
                },
              },
              {
                headerName: 'Sales Dollars',
                field: `${monthLabel}_${weekLabel}_salesDollars`,
                width: 140,
                valueGetter: (params) => {
                  return (
                    params.data[`${monthLabel}_${weekLabel}_salesUnits`] *
                    params.data.price
                  ).toFixed(2)
                },
                cellStyle: { backgroundColor: '#f0f0f0' },
              },
              {
                headerName: 'GM Dollars',
                field: `${monthLabel}_${weekLabel}_gmDollars`,
                width: 140,
                valueGetter: (params) => {
                  return (
                    params.data[`${monthLabel}_${weekLabel}_salesDollars`] -
                    params.data[`${monthLabel}_${weekLabel}_salesUnits`] *
                      params.data.cost
                  ).toFixed(2)
                },
                cellStyle: { backgroundColor: '#f0f0f0' },
              },
              {
                headerName: 'GM %',
                field: `${monthLabel}_${weekLabel}_gmPercent`,
                width: 100,
                valueGetter: (params) => {
                  const salesDollars = parseFloat(
                    params.data[`${monthLabel}_${weekLabel}_salesDollars`],
                  )
                  const gmDollars = parseFloat(
                    params.data[`${monthLabel}_${weekLabel}_gmDollars`],
                  )

                  return salesDollars
                    ? ((gmDollars / salesDollars) * 100).toFixed(2)
                    : '0'
                },
                cellStyle: (params) => {
                  const gmPercent = parseFloat(params.value)
                  if (gmPercent >= 40)
                    return { backgroundColor: 'green', color: 'white' }
                  if (gmPercent >= 10) return { backgroundColor: 'yellow' }
                  if (gmPercent > 5) return { backgroundColor: 'orange' }
                  return { backgroundColor: 'red', color: 'white' }
                },
              },
            ],
          },
        ],
      })
    })

    return columns
  }, [])

  return (
    <div className="pageContainer">
      <h2>Planning Screen</h2>
      <div
        className="ag-theme-alpine grid"
        style={{ height: '500px', width: '100%' }}
      >
        <AgGridReact
          rowData={rowData}
          columnDefs={getColumnDefs}
          defaultColDef={{ resizable: true, sortable: true }}
          animateRows={true}
          groupDisplayType="groupRows"
        />
      </div>
    </div>
  )
}

export default Planning
