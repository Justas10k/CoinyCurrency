import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';


import { Outlet } from 'react-router-dom';

function App() {
  return (
    <>
      <h1>hello world</h1>
      <Outlet/>
    </>
  )
}

export default App