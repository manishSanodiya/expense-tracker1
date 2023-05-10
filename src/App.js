import { Switch, Route,Redirect} from 'react-router-dom';
import './App.css';
import Authentication from './authontication/Authentication';
import Login from './authontication/Login';
import { Fragment } from 'react';
import ProfileButton from './components/profile/ProfileButton';
import ProfileForm from './components/profile/ProfileForm';


function App() {
  return (
    <Fragment>
    
    <Switch>
    <Route path='/' exact>
          <Login />
        </Route>
        <Route path='/profile-button' exact>
          <ProfileButton />
        </Route>
        <Route path='/signup' exact>
          <Authentication />
        </Route>
        <Route path='/profile' exact>
          <ProfileForm />
        </Route>
    
    </Switch>

    </Fragment>
  );
}

export default App;
