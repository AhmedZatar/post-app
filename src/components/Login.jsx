import { useState, useContext } from "react/cjs/react.development";
import "./Login.css";
import DataContext from "../store/data-context";
import { useHistory } from 'react-router-dom';

function Login() {
  const dataCtx = useContext(DataContext);

  const [passwrod, setPassword] = useState("");
  const [email, setEmail] = useState("");
  let history = useHistory();



  const [incorrectSubmit, setIncorrectSubmit] = useState(false);

  function passwordChangeHandler(event) {
    setPassword(event.target.value);
  }

  function emailChangeHandler(event) {
    setEmail(event.target.value);
  }

  function submitHandler(event) {
    event.preventDefault();
    if (!dataCtx.emails.includes(email.trim()) || passwrod !== "123") {
      setIncorrectSubmit(true);
      setPassword("");
      setEmail("");

      return ;
    }else{
        let id=0
        dataCtx.emails.forEach((item,i)=>{
            if(item===email){
               id=i+1
            }
        })
        dataCtx.getId(email.trim())
        // dataCtx.onLogin()
        
        dataCtx.getUserPosts(id)
        history.push('/posts');
        
    }

  };






  return (
    <form onSubmit={submitHandler} className="login-form">
      <label>Email</label>
      <input value={email} onChange={emailChangeHandler} type="email" />

      <label>password</label>
      <input
        value={passwrod}
        onChange={passwordChangeHandler}
        type="password"
      />
      <button>Login</button>
      {incorrectSubmit && <p>Incorrect inputs please try again</p>}
    </form>
  );
};

export default Login;
