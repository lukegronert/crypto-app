import DonutSmallIcon from '@mui/icons-material/DonutSmall';
import '../css/coinCard.css';

export default function TotalCoinCard({coin, amount, total}) {
    return (
        <div className="coinCard">
            <h2>{coin}</h2>
            <p>{amount} <DonutSmallIcon style={{ verticalAlign: 'middle', marginTop: '-3px'}} /></p>
            <p>${total}</p>
        </div>
    )
}