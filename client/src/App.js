import './App.css';
import { createBrowserRouter,RouterProvider, } from 'react-router-dom'
import Air from './components/Air';
import UpdateAir from './components/UpdateAir';

const router = createBrowserRouter([
  {
    path:'/',
    element:<div><Air/></div>
  },
  {
    path:'/update/:id',
    element:<div><UpdateAir/></div>
  },
 
  
  
])
function App() {
  
  return (
    <div className="App">
      <RouterProvider router={router}/>
    </div>
  );
}

export default App;
