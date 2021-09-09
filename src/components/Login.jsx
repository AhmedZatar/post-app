import { useState, useContext } from "react/cjs/react.development";
// import "./Login.css";
import DataContext from "../store/data-context";
import Button from "@material-ui/core/Button";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import { TextField } from "@material-ui/core";
import { makeStyles } from "@material-ui/core";

const useStyles=makeStyles({
  root:{
    background: 'linear-gradient(45deg,#666,#999)',
    border:0,
    display:'flex',
    flexDirection:'column',
    borderRadius:15,
    padding:'0 30px',
    width:'50%',
  }
})

function DivStyled(props){
  const classes=useStyles();
  return <div className={classes.root}>{props.children}</div>
}

function Login() {
  const dataCtx = useContext(DataContext);

  const [passwrod, setPassword] = useState("");
  const [email, setEmail] = useState("");

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

      return;
    } else {
      let id = 0;
      dataCtx.emails.forEach((item, i) => {
        if (item === email) {
          id = i + 1;
        }
      });
      dataCtx.getId(email.trim());
      dataCtx.onLogin();
      dataCtx.getUserPosts(id);
    }
  }

  return (
    <DivStyled className="login-form">
      <TextField
        variant="filled"
        value={email}
        onChange={emailChangeHandler}
        type="email"
        label="Email"
        placeholder="test@test.com"
        margin="dense"
      />

      <TextField
        variant="filled"
        value={passwrod}
        onChange={passwordChangeHandler}
        type="password"
        label="Password"
        placeholder="123"
        margin="dense"
      />

      <Button
        endIcon={<ExitToAppIcon />}
        onClick={submitHandler}
        size="large"
        variant="contained"
        color="primary"
      >
        Login
      </Button>
      {incorrectSubmit && <p>Incorrect inputs please try again</p>}
    </DivStyled>
  );
}

export default Login;
