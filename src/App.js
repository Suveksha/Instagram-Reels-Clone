import logo from './logo.svg';
import './App.css';
import SignUp from './Components/SignUp';
import Feed from './Components/Feed';
import {BrowserRouter, Switch, Route} from 'react-router-dom';
import Login from './Components/Login';
import {AuthProvider} from './Context/AuthContext';
import PrivateRoute from './Components/PrivateRoute';
import Profile from './Components/Profile';
import Ioa from './Components/Ioa';

function App() {
  return (
   
    // <BrowserRouter>
    // <AuthProvider>
    // <Switch>
    //   <Route path="/login" component={Login}></Route>
    //   <Route path="/signup" component={SignUp}></Route>
    //   {/* <Route path="/" component={Feed}></Route> */}
    //   <PrivateRoute path="/profile/:id" component={Profile}/>
    //   <PrivateRoute path="/" component={Feed}/>
    // </Switch>
    // </AuthProvider>
    // </BrowserRouter>

    <Ioa/>
  );
}

export default App;
