import CoinCard from './CoinCard.js';

export default function PurchasesTab({userPurchases}) {

    return (
        <section className="cardContainer">
            {userPurchases.map((purchase, index) => {
                return (
                    <CoinCard key={index} coin={purchase.coin} amount={purchase.amount} total={purchase.total} />
                )
            })}
        </section>
    )
}