import { useContext,} from "react";
import DataContext from "./store/data-context";
import Login from "./components/Login";
import Posts from "./components/Posts";


function App() {
  const dataCtx= useContext(DataContext)


  return (
    <div>
      {!dataCtx.isLoggedin&&<Login/>}
      {dataCtx.isLoggedin&&<Posts/>}



    </div>
  );
}

export default App;
