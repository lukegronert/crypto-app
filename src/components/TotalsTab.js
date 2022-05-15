import {useEffect} from 'react';

export default function TotalsTab({userCoinTotals}) {

    useEffect(() => {
        console.log(userCoinTotals)
    }, [])
    return (
        <>
            {userCoinTotals.map(coin => {
                return (
                    <p>
                        {coin.coin} - amount: {coin.amount}- total: {coin.total}
                    </p>
                )
            })}
        </>
    )
}