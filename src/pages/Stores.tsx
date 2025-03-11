import React, { useState } from 'react'
import { AllCommunityModule, ColDef, ModuleRegistry } from 'ag-grid-community'
import { AgGridReact } from 'ag-grid-react'
import { initialStores, Store } from '../utils/appUtils'

ModuleRegistry.registerModules([AllCommunityModule])

const Stores: React.FC = () => {
  const [stores, setStores] = useState<Store[]>(initialStores)

  // Columns
  const columnDefs: ColDef[] = [
    { headerName: 'Seq', field: 'seqNo', width: 80 },
    { headerName: 'Store ID', field: 'id', width: 120, editable: true },
    { headerName: 'Name', field: 'label', flex: 1, editable: true },
    { headerName: 'City', field: 'city', width: 150, editable: true },
    { headerName: 'State', field: 'state', width: 100, editable: true },
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

  // Cell Value Change
  const onCellValueChanged = (params: any) => {
    const updatedStores = stores.map((store) =>
      store.id === params.data.id
        ? { ...store, [params.colDef.field]: params.newValue }
        : store,
    )
    setStores(updatedStores)
  }

  // Add a new Store
  const handleAdd = () => {
    const newSeq = stores.length + 1
    const newStore: Store = {
      seqNo: newSeq,
      id: `ST0${newSeq + 34}`,
      label: 'New Store',
      city: 'Unknown',
      state: 'NA',
    }
    setStores([...stores, newStore])
  }

  // Delete a Store
  const handleDelete = (id: string) => {
    setStores(stores.filter((store) => store.id !== id))
  }

  return (
    <div className="pageContainer">
      <div className="pageHeader">
        <button className="add-btn" onClick={handleAdd}>
          + Add Store
        </button>
      </div>

      <div className="ag-theme-alpine grid">
        <AgGridReact
          rowData={stores}
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

export default Stores
