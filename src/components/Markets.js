import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { useEffect } from 'react';


export default function Markets({coinData}) {
    function createData(id, symbol, priceUsd, changePercent24Hr) {
      return { id, symbol, priceUsd, changePercent24Hr };
    }
    
    // const rows = [{
    //     id: 'id',
    //     symbol: 'symbol',
    //     priceUsd: '$$',
    //     changePercent24Hour: 'change24hr'
    // }]
    
    
    React.useEffect(() => {
        console.log('rerender')
    }, [coinData])
    if(!coinData.data) {
        return (
            <div>
                Loading...
            </div>
        )
    } else {
        const rows = coinData.data.map(coin => (
            createData(coin.id, coin.symbol, (Math.round(coin.priceUsd*100)/100), (Math.round(coin.changePercent24Hr* 100)/100))
        ))
        return (
            <div>
                <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 650 }} aria-label="simple table">
                        <TableHead>
                        <TableRow>
                            <TableCell>Coin</TableCell>
                            <TableCell align="right">Symbol</TableCell>
                            <TableCell align="right">Price (USD)</TableCell>
                            <TableCell align="right">24 Hour Change</TableCell>
                        </TableRow>
                        </TableHead>
                        <TableBody>
                        {rows.map((row) => (
                            <TableRow
                            key={row.id}
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                            <TableCell component="th" scope="row">
                                {row.id}
                            </TableCell>
                            <TableCell align="right">{row.symbol}</TableCell>
                            <TableCell align="right">${row.priceUsd}</TableCell>
                            <TableCell align="right">${row.changePercent24Hr}</TableCell>
                            </TableRow>
                        ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            <button onClick={() => console.log(coinData.data)}>show coindata.data</button>
            </div>
        );
    }
}