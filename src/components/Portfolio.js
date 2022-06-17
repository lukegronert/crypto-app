import {useEffect, useState} from 'react';
import PortfolioTabs from './PortfolioTabs';
import DonutSmallIcon from '@mui/icons-material/DonutSmall';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';

import '../css/portfolio.css'

export default function Portfolio({user, coinData, doc}) {
    const [userTotal, setUserTotal] = useState(0)
    const [userPurchases, setUserPurchases] = useState([])
    const [userSales, setUserSales] = useState([])
    const [userCoinTotals, setUserCoinTotals] = useState([])
    const [portfolioValue, setPortfolioValue] = useState(0)
    const [isLoading, setIsLoading] = useState(true)

    const getUserTotal = async () => {
        await doc.loadInfo()
        const sheet1 = doc.sheetsByIndex[0]
        const sheet1Rows = await sheet1.getRows()
        sheet1Rows.map(row => {
            if(row.user === user) {
                setUserTotal(row.total)
            }
        })
        setIsLoading(false)
    }
    const getUserPurchases = async () => {
        const sheet2 = doc.sheetsByIndex[1];
        const sheet2Rows = await sheet2.getRows();
        let purchasesArray = []
        await sheet2Rows.map(row => {
             if(row.user === user) {
                purchasesArray.push({coin: row.coin, price: row.price, amount: row.amount, total: row.total})
            }
        })
        console.log(purchasesArray)
        setUserPurchases(purchasesArray)
    }
    const getUserSales = async () => {
        const sheet4 = doc.sheetsByIndex[3];
        const sheet4Rows = await sheet4.getRows();
        let salesArray = []
        await sheet4Rows.map(row => {
            if(row.user === user) {
                salesArray.push({coin: row.coin, price: row.price, amount: row.amount, total: row.total})
            }
        })
        setUserSales(salesArray)
    }
    const getUserCoinTotals = async () => {
        const sheet3 = doc.sheetsByIndex[2];
        const sheet3Rows = await sheet3.getRows();
        let coinTotalsArray = []
        await sheet3Rows.map(row => {
            if(row.user === user) {
                coinTotalsArray.push({coin: row.coin, amount: row.amount, total: row.total})
            }
        })
        setUserCoinTotals(coinTotalsArray)
        console.log(coinTotalsArray)
    }

    const getPortfolioValue = () => {
        let portVal = 0;
        userCoinTotals.forEach(coin => {
            for(let i=0; i<coinData.length;i++) {
                if(coin.coin === coinData[i].symbol) {
                    portVal += (coin.amount * coinData[i].priceUsd)
                    console.log(portVal)
                }
            }
        })
        setPortfolioValue(Math.round(portVal*100)/100);
    }
    //Adds 10000 to user total, hides button, displays message telling user that they now have $10,000 in the bank 
    const initUserBank = async () => {
        const initUserButton = document.querySelector('.initUserButton');
        initUserButton.style.display = 'none';
        const initUserMessage = document.querySelector('.initUserMessage');
        initUserMessage.style.display = 'block';
        const sheet1 = doc.sheetsByIndex[0];
        const sheet1Rows = await sheet1.getRows()
        if(sheet1Rows.filter(row => row.user === user).length === 0) {
            const newSheet1Row = await sheet1.addRow({ user: user, total: 10000 })
        }
    }

    useEffect(() => {
        getUserCoinTotals()
        getUserPurchases()
        getUserSales()
        getUserTotal()
    }, [])

    useEffect(() => {
        getPortfolioValue()
    }, [userCoinTotals, userTotal])
    if (isLoading) {
        return (
            <div>Loading...</div>
        )
    } else if(user && userTotal > 0) {
        return (
            <section>
                <section className="portfolioHeader">
                    <p>{user}</p>
                    <p><AccountBalanceIcon style={{verticalAlign: 'middle', marginTop: '-3px'}} /> ${(Math.round(userTotal*100)/100)}</p>
                    <p><DonutSmallIcon style={{ verticalAlign: 'middle', marginTop: '-3px'}} /> ${portfolioValue}</p>
                </section>
                <PortfolioTabs userPurchases={userPurchases} userSales={userSales} userCoinTotals={userCoinTotals} coinData={coinData} />
            </section>
        )
    } else if (user && userTotal < 0) {
        return (
            <section>
                <h1>{user}</h1>
                <button className="initUserButton" onClick={() => initUserBank()}>Fill your bank!</button>
                <p className="initUserMessage" style={{display: 'none'}}>Your account now has $10,000 to invest!</p>
            </section>
        )
    } else {
        return (
            <section>
                <h1>Login to view your portfolio</h1>
            </section>
        )
    }
}