// import * as React from 'react';
// import Tabs from '@mui/material/Tabs';
// import Tab from '@mui/material/Tab';
// // import * as React from 'react';
// // import PropTypes from 'prop-types';
// // import Tabs from '@mui/material/Tabs';
// // import Tab from '@mui/material/Tab';
// import Typography from '@mui/material/Typography';
// import Box from '@mui/material/Box';


// function TabPanel(props) {
  //   const { children, value, index, ...other } = props;
  
  //   return (
    //     <div
    //       role="tabpanel"
    //       hidden={value !== index}
    //       id={`vertical-tabpanel-${index}`}
    //       aria-labelledby={`vertical-tab-${index}`}
//       {...other}
//     >
//       {value === index && (
  //         <Box sx={{ p: 3 }}>
//           <Typography>{children}</Typography>
//         </Box>
//       )}
//     </div>
//   );
// }

// TabPanel.propTypes = {
  //   children: PropTypes.node,
  //   index: PropTypes.number.isRequired,
  //   value: PropTypes.number.isRequired,
// };

// function a11yProps(index) {
  //   return {
    //     id: `vertical-tab-${index}`,
    //     'aria-controls': `vertical-tabpanel-${index}`,
    //   };
    // }
    
    // export default function VerticalTabs({userPurchases, userSales, userCoinTotals}) {
//   const [value, setValue] = React.useState(0);

//   const handleChange = (event, newValue) => {
  //     setValue(newValue);
  //   };

  //   return (
    //     <Box
    //       sx={{ flexGrow: 1, bgcolor: 'background.paper', display: 'flex', height: 224 }}
    //     >
    //       <Tabs
    //         value={value}
    //         onChange={handleChange}
    //         aria-label="Vertical tabs example"
    //         sx={{ borderRight: 1, borderColor: 'divider' }}
    //       >
//         <Tab label="Totals" {...a11yProps(0)} />
//         <Tab label="Purchases" {...a11yProps(1)} />
//         <Tab label="Sales" {...a11yProps(2)} />
//       </Tabs>
//       <TabPanel value={value} index={0}>
//         <TotalsTab userCoinTotals={userCoinTotals} />
//       </TabPanel>
//       <TabPanel value={value} index={1}>
//         <PurchasesTab userPurchases={userPurchases} />
//       </TabPanel>
//       <TabPanel value={value} index={2}>
//         <SalesTab userSales={userSales} />
//       </TabPanel>
//     </Box>
//   );
// }


import * as React from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

import PurchasesTab from './PurchasesTab';
import SalesTab from './SalesTab';
import TotalsTab from './TotalsTab';

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography component={'span'}>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

export default function PortfolioTabs({userPurchases, userSales, userCoinTotals, coinData}) {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: '100%' }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs centered value={value} onChange={handleChange}>
          <Tab label="Totals" style={{color: '#424b54'}} {...a11yProps(0)} />
          <Tab label="Purchases" style={{color: '#424b54'}} {...a11yProps(1)} />
          <Tab label="Sales" style={{color: '#424b54'}} {...a11yProps(2)} />
        </Tabs>
      </Box>
      <TabPanel value={value} index={0}>
        <TotalsTab userCoinTotals={userCoinTotals} coinData={coinData} />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <PurchasesTab userPurchases={userPurchases} />
      </TabPanel>
      <TabPanel value={value} index={2}>
        <SalesTab userSales={userSales} />
      </TabPanel>
    </Box>
  );
}