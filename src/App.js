import { useContext,} from "react";
import DataContext from "./store/data-context";
import Login from "./components/Login";
import Posts from "./components/Posts";
import Theme from "./components/Theme"
import NavBar from "./components/NavBar";


function App() {
  const dataCtx= useContext(DataContext)


  return (
    <Theme>
      <NavBar/>
      {!dataCtx.isLoggedin&&<Login/>}
      {dataCtx.isLoggedin&&<Posts/>}

    </Theme>
  );
}

export default App;
