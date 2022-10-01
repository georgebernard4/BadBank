

function Spa(){
  return (
    <HashRouter>
      <UserContext.Provider value={{users:[{userID:0,name:'George',email:'george@mit.edu',password:'secret',balance:100}],
                                    accounts:null, 
                                    activeUser:null,
                                    history:[]
                                  }}>
        <NavBar/>
        <Route path="/"     exact     component={Home}          />
        <Route path="/home"           component={Home}          />
        <Route path="/CreateAccount/" component={CreateAccount} />
        <Route path="/alldata/"       component={AllData}       />
        <Route path="/balance/"       component={Balance}       />
        <Route path="/deposit/"       component={Deposit}       />
        <Route path="/withdraw/"      component={Withdraw}      />
        <Route path="/login/"         component={Login}         />
      </UserContext.Provider>
    </HashRouter>
  
  );

}
ReactDOM.render(
  <Spa/>,
  document.getElementById('root')
);