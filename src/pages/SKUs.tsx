import React, { useState } from 'react'
import { AllCommunityModule, ColDef, ModuleRegistry } from 'ag-grid-community'
import { AgGridReact } from 'ag-grid-react'
import { initialSKUs, SKU } from '../utils/appUtils'

ModuleRegistry.registerModules([AllCommunityModule])

const SKUs: React.FC = () => {
  const [skus, setSKUs] = useState<SKU[]>(initialSKUs)

  // Columns
  const columnDefs: ColDef[] = [
    { headerName: 'SKU ID', field: 'ID', width: 120, editable: true },
    { headerName: 'Name', field: 'Label', flex: 1, editable: true },
    { headerName: 'Class', field: 'Class', width: 150, editable: true },
    {
      headerName: 'Department',
      field: 'Department',
      width: 180,
      editable: true,
    },
    {
      headerName: 'Price',
      field: 'Price',
      width: 120,
      editable: true,
      cellEditor: 'agTextCellEditor',
    },
    {
      headerName: 'Cost',
      field: 'Cost',
      width: 120,
      editable: true,
      cellEditor: 'agTextCellEditor',
    },
    {
      headerName: 'Actions',
      field: 'Actions',
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
      sku.ID === data.ID ? { ...sku, [colDef.field]: newValue } : sku,
    )
    setSKUs(updatedSKUs)
  }

  // Add a new SKU
  const handleAdd = () => {
    const newSKU: SKU = {
      ID: `SK00${skus.length + 159}`,
      Label: 'New SKU',
      Class: 'Unknown',
      Department: 'Unassigned',
      Price: 0.0,
      Cost: 0.0,
    }
    setSKUs([...skus, newSKU])
  }

  // Delete a SKU
  const handleDelete = (id: string) => {
    setSKUs(skus.filter((sku) => sku.ID !== id))
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
