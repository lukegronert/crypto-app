import {useEffect} from 'react';
import TotalCoinCard from './TotalCoinCard';

export default function TotalsTab({userCoinTotals, coinData}) {

    useEffect(() => {
        console.log(userCoinTotals)
    }, [])
    return (
        <section>
            <table>
                <tr>
                    <th>Coin</th>
                    <th>Amount</th>
                    <th>Total</th>
                </tr>
            </table>
                {userCoinTotals.map((coin, index) => {
                    const coinTotal = coinData.map(coinObj => {
                        if(coin.coin === coinObj.symbol) {
                            return (
                                Math.round((coin.amount * coinObj.priceUsd)*100)/100
                            )
                        }
                    });
                    return (
                        <TotalCoinCard coin={coin.coin} amount={coin.amount} total={coinTotal} />
                    )
                })}
        </section>
    )
}