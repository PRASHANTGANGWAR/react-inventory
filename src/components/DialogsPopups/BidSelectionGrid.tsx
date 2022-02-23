import * as React from 'react';
import {useState} from 'react';
import { DataGrid, GridColDef, GridValueGetterParams } from '@mui/x-data-grid';

const columns: GridColDef[] = [
  { field: 'id', headerName: 'ID', width: 50 },
  {
    field: 'createdDate',
    headerName: 'Bid Date/Time',
    width: 250,
    description: 'This column shows the date and time of bidding has started.',
  },
  {
    field: 'id',
    headerName: 'Bid ID',
    width: 150,
    description: 'This column shows the bidding ID.',
  },
  {
    field: 'bidAmount',
    headerName: 'Bid Amount',
    type: 'number',
    width: 110,
    description: 'This column shows the bidding Amount of Investor.',
  },
  {
    field: 'bidder',
    headerName: 'Bider address',
    description: 'This column has a value getter and is not sortable.',
    width: 350,
  },
  {
    field: 'bidTxId',
    headerName: 'Bid Transaction ID',
    description: 'This column has a transaction id of that perticular bid',
    width: 350,
  },
];



interface propsDialogeModal {
  bids : any[];
  bidSelection:(id: string)=>void;
}


export default function BidSelectionGrid({ bids,bidSelection }: propsDialogeModal) {


  const [selectedBid, setSelectedBid] = useState("");

   const  handleRowClick=(bidId:string)=>{
    console.log("clicked"+bidId);
    setSelectedBid(bidId);
    bidSelection(selectedBid);

  }


  return (
    <div style={{ height: 400, width: '100%' }}>
      <DataGrid
        rows={bids}
        columns={columns}
        pageSize={10}
        rowsPerPageOptions={[20]}
        onRowClick={(rowData) =>handleRowClick(rowData.row.id)    } 
      
      />
      
    </div>
  );
}
