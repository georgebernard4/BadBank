function NavBar(){
  //creating hoverOver messages
  let hoverH = 'Welcome & learn a little about Bad Bank';
  let hoverC = 'create a new account\n and receive $100 credit';
  let hoverL  = 'acess your account'; 
  let hoverD  = 'add to your account'; 
  let hoverW  = 'take money out of your account'; 
  let hoverB  = 'check the balance of your account'
  let hoverA  = 'see all the info we\'re storing'
  return(
    <>
    <nav className="navbar navbar-expand-lg navbar-light bg-light" title={hoverH}>
  <a className="navbar-brand" href="#/home/">Trusting Bank</a>
  <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
    <span className="navbar-toggler-icon"></span>
  </button>
  <div className="collapse navbar-collapse" id="navbarNav">
    <ul className="navbar-nav">
      <li className="nav-item active" title={hoverH}>
        <a className="nav-link" href="#/home/">Home<span className="sr-only"></span></a>
      </li>
      <li className="nav-item active">
        <a className="nav-link" href="#/CreateAccount/" title={hoverC}>Create Account<span className="sr-only"></span></a>
      </li>
      <li className="nav-item">
        <a className="nav-link" href="#/login/" title={hoverL}>Login</a>
      </li>
      <li className="nav-item">
        <a className="nav-link" href="#/deposit/" title={hoverD}>Deposit</a>
      </li>
      <li className="nav-item">
        <a className="nav-link" href="#/withdraw/" title={hoverW}>Withdraw</a>
      </li>
      <li className="nav-item">
        <a className="nav-link" href="#/balance/" title={hoverB}>Balance</a>
      </li>
      <li className="nav-item">
        <a className="nav-link" href="#/alldata/" title={hoverA}>All Data</a>
      </li>
    </ul>
  </div>
</nav>
    
    
    </>
  );
}