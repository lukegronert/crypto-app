import {useEffect} from 'react';
import MainNav from '../components/MainNav';
import DashboardNav from '../components/DashboardNav';
import {GoogleSpreadsheet} from 'google-spreadsheet';

const {REACT_APP_SHEET_ID} = process.env;
const {REACT_APP_GOOGLE_CLIENT_EMAIL} = process.env;
const {REACT_APP_GOOGLE_PRIVATE_KEY} = process.env;

const doc = new GoogleSpreadsheet(REACT_APP_SHEET_ID);

(async function() {
    await doc.useServiceAccountAuth({
        // env var values are copied from service account credentials generated by google
        // see "Authentication" section in docs for more info
        client_email: REACT_APP_GOOGLE_CLIENT_EMAIL,
        private_key: REACT_APP_GOOGLE_PRIVATE_KEY.replace(/\\n/g, '\n'),
      });
      await doc.loadInfo(); // loads document properties and worksheets
    }())

export default function Dashboard({coinData, setCoinData, user}) {
    useEffect(() => {
        fetch('https://api.coincap.io/v2/assets')
            .then(response => response.json())
            .then(data => {
                setCoinData(data.data)
            })
    }, []);

    return (
        <section>
            <MainNav user={user} />
            <DashboardNav coinData={coinData} setCoinData={setCoinData} user={user} doc={doc} />
        </section>
    )
}