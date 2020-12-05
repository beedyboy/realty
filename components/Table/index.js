import React from "react";
import DataTable from "react-data-table-component";

const Table = ({ columns, data, title }) => {
  return (
    <> 
       <DataTable
       title={title ?? ''}            
            columns={columns}
            data={data}
            pagination={true}
            theme="solarized"
          />
          
     
    </>
  )
}

export default Table;
