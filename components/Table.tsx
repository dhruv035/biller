
import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Button} from '@mui/material';

function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein };
}
const rows = [
  createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
  createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
  createData('Eclair', 262, 16.0, 24, 6.0),
  createData('Cupcake', 305, 3.7, 67, 4.3),
  createData('Gingerbread', 356, 16.0, 49, 3.9),
];

export const MyTable=({onclick,data})=> {
  console.log('data zz:>> ', data);
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Query</TableCell>
            <TableCell align="right">Timestamp</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {
          data.length&&data.map((row)=>{
            return(
              <TableRow
              key={row.timestamp}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell>
              <Button variant="text" sx={{color:"#FF2",height:"48px",fontFamily:"Comic Sans MS",fontSize:"30px"}} onClick={()=>onclick("search")}>
                 {row.search}
                </Button>
              </TableCell>
              <TableCell align="right">{row.timestamp}</TableCell>
            </TableRow>
            )
          })
          }
        </TableBody>
      </Table>
    </TableContainer>
  );
}