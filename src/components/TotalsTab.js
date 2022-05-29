import {useEffect} from 'react';

export default function TotalsTab({userCoinTotals, coinData}) {

    useEffect(() => {
        console.log(userCoinTotals)
    }, [])
    return (
        <>
            {userCoinTotals.map((coin, index) => {
                return (
                    <div key={index}>
                        {coin.coin} - amount: {coin.amount}- total: ${coinData.map(coinObj => {
                            if(coin.coin === coinObj.symbol) {
                                return Math.round((coin.amount * coinObj.priceUsd)*100)/100
                            }
                        })}
                    </div>
                )
            })}
        </>
    )
}