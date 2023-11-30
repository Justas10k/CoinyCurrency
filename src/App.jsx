import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import {Route, Routes} from 'react-router-dom'

import Home from './Pages/Home'

function App() {
  return (
    <>
    <Routes>
      <Route path='/' element={<Home />}> </Route>
    </Routes> 
    </>
  )
}

export default App