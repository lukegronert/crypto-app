import {useEffect} from 'react';

export default function TotalsTab({userCoinTotals}) {

    useEffect(() => {
        console.log(userCoinTotals)
    }, [])
    return (
        <>
            {userCoinTotals.map((coin, index) => {
                return (
                    <div key={index}>
                        {coin.coin} - amount: {coin.amount}- total: {coin.total}
                    </div>
                )
            })}
        </>
    )
}