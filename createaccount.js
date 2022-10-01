function CreateAccount(){

    const [ show,      setShow]          = React.useState(true);
    const [ statusX,   setStatusX]        = React.useState('');
    const [ name,      setName]          = React.useState('');
    const [ email,     setEmail]         = React.useState('');
    const [ password,  setPassword]      = React.useState('');
    const [ timeoutID, setTimeoutID]    = React.useState(0);
    const ctx = React.useContext(UserContext);
     console.log('status: ' + statusX) 

    function clearForm(){
      setName('');
      setEmail('');
      setPassword('');
      setShow(true);
      setStatusX('');
      clearTimeout(timeoutID);
    }
  

    function validate(field, label){
      //checking if field is empty
      if( !field){
        setStatusX('Error: missing ' + label);
        clearTimeout(timeoutID);
        setTimeoutID(setTimeout( ()=> setStatusX(''), 3000));
        return false;
      }
      return true;
    }

    function handleCreate(){
      console.log(name,email,password);
      
      if( !validate(name, 'name')){         return;}
      if( !validate(email, 'email')){       return;}
      if( !validate(password, 'password')){ return;}
      if( password.length < 8){
        setStatusX('Error: password must be at least 8 characters');
        clearTimeout(timeoutID);
        setTimeoutID(setTimeout( ()=> setStatusX(''), 3000));
        return;
      }
  
      let userID = ctx.users.length;
      ctx.users.push( { userID,name, email,password,balance: 100} );
      
      //ctx.history.push( 'New Account Created:  Name = ' + name + ' Email = ' + email + ' password = ' + password);
      let type = 'newUser';
      let data = null;
      ctx.history.push({userID, type, data});
      
       type = 'deposit';
       data = {
        amount:  100,
        balance: 100           
      };
      ctx.history.push({userID, type, data});
      //logging out at user creation
      ctx.activeUser = null;
      setShow(false);
    }


    
    let submitButtonActive = true;
    if( name === '' && email === '' && password === '') submitButtonActive = false;
    let disableClass = '';
    if( !submitButtonActive) disableClass = 'disabled';
    
    function handleCreateEnabler(){
      if( submitButtonActive) handleCreate();
    }
    
    return(
      <>
      <Card
        bgcolor = "primary"
        header  = "Create Account"
        status  = {statusX}
        statusTxtColor="danger"
        body    = { show ? (
          <>
              Name<br/>
              <input type="input" className="form-control" id=   "name"
                placeholder="Enter name"                   value={name} 
                onChange={ e =>
                  setName(e.currentTarget.value)}
                  /><br/>

              Email address<br/>
              <input type="input" className="form-control" id=   "email"
                placeholder="Enter email"                  value={email} 
                onChange={ e =>
                  setEmail(e.currentTarget.value)}
                  /><br/>

              Password<br/>
              <input type="input" className="form-control" id=    "password"
                placeholder="Enter password"               value= {password} 
                onChange={ e =>
                  setPassword(e.currentTarget.value)}
                  /><br/>
              <button type="submit" className={"btn btn-light" + disableClass} onClick={handleCreateEnabler}>
                Create Account
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
              <h5>Success</h5>
              <button type="submit" className="btn btn-light"
                onClick={clearForm}
                >
                Add another account
              </button>
            </>
          )
          
          
        }
        
        
        />  
        
        </>
    )
  }
  // <Status classes='text-danger' status={statusX}/>
