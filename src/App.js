import logo from './logo.svg';
import './App.css';

import 'bootstrap/dist/css/bootstrap.min.css';
import LoginComponent from './components/LoginComponent';
import {useState,useContext,createContext,useEffect} from 'react';

import {BrowserRouter as ReactRouter,Switch,Route} from 'react-router-dom';
import NavbarComponent from './components/NavbarComponent';
import AddUserComponent from './components/AddUserComponent';
import ShowUsersComponent from './components/ShowUsersComponent';
import { getUser } from './services/authService';

export const UserContext = createContext();



function Routing()
{
  return (

    <Switch>  
      <Route path="/" exact component={AddUserComponent} />
      <Route path="/show_users" exact component={ShowUsersComponent} />
      <Route path="/login" exact component={LoginComponent} />

    </Switch>
  );
}
function App() {

  const [isLoggedIn,setLoggedIn] = useState(false);
  useEffect(() => {
   const user = getUser();
   if(user)
   {
     setLoggedIn(true);
   }
   console.log("User:",user);

  })
  return (
    <div className="App">

    <ReactRouter>
      <UserContext.Provider value={{isLoggedIn,setLoggedIn}}>
      
        <NavbarComponent/>
        <Routing/>
       

      </UserContext.Provider>
      </ReactRouter>
    </div>
  );
}

export default App;
