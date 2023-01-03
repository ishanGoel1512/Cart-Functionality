import './App.css';
import Cart from './components/Cart';
import Header from './components/Header';
import {BrowserRouter, Route , Switch} from 'react-router-dom';
import Home from './components/Home';
function App() {
  return (
    <BrowserRouter>
    <Header/>
      <Switch>
      <Route exact path="/">
      <Home/>
     </Route>
     <Route path="/cart" >
      <Cart/>
     </Route>
      </Switch>
    </BrowserRouter>
   
  );
}

export default App;
