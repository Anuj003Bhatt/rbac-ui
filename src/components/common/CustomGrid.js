import * as React from 'react';
import { DataGrid, GridToolbarColumnsButton, GridToolbarContainer, GridToolbarDensitySelector, GridToolbarExport, GridToolbarFilterButton } from '@mui/x-data-grid';
import { Button } from 'react-bootstrap';



const CustomGrid = (props) => {

    const CustomToolbar = () => {
        return (
          <GridToolbarContainer style={{margin: 2}}>
            <GridToolbarColumnsButton />
            <GridToolbarFilterButton />
            <GridToolbarDensitySelector />
            <GridToolbarExport />
            <Button onClick={props.clickAction} variant="outlined">{props.gridActionText}</Button>
          </GridToolbarContainer>
        );
    }
    
    return (
        <DataGrid 
            slots={{toolbar: CustomToolbar}}
            getRowId={(row) => row.id}
            rows={props.data}
            columns={props.columns} />
    );
}

export default CustomGrid;