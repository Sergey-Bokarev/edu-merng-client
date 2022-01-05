import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Container } from 'semantic-ui-react';

import { AuthProvider } from './context/auth';
import PrivateRoute from './util/PrivateRoute';
import SinglePost from './pages/SingelPost';
import AuthRoute from './util/AuthRoute';

import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import MenuBar from './components/MenuBar';

import './App.css';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Container>
          <MenuBar />
          <Routes>
            <Route exact path='/' element={<Home/>}/>
            <Route exact path='/posts/:postId' element={<SinglePost/>}/>
            <Route exact path='/login' element={<AuthRoute/>}>
              <Route exact path='/login' element={<Login/>}/>
            </Route>
            <Route exact path='/register' element={<AuthRoute/>}>
              <Route exact path='/register' element={<Register/>}/>
            </Route>
          </Routes>
        </Container>
      </Router>
    </AuthProvider>
  );
}

export default App;
