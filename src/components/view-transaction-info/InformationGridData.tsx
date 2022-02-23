import React from "react";
import "./DataGridInfo.css";
import {
  Box,
  Collapse,
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Tooltip,
  Typography,
} from "@mui/material";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";

function createData(
  creationDate: number,
  appID: number,
  startime: number,
  endTime: number,
  reserveAmount: number,
  minIncrement: number,
  bids : any[]
) {
  return {
    creationDate,
    appID,
    startime,
    endTime,
    reserveAmount,
    minIncrement,
    bids: bids,
  };
}

function Row(props: { row: ReturnType<typeof createData> }) {
  const { row } = props;
  const [open, setOpen] = React.useState(false);

  return (
    <React.Fragment>
      <TableRow sx={{ "& > *": { borderBottom: "unset" } }}>
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell component="th" scope="row">
          {(new Date(row.creationDate*1000)).toJSON().slice(0,10)}
        </TableCell>
        <TableCell align="right">{row.appID}</TableCell>
        <TableCell align="right">{(new Date(row.startime*1000)).toJSON().slice(0,10)}</TableCell>
        <TableCell align="right">{(new Date(row.endTime*1000)).toJSON().slice(0,10)}</TableCell>
        <TableCell align="right">{row.reserveAmount}</TableCell>
        <TableCell align="right">{row.minIncrement}</TableCell>
        <TableCell align="right">({row.bids.length})</TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={8}>
         {row.bids.length >0 &&    <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <Typography variant="h6" gutterBottom component="div">
                Bidders Details
              </Typography>
            
              <Table size="small" aria-label="purchases" className="grid-width">
                <TableHead>
                  <TableRow>
                    <TableCell>Bid date</TableCell>
                    <TableCell>Bid ID</TableCell>
                    <TableCell align="right">Bid Amount</TableCell>
                    <TableCell align="right">Bider address</TableCell>
                  </TableRow>
                </TableHead>
                
                <TableBody>
                  {row.bids.map((bidsRow : any) => (
                    <TableRow key={bidsRow.createdDate}>
                      <TableCell component="th" scope="row">
                        {bidsRow.createdDate}
                      </TableCell>
                      <TableCell>{bidsRow.id}</TableCell>
                      <TableCell align="right">{bidsRow.bidAmount}</TableCell>
                      <TableCell align="right">
                       {bidsRow.bidder}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>

            </Box>
          </Collapse>
                  }
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}


interface propsDialogeModal {
  allAuction?: any[];
}

const InformationGridData = ({ allAuction }: propsDialogeModal) => {
  let rows : any = [];
  // createData(allAuction?[0]., 159, 6.0, 24, 4.0, 3.99),
  // createData('Ice cream sandwich', 237, 9.0, 37, 4.3, 4.99),
  // createData('Eclair', 262, 16.0, 24, 6.0, 3.79),
  // createData('Cupcake', 305, 3.7, 67, 4.3, 2.5),
  // createData('Gingerbread', 356, 16.0, 49, 3.9, 1.5),

  allAuction?.map((item: any) =>
    rows.push(
      createData(
        item.createdDate,
        item.applicationId,
        item.startTime,
        item.endTime,
        item.minIncrement,
        item.minIncrement,
        item.bids
      )
    )
  );

  return (
    <TableContainer component={Paper}>
      <Table aria-label="collapsible table">
        <TableHead>
          <TableRow>
            <TableCell />
            <TableCell>Bidding started at</TableCell>
            <TableCell align="right">Application Id</TableCell>
            <TableCell align="right">Start Time</TableCell>
            <TableCell align="right">End Time</TableCell>
            <TableCell align="right">Reserve Amount</TableCell>
            <TableCell align="right">Minimum Increment Amount</TableCell>
            <TableCell align="right">Total bids</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row:any) => (
            <Row key={row.applicationId} row={row} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
export default InformationGridData;
