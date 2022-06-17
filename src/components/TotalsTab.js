import CoinCard from './CoinCard';

export default function TotalsTab({userCoinTotals, coinData}) {

    return (
        <section className="cardContainer">
                {userCoinTotals.map((coin, index) => {
                    // returns an array of undefined values, and one value which is the number we want
                    let coinTotal = coinData.map(coinObj => {
                        if(coin.coin === coinObj.symbol) {
                            return (
                                Math.round((coin.amount * coinObj.priceUsd)*100)/100
                            )
                        }
                    });
                    //filter out all undefined values and get the only number remaining
                    coinTotal = coinTotal.filter(value => value !==undefined)[0]
                    return (
                        <CoinCard coin={coin.coin} amount={coin.amount} total={coinTotal} />
                    )
                })}
        </section>
    )
}