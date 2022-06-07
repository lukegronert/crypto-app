import DonutSmallIcon from '@mui/icons-material/DonutSmall';
import '../css/coinCard.css';

export default function CoinCard({coin, amount, total}) {
    return (
        <div className="coinCard">
            <h2 className="coinCardSymbol">{coin}</h2>
            <p className="coinCardAmount">{amount} <DonutSmallIcon style={{ verticalAlign: 'middle', marginTop: '-3px'}} /></p>
            <p className="coinCardTotal">${Number(total).toFixed(2)}</p>
        </div>
    )
}