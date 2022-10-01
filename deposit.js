function Deposit(){
  const [ showD,      setShowD]             = React.useState(true);
  const [ statusD,    setStatusD]           = React.useState('');
  const [ amountD,    setAmountD]           = React.useState('');
  const [ inputWGood, setInputWGood]        = React.useState(false);  
  const ctx = React.useContext(UserContext);
   console.log('status: ' + statusD) 
  let logged  = true;
  let balance = 0;
  let user = {};
  let userID = null;
  if(ctx.activeUser === null){
    logged = false;
  } else{
    user = ctx.activeUser;
    balance = user.balance;
    userID = user.userID;
  }

  function clearForm(){
    setShowD(true);
    setStatusD('');
    setAmountD('');
    setInputWGood(false)
  }
  
  
  //validates input, reports invalid input to status and alert (optionally), returns number input minus any commas or dollar signs, 
  //returns array [boolean if entry is valid, status/alert error message ( '' if no message)
 function validateAmount( amt, alertError = false){
  if( amt === 0 || amt === '') return (false, '');
  amt.replaceAll( ',', '');
  amt.replaceAll( '$', '');
  //test if number
  let numAmt = Number(amt);
  if( isNaN(numAmt)) {
    let errorMsg = alertError ? "Please enter deposit amount that is a number." : 'Error: input not a number';
    return [false, errorMsg];
  }

  
  //test if positive
  if(numAmt < 0) {
    let errorMsg = alertError ? `Deposit Amounts should be positive.
      Use Withdrawal button for Withdrawals.` : 'Error: enter a positive amount';
    return [false, errorMsg];
  }
  //test if valid dollar & cent amount
  let dollarsCents = numAmt * 100;
  let extraLeftOvers = Math.floor(dollarsCents) - dollarsCents;
  let binaryAllowence = 10 **-10;
  if( Math.abs(extraLeftOvers) > binaryAllowence) {
    let errorMsg = alertError ?  'Please enter an amount in dollars and cents.' : "Error: not a valid dollar and cents amount";
    return [false, errorMsg];
  }
  //checking for overdraw
  
  let newBalance = balance + numAmt;
  let overdrawn = newBalance < 0;
  if( overdrawn){
    let amountOverdrawn = dollarFormat( Math.abs( newBalance));
    let errorMsg = alertError ? "Your account is still overdrawn. Please deposit at least " + amountOverdrawn + "." : '';
    return [true, errorMsg];
    
  }
  
  return [true,''];
} 

function commitTransaction(){
  console.log('deposit Amount ' + amountD + ' proposed');
  if( amountD === 0 || amountD === '') return;
  let [validNum, errorMsg] = validateAmount(amountD, true);
  if(validNum){
    let newBalance = balance + Number(amountD);
    
    ctx.activeUser['balance'] = newBalance;
    setShowD(false);
    setStatusD('');

    //recording transaction
    //ctx.history.push( 'Deposit:  UserID = ' + userID + ' amountDeposited = ' + amountD + ' newBalance = ' + newBalance);

    
    let type = 'deposit';
    let data = {
               amount:  Number(amountD),
               balance: newBalance           
               };
    ctx.history.push({userID, type, data});

  } else {
    errorMsg = 'Transaction Aborted-\n' + errorMsg;
  }
  if( errorMsg !== ''){
    alert(errorMsg)
  }

}

let submitButtonActive = true;
//disabling emptyButton
if( amountD === 0 || amountD === '') submitButtonActive = false;
let disableClass = '';
if( !submitButtonActive) disableClass = 'disabled';
  
  function commitTransactionEnabler(){
    if( submitButtonActive) commitTransaction();
  }
  
  return(
    <>
    <Card
      bgcolor = "success"
      header  = "Deposit"
      status  = {statusD}
      statusTxtColor="danger"
      body    = { !logged ?(
<>
<br/>
<br/>
You must login to Deposit.

<br/>
<button className={"btn btn-light"}>
<a className="nav-link" href="#/login/">Login</a>
</button>

<button className={"btn btn-light"}>
<a className="nav-link" href="#/CreateAccount/">Open a New Account<span className="sr-only"></span></a>
</button>



</>):(<>

          
      
      { showD ? (
        <>
            <h5>{'Current Balance: '} 
              <span className={(0 > balance) ? 'text-danger' : ''}> {dollarFormat(balance)} </span>
            </h5>
            <br/>
            

            Enter Amount to Deposit<br/>

            <input className="form-control" id=   "amountD"
              placeholder=""                            value={amountD} 
              onChange={ e =>{
                let x = e.currentTarget.value;
                setAmountD(x);
                let [validnum, errorMsg] = validateAmount(x);
                setInputWGood( validnum);
                setStatusD(errorMsg);

                 }
              }




            />
            <br/>
            
            
            {inputWGood && <h5>{'New Balance will be: ' } 
            <span className={(amountD + balance < 0) ? 'text-danger' : ''}> {dollarFormat(Number(balance) + Number(amountD)) }</span>
                          </h5>}

            <button type="submit" className={"btn btn-light" + disableClass} onClick={commitTransactionEnabler}>
              Complete Transaction
            </button>{' '}
            <button type="submit" className={"btn btn-light" + disableClass}
              onClick={clearForm}
              >
              Clear Form
            </button>
            <br/>
          </>
        ):(
          <>
            <h5>Transaction Successfully Completed</h5>
            <br/>
            <br/>
            <h5>{'Deposit: ' + dollarFormat( amountD)}</h5>
            <h5>{'Balance: '} 
              <span className={(0 > balance) ? 'text-danger' : ''}> {dollarFormat( balance) }</span>
            </h5>
            <button type="submit" className="btn btn-light"
              onClick={clearForm}
              >
              Deposit Again
            </button>
          </>
        )  
      }
      


     </> )}
      
      />  
      
      </>
  )
}
// <Status classes='text-danger' status={statusD}/>
