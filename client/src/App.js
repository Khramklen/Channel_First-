import './App.css';
import Authentication from './components/Authentication/Authentication';
import MainPage from './components/MainPage/MainPage';
import Error from './components/Error/Error';
import { Route, Routes } from 'react-router-dom';

function App() {

  return (
    <div className="App">
      <Routes>
        <Route path='/' element={<Authentication />} />
        <Route path='/main' element={<MainPage />} />
        <Route path='*' element={<Error />} />
      </Routes>
    </div>
  );
}

export default App;
