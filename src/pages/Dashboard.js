import {useEffect} from 'react';
import MainNav from '../components/MainNav';
import DashboardNav from '../components/DashboardNav';
import { GoogleSpreadsheet } from 'google-spreadsheet';

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
      console.log(doc.title);
      await doc.updateProperties({ title: 'renamed doc' });
      
      const sheet = doc.sheetsByIndex[0]; // or use doc.sheetsById[id] or doc.sheetsByTitle[title]
      console.log(sheet.title);
      console.log(sheet.rowCount);
      const rows = await sheet.getRows()
      rows.map(entry => {
          console.log(entry._rawData[0])
          console.log(entry._rawData[1])
      })
}())


export default function Dashboard({coinData, setCoinData, user}) {
    // Check if coinData exists in local storage or if it is older than 2 minutes (120,000ms)
    useEffect(() => {
        if(localStorage.getItem('coinData') === null || (new Date().getTime() - JSON.parse(localStorage.getItem('coinData')).timestamp) > 120000) {
            fetch('https://api.coincap.io/v2/assets')
                .then(response => response.json())
                .then(data => {
                localStorage.setItem('coinData', JSON.stringify(data))
                setCoinData(data)
                console.log('fetched')
                })
        } else {
            console.log(JSON.parse(localStorage.getItem('coinData')))
            setCoinData(JSON.parse(localStorage.getItem('coinData')))
            console.log('localStorage')
        }
    }, []);
    return (
        <section>
            <MainNav user={user} />
            <DashboardNav coinData={coinData} />
        </section>
    )
}