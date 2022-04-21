import * as React from 'react';
import Leaderboard from './Leaderboard';
import Markets from './Markets';
import Portfolio from './Portfolio';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';

export default function DashboardNav({coinData, getCoinData}) {
  const [value, setValue] = React.useState('1');

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: '100%', typography: 'body1' }}>
      <TabContext value={value}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <TabList onChange={handleChange} aria-label="lab API tabs example" centered>
            <Tab label="Leaderboard" value="1" />
            <Tab label="Markets" value="2" />
            <Tab label="Portfolio" value="3" />
          </TabList>
        </Box>
        <TabPanel value="1"><Leaderboard /></TabPanel>
        <TabPanel value="2"><Markets coinData={coinData} /></TabPanel>
        <TabPanel value="3"><Portfolio /></TabPanel>
      </TabContext>
    </Box>
  );
}