import {useEffect} from 'react';
import { useMediaQuery } from 'react-responsive';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

import BuyModal from './BuyModal.js'
import SellModal from './SellModal.js'

import '../css/markets.css';


export default function Markets({coinData, user, doc}) {
    const isMobile = useMediaQuery({ query: `(max-width: 760px)` });

    function createData(id, symbol, priceUsd, changePercent24Hr) {
      return { id, symbol, priceUsd, changePercent24Hr };
    }
    
    
    useEffect(() => {
        console.log('rerender')
    }, [coinData])

    if(!coinData.data) {
        return (
            <div>
                Loading...
            </div>
        )
    } else if (coinData.data && !isMobile) {
        const rows = coinData.data.map(coin => (
                                                        //multiple and divide by 10000 to return numbers to 4 decimal places
            createData(coin.id, coin.symbol, (Math.round(coin.priceUsd*10000)/10000), (Math.round(coin.changePercent24Hr* 100)/100))
        ))

        return (
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Coin</TableCell>
                            <TableCell align="right">Symbol</TableCell>
                            <TableCell align="right">Price (USD)</TableCell>
                            <TableCell align="right">24 Hour Change</TableCell>
                            <TableCell align="right">Buy / Sell</TableCell>
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
                        <TableCell align="right">{row.changePercent24Hr}%</TableCell>
                        <TableCell align="right">
                            <button style={{background: 'blue'}}><BuyModal coin={row.symbol} price={row.priceUsd} user={user} doc={doc} /></button>
                            <button style={{background: 'green'}}><SellModal coin={row.symbol} price={row.priceUsd} user={user} doc={doc} /></button>
                        </TableCell>
                        </TableRow>
                    ))}
                    </TableBody>
                </Table>
            </TableContainer>
        );
    } else {
        const rows = coinData.data.map(coin => (
            createData(coin.id, coin.symbol, (Math.round(coin.priceUsd*100)/100), (Math.round(coin.changePercent24Hr* 100)/100))
        ))

        return (
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 300 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Sym</TableCell>
                            <TableCell align="right">Price</TableCell>
                            <TableCell align="right">24Hr</TableCell>
                            <TableCell align="right">Trade</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                    {rows.map((row) => (
                        <TableRow
                        key={row.id}
                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                            <TableCell component="th" scope="row">{row.symbol}</TableCell>
                            <TableCell align="right">${row.priceUsd}</TableCell>
                            <TableCell align="right">{row.changePercent24Hr}%</TableCell>
                            <TableCell align="right">
                                <button style={{background: '#286e18', border: 'none', height: '25px'}}><BuyModal coin={row.symbol} price={row.priceUsd} user={user} doc={doc} /></button>
                                <button style={{background: '#f5594e', border: 'none', height: '25px'}}><SellModal coin={row.symbol} price={row.priceUsd} user={user} doc={doc} /></button>
                            </TableCell>
                        </TableRow>
                    ))}
                    </TableBody>
                </Table>
            </TableContainer>
        );
    }
}