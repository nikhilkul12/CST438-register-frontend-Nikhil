
import './App.css';
import { BrowserRouter, Switch, Route, Link } from 'react-router-dom';
import StudentHome from './components/StudentHome';
import AdminHome from './components/AdminHome';
import ShowSchedule from './components/ShowSchedule';
import login from './components/login';

function App() {
  return (
    <div className="App">
      <h2>Registration Service</h2>
      <BrowserRouter>
        <div>
          <Link to="/">Student</Link>{' '}
          &nbsp;|&nbsp;&nbsp;
          <Link to="/admin">Admin</Link>{' '}
          &nbsp;|&nbsp;&nbsp;
          <Link to="/login">Login</Link>  {/* Add Login to the navigation */}
          <Switch>
            <Route exact path="/" component={StudentHome} />
            <Route path="/schedule" component={ShowSchedule} />
            <Route path="/admin" component={AdminHome} />
            <Route path="/login" component={login} />  {/* Add Route for Login */}
            <Route render={() => <h1>Page not found</h1>} />
          </Switch>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
