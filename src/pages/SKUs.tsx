import React, { useState } from 'react'
import { AllCommunityModule, ColDef, ModuleRegistry } from 'ag-grid-community'
import { AgGridReact } from 'ag-grid-react'
import { initialSKUs, SKU } from '../utils/appUtils'

ModuleRegistry.registerModules([AllCommunityModule])

const SKUs: React.FC = () => {
  const [skus, setSKUs] = useState<SKU[]>(initialSKUs)

  // Columns
  const columnDefs: ColDef[] = [
    { headerName: 'SKU ID', field: 'id', width: 120, editable: true },
    { headerName: 'Name', field: 'label', flex: 1, editable: true },
    { headerName: 'Class', field: 'class', width: 150, editable: true },
    {
      headerName: 'Department',
      field: 'department',
      width: 180,
      editable: true,
    },
    {
      headerName: 'Price',
      field: 'price',
      width: 120,
      editable: true,
      cellEditor: 'agTextCellEditor',
    },
    {
      headerName: 'Cost',
      field: 'cost',
      width: 120,
      editable: true,
      cellEditor: 'agTextCellEditor',
    },
    {
      headerName: 'Actions',
      field: 'actions',
      width: 120,
      cellRenderer: (params: any) => (
        <button
          className="delete-btn"
          onClick={() => handleDelete(params.data.id)}
        >
          Delete
        </button>
      ),
    },
  ]

  // Handle Cell Value Change with Validation
  const onCellValueChanged = (params: any) => {
    const { colDef, newValue, oldValue, data } = params

    if (colDef.field === 'price' || colDef.field === 'cost') {
      const numericValue = newValue.replace(/[^0-9.$]/g, '')

      if (newValue !== numericValue) {
        alert(`Invalid : ${colDef.field} only number and $ is allowed`)
        params.node.setDataValue(colDef.field, oldValue)
        return
      }
    }

    const updatedSKUs = skus.map((sku) =>
      sku.id === data.id ? { ...sku, [colDef.field]: newValue } : sku,
    )
    setSKUs(updatedSKUs)
  }

  // Add a new SKU
  const handleAdd = () => {
    const newSKU: SKU = {
      id: `SK00${skus.length + 159}`,
      label: 'New SKU',
      class: 'Unknown',
      department: 'Unassigned',
      price: '0.00',
      cost: '0.00',
    }
    setSKUs([...skus, newSKU])
  }

  // Delete a SKU
  const handleDelete = (id: string) => {
    setSKUs(skus.filter((sku) => sku.id !== id))
  }

  return (
    <div className="pageContainer">
      <div className="pageHeader">
        <button className="add-btn" onClick={handleAdd}>
          + Add SKU
        </button>
      </div>

      <div className="ag-theme-alpine grid">
        <AgGridReact
          rowData={skus}
          columnDefs={columnDefs}
          rowDragManaged={true}
          animateRows={true}
          defaultColDef={{ resizable: true, sortable: true, editable: true }}
          onCellValueChanged={onCellValueChanged}
        />
      </div>
    </div>
  )
}

export default SKUs
