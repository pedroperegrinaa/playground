import './App.css';
import { useContext, useEffect } from 'react';
import { AuthContext, useAuth } from './providers/auth';
import Profile from './components/profile';
import Login from './components/login';

function App() {
  const {user, setUser} = useAuth();

  console.log(user);

  useEffect(() => {
    console.log('effect');
    const userStorage = localStorage.getItem('user');
    if(userStorage){
      setUser(JSON.parse(userStorage))
    } else {
      setUser({
        name: 'vazio'
      })
    }
  }, [])

  return (
    <div className="App">
      
      <h1>Hello World</h1>
      <input type="text" onChange={(e) => setUser({name: e.target.value})}></input>
      <Profile/>
      <Login/>
    </div>
  );
}

export default App;
