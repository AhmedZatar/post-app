// import { useContext, } from "react";
// import DataContext from "./store/data-context";
import { BrowserRouter } from 'react-router-dom';
import Router from './router';
function App() {
  // const dataCtx = useContext(DataContext)


  return (
    <BrowserRouter>
    <Router/>
    </BrowserRouter>
  );
}

export default App;
