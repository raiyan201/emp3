import './App.css';

import 'bootstrap/dist/css/bootstrap.min.css';

import { BrowserRouter as Router,Route,Routes} from 'react-router-dom';
import NavbarMenu from './components/NavbarMenu';
import Home from './components/Home';

import Department from './components/Department';
import Employee from './components/Employee';
import UpdateDepartment from './components/UpdateDepartment';

function App() {
  return (
    
      <div className="App">
    
    <>
    <h1>Employee Details</h1>
    </>    
    
    <Router>
          <NavbarMenu/>
          <Routes>

            <Route path='/' element={<Home/>} />
            <Route path='/department' element={<Department/>}/>
            <Route path='/employee' element={<Employee/>}/>

          </Routes>
        </Router>
      </div>
  );
}
export default App;

