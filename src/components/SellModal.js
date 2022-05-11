import * as React from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';

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

function ChildModal({addSellToSheet, sellMessage}) {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <React.Fragment>
      <Button onClick={() => addSellToSheet(handleOpen)} style={{padding: 0}}>Confirm Sell</Button>
      <Modal
        hideBackdrop
        open={open}
        onClose={handleClose}
        aria-labelledby="child-modal-title"
        aria-describedby="child-modal-description"
      >
        <Box sx={{ ...style, width: 200 }}>
          <h2 id="child-modal-title">{sellMessage}</h2>
          <p id="child-modal-description">
            Lorem ipsum, dolor sit amet consectetur adipisicing elit.
          </p>
          <Button onClick={handleClose}>Close</Button>
        </Box>
      </Modal>
    </React.Fragment>
  );
}

export default function NestedModal({coin, price, user, doc}) {
  const [open, setOpen] = React.useState(false);
  const [amount, setAmount] = React.useState(0);
  const [total, setTotal] = React.useState(0);
  const [sellMessage, setSellMessage] = React.useState('')
  const [userCoinTotal, setUserCoinTotal] = React.useState(0)

  const checkUserCoinTotal = async () => {
      //set variable for sheet3, UserCoinTotals
      const sheet3 = doc.sheetsByIndex[2];
      //get rows
      const sheet3Rows = await sheet3.getRows()
      //Find row of user's selected coin total
      sheet3Rows.map(row => {
        if(row.user == user && row.coin == coin) {
          setUserCoinTotal(row.total)
        }
      })
    };
  
  const handleOpen = () => {
    checkUserCoinTotal()
    setOpen(true)
  };
  const handleClose = () => {
    setOpen(false);
  };

  const addSellToUserTotal = async (rows, handleOpen) => {
    //check for user's row in OverallUserData sheet
    rows.map(row => {
        if(row.user === user) {
          //Add total sale to user's total
            row.total = Number(row.total) + total
            row.save()
            handleOpen()
        }
    })
  }
  //pass in handleOpen parameter so childModal can pass in its own handleOpen function
  const addSellToSheet = async (handleOpen) => {
    const sheet1 = doc.sheetsByIndex[0]
    const sheet1Rows = await sheet1.getRows()
    //opens userCoinTotals sheet
    const sheet3 = doc.sheetsByIndex[2]
    // gets rows of that sheet
    const sheet3Rows = await sheet3.getRows()
    //checks all rows to see if user owns any of selected coin
    sheet3Rows.map(async row => {
        //if there is a row with the user's name and selected coin
        if(row.user === user && row.coin === coin) {
            //if user owns more of the coin than they want to sell
            if(row.total >= total) {
                //subtract amount they want to sell from their stock of the coin
                row.total = Number(row.total - total)
                row.amount = Number(row.amount - amount)
                row.save()
                //create variable for sheet 4, sales
                const sheet4 = doc.sheetsByIndex[3];
                //create new row in sheet with sale info
                const newRow = await sheet4.addRow({ user: user, coin: coin, price: price, amount: amount, total: total })
                //set the sell message for child modal
                setSellMessage('Success! Check your portfolio for your sale.')
                //add total from user's total and pass handleOpen function so child modal
                //can open from addSellToUserTotal function
                addSellToUserTotal(sheet1Rows, handleOpen)
                checkUserCoinTotal()
            } else {
                setSellMessage(`Sorry, you do not have enough ${coin} in the bank.`)
                handleOpen()
            }
        } else {
            setSellMessage(`Sorry, you do not have enough ${coin} in the bank.`)
            handleOpen()
        }
    })
  }

  return (
    <div>
      <a onClick={() => handleOpen()}>SELL</a>
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
          <p>Your total {coin} value: {userCoinTotal}</p>
          <p>Total price: ${total}</p>
          <ChildModal addSellToSheet={addSellToSheet} sellMessage={sellMessage} />
        </Box>
      </Modal>
    </div>
  );
}