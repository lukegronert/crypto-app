import {useState, useEffect} from 'react';

export default function Leaderboard({coinData, setCoinData, doc}) {
    const [leaderboard, setLeaderboard] = useState([]);
    const getUserCoinTotals = async () => {
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
        leaderboardArray = leaderboardArray.sort((a,b) => a.total - b.total);
        setLeaderboard(leaderboardArray)
    }

    useEffect(() => {
        fetch('https://api.coincap.io/v2/assets?limit=20')
            .then(response => response.json())
            .then(data => {
                setCoinData(data.data)
            })
    }, [])

    useEffect(() => {
        getUserCoinTotals()
    }, [coinData])

    return (
        <section>
            {leaderboard.map(user => {
                return (
                    <div key={user.user}>{user.user} - {user.total}</div>
                )
            })}
        </section>
    )
}