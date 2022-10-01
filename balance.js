function Balance(){
  const ctx =React.useContext(UserContext);
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
 

let type = 'balanceShown';
let data = {balance};
ctx.history.push({userID, type, data});




  return(
    <>
    <Card
      bgcolor = "info"
      header  = "Balance"
      status  = ''
      statusTxtColor="danger"
      body    = { !logged ?(
                             <>
                              <br/>
                                Please Login to see your balance.

                              <br/>
                              <button className={"btn btn-light"}>
                              <a className="nav-link" href="#/login/">Login</a>
                              </button>

                              <button className={"btn btn-light"}>
                              <a className="nav-link" href="#/CreateAccount/">Open a New Account<span className="sr-only"></span></a>
                              </button>
                            </>):(
                            <>
                                <h5>{'Current Balance: '} 
                                  <span className={(0 > balance) ? 'text-danger' : ''}> {dollarFormat(balance)} </span>
                                </h5>
                                <br/>
                            </>
                            )
   }
   />
    </>
  )
}