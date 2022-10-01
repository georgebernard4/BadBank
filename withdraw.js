function Withdraw(){
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
  if( amt === 0 || amt === '') return [false, ''];
  amt.replaceAll( ',', '');
  amt.replaceAll( '$', '');
  //test if number
  let numAmt = Number(amt);
  if( isNaN(numAmt)) {
    let errorMsg = alertError ? "Please enter withdrawal amount that is a number." : 'Error: input not a number';
    return [false, errorMsg];
  }

  
  //test if positive
  if(numAmt < 0) {
    let errorMsg = alertError ? `Withdrawal Amounts should be positive.
      Use Deposit button for deposits.` : 'Error: enter a positive amount';
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
  
  let newBalance = balance - numAmt;
  let overdrawn = newBalance < 0 ? true : false;
  if( overdrawn){
    let amountOverdrawn = dollarFormat( Math.abs( newBalance));
    let errorMsg = alertError ? "Your account has been overdrawn. Please deposit at least " + amountOverdrawn + "." : 'Warning: this withdrawal will overdraw your account';
    return [true, errorMsg];
    
  }
  
  return [true,''];
} 

function commitWithdrawal(){
  console.log('deposit Amount ' + amountD + ' proposed');
  if( amountD === 0 || amountD === '') return;
  let [validNum, errorMsg] = validateAmount(amountD, true);
  


 //let validNum = Number(validNum)
  if(validNum){
    let newBalanceX = balance - amountD;
    
    ctx.activeUser['balance'] = newBalanceX;
    setShowD(false);
    setStatusD('');
    //recording transaction
    //ctx.history.push( 'Withdraw:  UserID = ' + userID + ' amountWithdrawn = ' + amountD + ' newBalance = ' + newBalanceX);
    let type = 'withdraw';
    let data = {
               amount:  Number(amountD),
               balance: newBalanceX           
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
  
  function commitWithdrawalEnabler(){
    if( submitButtonActive) commitWithdrawal();
  }
  
  return(
    <>
    <Card
      bgcolor = "primary"
      header  = "Withdraw"
      status  = {statusD}
      statusTxtColor="danger"
      body    = { !logged ?(
<>
<br/>
<br/>
You must login to Withdraw.

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
            

            Enter Amount to Withdraw<br/>

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
            <span className={(amountD > balance) ? 'text-danger' : ''}> {dollarFormat(Number(balance) - Number(amountD)) }</span>
                          </h5>}

            <button className={"btn btn-light" + disableClass} onClick={commitWithdrawalEnabler}>
              Complete Transaction
            </button>{' '}
            <button className={"btn btn-light" + disableClass}
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
            <h5>{'Withdrew: ' + dollarFormat( amountD)}</h5>
            <h5>Balance: 
              <span className={(0 > balance) ? 'text-danger' : ''}> {dollarFormat( balance) }</span>
            </h5>
            <button type="submit" className="btn btn-light"
              onClick={clearForm}
              >
              Withdraw Again
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