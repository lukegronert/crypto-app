import '../css/coinCard.css';

export default function TotalCoinCard({coin, amount, total}) {
    return (
        <div className="coinCard">
            <h2>{coin}</h2>
            <p>{amount}</p>
            <p>{total}</p>
        </div>
    )
}