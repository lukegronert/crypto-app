import * as React from 'react';
import { GoogleSpreadsheet } from 'google-spreadsheet';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';

const {REACT_APP_SHEET_ID} = process.env;
const {REACT_APP_GOOGLE_CLIENT_EMAIL} = process.env;
const {REACT_APP_GOOGLE_PRIVATE_KEY} = process.env;

const doc = new GoogleSpreadsheet(REACT_APP_SHEET_ID);

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  pt: 2,
  px: 4,
  pb: 3,
};

function ChildModal({addPurchaseToSheet, purchaseMessage}) {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <React.Fragment>
      <Button onClick={() => addPurchaseToSheet(handleOpen)} style={{padding: 0}}>Confirm Purchase</Button>
      <Modal
        hideBackdrop
        open={open}
        onClose={handleClose}
        aria-labelledby="child-modal-title"
        aria-describedby="child-modal-description"
      >
        <Box sx={{ ...style, width: 200 }}>
          <h2 id="child-modal-title">{purchaseMessage}</h2>
          <p id="child-modal-description">
            Lorem ipsum, dolor sit amet consectetur adipisicing elit.
          </p>
          <Button onClick={handleClose}>Close Child Modal</Button>
        </Box>
      </Modal>
    </React.Fragment>
  );
}

export default function NestedModal({coin, price, user}) {
  const [open, setOpen] = React.useState(false);
  const [amount, setAmount] = React.useState(0);
  const [total, setTotal] = React.useState(0);
  const [purchaseMessage, setPurchaseMessage] = React.useState('')
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const subtractPurchaseFromUserTotal = async (rows, handleOpen) => {
    rows.map(row => {
        if(row.name === user) {
            row.bank = row.bank - total
            row.save()
            handleOpen()
        }
    })
  }
  //pass in handleOpen parameter so childModal can pass in its own handleOpen function
  const addPurchaseToSheet = async (handleOpen) => {
      //opens overallUserData sheet
    const sheet1 = doc.sheetsByIndex[0]
    // gets rows of that sheet
    const sheet1Rows = await sheet1.getRows()
    //checks all rows to look for users row
    sheet1Rows.map(async row => {
        //if there is a row with the user's name
        if(row.name == user) {
            //if the user's bank has enough money
            if(row.bank >= total) {
                //create variable for sheet 2, purchases
                const sheet2 = doc.sheetsByIndex[1];
                //create new row in sheet with purchase info
                const newRow = await sheet2.addRow({ name: user, coin: coin, price: price, total: total })
                //set the purchase message for child modal
                setPurchaseMessage('Success! Check your portfolio for your purchase.')
                //subtract total from user's bank and pass handleOpen function so child modal
                //can open from subtractPurchaseFromUserTotal function
                subtractPurchaseFromUserTotal(sheet1Rows, handleOpen)
            } else {
                setPurchaseMessage('Sorry, you do not have enough money in the bank.')
                handleOpen()
            }
        } else {
            console.log(row.name)
            console.log(user)
            console.log('User not found.')
        }
    })
  }

  return (
    <div>
      <a onClick={() => handleOpen()}>BUY</a>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="parent-modal-title"
        aria-describedby="parent-modal-description"
      >
        <Box sx={{ ...style, width: 300 }}>
          <h2 id="parent-modal-title">{coin} - ${price}</h2>
          <TextField id="outlined-basic" label="Amount" variant="outlined" onChange={(e) => {
              setAmount(e.target.value)
              setTotal(price * e.target.value)
          }} />
          <p>Total price: ${total}</p>
          <ChildModal addPurchaseToSheet={addPurchaseToSheet} purchaseMessage={purchaseMessage} />
        </Box>
      </Modal>
    </div>
  );
}