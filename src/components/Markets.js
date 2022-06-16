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

    function createData(id, name, symbol, priceUsd, changePercent24Hr) {
      return { id, name, symbol, priceUsd, changePercent24Hr };
    }
    
    
    useEffect(() => {
        console.log('rerender')
    }, [coinData])

    if(!coinData) {
        return (
            <div>Loading...</div>
        )
    } else if (coinData && !isMobile) {
        return (
            <TableContainer component={Paper} >
                <Table sx={{ minWidth: 650, backgroundColor: '#B2DBEB'}} aria-label="simple table">
                    <TableHead>
                        <TableRow >
                            <TableCell>Coin</TableCell>
                            <TableCell align="right">Symbol</TableCell>
                            <TableCell align="right">Price (USD)</TableCell>
                            <TableCell align="right">24 Hour Change</TableCell>
                            <TableCell align="right">Buy / Sell</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                    {coinData.map((coin) => (
                        <TableRow
                        key={coin.id}
                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                        <TableCell component="th" scope="row">
                            {coin.name}
                        </TableCell>
                        <TableCell align="right">{coin.symbol}</TableCell>
                        <TableCell align="right">${(Math.round(coin.priceUsd*100000)/100000)}</TableCell>
                        <TableCell align="right">{(Math.round(coin.changePercent24Hr* 100)/100)}%</TableCell>
                        <TableCell align="right">
                            <button style={{background: '#286e18', border: 'none'}}><BuyModal coin={coin.symbol} price={coin.priceUsd} user={user} doc={doc} /></button>
                            <button style={{background: '#f5594e', border: 'none'}}><SellModal coin={coin.symbol} price={coin.priceUsd} user={user} doc={doc} /></button>
                        </TableCell>
                        </TableRow>
                    ))}
                    </TableBody>
                </Table>
            </TableContainer>
        );
    } else {
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
                    {coinData.map((coin) => (
                        <TableRow
                        key={coin.id}
                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                            <TableCell component="th" scope="row">{coin.symbol}</TableCell>
                            <TableCell align="right">${(Math.round(coin.priceUsd*100)/100)}</TableCell>
                            <TableCell align="right">{(Math.round(coin.changePercent24Hr* 100)/100)}%</TableCell>
                            <TableCell align="right">
                                <button style={{background: '#286e18', border: 'none', height: '25px'}}><BuyModal coin={coin.symbol} price={coin.priceUsd} user={user} doc={doc} /></button>
                                <button style={{background: '#f5594e', border: 'none', height: '25px'}}><SellModal coin={coin.symbol} price={coin.priceUsd} user={user} doc={doc} /></button>
                            </TableCell>
                        </TableRow>
                    ))}
                    </TableBody>
                </Table>
            </TableContainer>
        );
    }
}