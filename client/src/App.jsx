import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Form from './components/pages/Form';
import UpdateForm from './components/molecula/UpdateForm';
import NavBar from './components/molecula/NavBar';
import Pet from './components/molecula/Pet';
import Main from './components/pages/Main';


function App() {

  return (
      <div className="App">
        <BrowserRouter>
        <NavBar/>
          <Routes>
          <Route path='/' element={<Main />} />
          <Route path='/pet/getPets' element={<Main />} />
          <Route path='/pet/:id' element={<Pet />} />
          <Route path='/pet/update/:id' element={<UpdateForm />} />
          <Route path='/pet/create' element={<Form />} />
          </Routes>
      </BrowserRouter>
      </div>
  );
}

export default App



 
