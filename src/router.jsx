// import { useContext, } from "react";
// import DataContext from "./store/data-context";
import Login from "./components/Login";
import Posts from "./components/Posts";
import { Switch, Route } from 'react-router-dom';
function App() {
  // const dataCtx = useContext(DataContext)


  return (
    <div>
    <Switch>
      <Route exact path='/' component={Login} />
      <Route exact path='/posts' component={Posts} />

      {/* {!dataCtx.isLoggedin && <Login />}
      {dataCtx.isLoggedin && <Posts />} */}

    </Switch>
    </div>
  );
}

export default App;
