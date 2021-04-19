import React from 'react';
import './App.css';
import Feed from './Components/Feed';
import Header from './Components/Header';
import Login from './Components/Login';
import Sidebar from './Components/Sidebar';
import Widget from './Components/Widget';
import { useStateValue } from './StateProvider';

//TODO deploy is left
function App() {
  const [{ user }, dispatch] = useStateValue()
  
  return (
    <div className="App">
      {
        user ? (
          <>
            <Header />

            <div className="app__body">
              <Sidebar />
              <Feed />
              <Widget />
            </div>
          </>
        ) : (
         
            <Login />
            
          )
      }

    </div>
  );
}

export default App;