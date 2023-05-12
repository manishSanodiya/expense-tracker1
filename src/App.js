import { Switch, Route,Redirect} from 'react-router-dom';
import './App.css';

import Login from './authontication/Login';
import { Fragment } from 'react';
import ProfileButton from './components/profile/ProfileButton';
import ProfileForm from './components/profile/ProfileForm';
import Layout from './components/Layout/Layout';
import ForgotPassword from './authontication/ForgotPassword';
import Expenses from './components/Expenses';


function App() {
  return (
    
    <Layout>
    <Switch>
    <Route path='/' exact>
          <Login />
        </Route>
        <Route path='/profile-button' exact>
          <ProfileButton />
        </Route>
      
        <Route path='/profile' exact>
          <ProfileForm />
        </Route>
        <Route path='/forgot-password' exact>
         <ForgotPassword/>
        </Route>
    
        <Route path='/expenses' exact>
         <Expenses/>
        </Route>
    
    </Switch>
    </Layout>
   


  );
}

export default App;
