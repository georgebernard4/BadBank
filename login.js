function Login(){

  const [ show,      setShow]          = React.useState(true);
  const [ statusX,   setStatusX]        = React.useState('');
  const [ nameEmail, setNameEmail]          = React.useState('');
  const [ password,  setPassword]      = React.useState('');
  const [ timeoutID, setTimeoutID]    = React.useState(0);
  const [ name, setName]              = React.useState('');
  const ctx = React.useContext(UserContext);
  console.log(ctx)
  //  console.log('status: ' + statusX)    
  function clearForm(){
    setName('');
    setNameEmail('');
    setPassword('');
    setStatusX('')
    setShow(true);
  }

  function tempErrorMessage( errorMsg, displayTime = 3000){
    setStatusX(errorMsg);
    clearTimeout(timeoutID);
    setTimeoutID(setTimeout( ()=> setStatusX(''), displayTime));
  }

  function check4Empty(field, label){
    //checking if field is empty
    if( !field){
      let errorMsg = 'Error: No ' + label + ' given';
      tempErrorMessage(errorMsg);
      return false;
    }
    return true;
  }

  

  function handleSignIn(){
    console.log(nameEmail,password);
    
    if( !check4Empty(nameEmail, 'name or email')){         return;}
    if( !check4Empty(password, 'password')){               return;}
    if( ctx.users === undefined || ctx.users.length === 0){ 
      tempErrorMessage('bank has no accounts yet');
      return;
    }
    let users = ctx.users;
    let recognizedUsers =[];
    for( let i = 0; i < users.length; i++){
      let user = users[i];
      let nameI = user.name;
      let emailI = user.email;
      if( nameI === nameEmail || emailI === nameEmail){
        recognizedUsers.push(i);
      }
    }
    if( recognizedUsers.length === 0){
      tempErrorMessage('Name or Email not found');
      return;
    }
    
    let accountPasswordMatch = [];
    for( let i =0; i < recognizedUsers.length; i++){
      let userX = users[recognizedUsers[i]];
      let passwordI = userX['password'];
      if( passwordI === password){ 
        accountPasswordMatch.push(recognizedUsers[i])
      }
    }
    if( accountPasswordMatch.length === 0){
      tempErrorMessage('ivalid password');
      return;
    }
    if( accountPasswordMatch. length > 1){
      tempErrorMessage('please use e-mail address');
      return;
    }

    setShow(false);
    let user = users[accountPasswordMatch[0]];
    ctx.activeUser = user;
    let nameX = user['name'];
    setName( nameX);
    //ctx.history.push('Login: loginID = ' + user.userID  );
    let userID = user.userID;
    let type = 'login';
    let data = null;
    ctx.history.push({userID, type, data});
    return;
  }
  
  
  return(
    <>
    <Card
      bgcolor = "primary"
      header  = "Login to Account"
      status  = {statusX}
      statusTxtColor="danger"
      body    = { show ? (
        <>
            Name or Email Address<br/>
            <input type="input" className="form-control" id=   "nameEmail"
              placeholder="Enter name or Email"                   value={nameEmail} 
              onChange={ e =>
                setNameEmail(e.currentTarget.value)}
                /><br/>
            Password<br/>
            <input type="input" className="form-control" id=    "password"
              placeholder="Enter password"               value= {password} 
              onChange={ e =>
                setPassword(e.currentTarget.value)}
                /><br/>
            <button type="submit" className="btn btn-light" onClick={handleSignIn}>
              Sign in
            </button>
            <br/>
          </>
        ):(
          <>
            <h5>Welcome {name}!</h5>
            <button type="submit" className="btn btn-light"
              onClick={clearForm}
              >
              login to another account
            </button>
          </>
        )
        
        
      }
      
      
      />  
      
      </>
  )
}