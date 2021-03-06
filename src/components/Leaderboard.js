import {useState, useEffect} from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

import LinearProgress from '@mui/material/LinearProgress';
import Box from '@mui/material/Box';

import '../css/leaderboard.css';

export default function Leaderboard({coinData, setCoinData, doc}) {
    const [leaderboard, setLeaderboard] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    const getUserCoinTotals = async () => {
        await doc.loadInfo()
        const sheet1 = doc.sheetsByIndex[0];
        const sheet1Rows = await sheet1.getRows();
        const sheet3 = doc.sheetsByIndex[2];
        const sheet3Rows = await sheet3.getRows();
        let leaderboardArray = []
        for(let i=0;i<sheet1Rows.length;i++) {
            let userBank = {
                userName: sheet1Rows[i].user,
                total: Number(sheet1Rows[i].total)
            }
            sheet3Rows.forEach(row => {
                if(row.user === sheet1Rows[i].user) {
                    for(let j=0;j<coinData.length;j++) {
                        if(coinData[j].symbol === row.coin) {
                            userBank.total += (Number(coinData[j].priceUsd) * Number(row.amount))
                        }
                    }
                }
            })
            leaderboardArray.push(userBank);
        }
        leaderboardArray = leaderboardArray.sort((a,b) => b.total - a.total);
        setLeaderboard(leaderboardArray)
        setIsLoading(false)
    }

    
    useEffect(() => {
        fetch('https://api.coincap.io/v2/assets?limit=20')
        .then(response => response.json())
        .then(data => {
            setCoinData(data.data)
        })
    }, [])
    
    useEffect(() => {
        console.log('rerender')
    }, [isLoading])

    useEffect(() => {
        getUserCoinTotals()
    }, [coinData])

    if(isLoading) {
        return (
            <section className="loaderSection">
                <Box sx={{ width: '50%' }}>
                    <LinearProgress />
                </Box>
            </section>
        )
    } else {
        return (
            <TableContainer component={Paper} style={{maxWidth: '650px', margin: 'auto'}} className="leaderboardTable" >
                    <Table sx={{ maxWidth: 650, backgroundColor: '#B2DBEB' }} aria-label="simple table">
                        <TableHead>
                            <TableRow >
                                <TableCell></TableCell>
                                <TableCell align="left">Name</TableCell>
                                <TableCell align="right">Value</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                        {leaderboard.map((row, index) => (
                            <TableRow
                            key={row.userName}
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell component="th" scope="row">
                                    #{index+1}
                                </TableCell>
                                <TableCell align="left"><span className="rowValue">{row.userName}</span></TableCell>
                                <TableCell align="right"><span className="rowValue">${Number(row.total).toFixed(2)}</span></TableCell>
                            </TableRow>
                        ))}
                        </TableBody>
                    </Table>
                </TableContainer>
        )
    }
}
