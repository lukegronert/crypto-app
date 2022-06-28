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
                    coinTotal = coinTotal.filter(value => value !==undefined || value>0)[0]
                    return (
                        <CoinCard coin={coin.coin} amount={Math.round(coin.amount*100)/100} total={coinTotal} />
                    )
                })}
                <span>{'(coin totals and amounts that show 0 are less than 0.01)'}</span>
        </section>
    )
}