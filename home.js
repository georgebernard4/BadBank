function Home(){
  
  return (
    <Card 
      bgcolor="primary"
      txtcolor="white"
      header="We tust You Bad Bank Landing Page"
      title="Welcome to the bank"
      text="You can use this bank"
      body={
        (<>
        Zero security
        <br/>
        fictitious balances.
        <br/>
        Bad Back is Right For You!
        { <img src='bank.png' className = "img-fluid" alt="Responsive image"/>}
        </> )
        } 
     
    />
  );
}