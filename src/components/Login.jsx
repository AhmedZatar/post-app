import { useState, useContext } from "react/cjs/react.development";
import DataContext from "../store/data-context";
import Button from "@material-ui/core/Button";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import { TextField } from "@material-ui/core";
import { ThemeProvider, createTheme } from "@material-ui/core/styles";
import { orange } from "@material-ui/core/colors";
import "fontsource-roboto";
import { Typography } from "@material-ui/core";
import Box from "@material-ui/core/Box";

const theme = createTheme({
  typography: {
    h3: {
      fontSize: 30,
    },
  },
  palette: {
    primary: {
      main: orange[800],
    },
  },
});

const Login = () => {
  const dataCtx = useContext(DataContext);

  const [passwrod, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [incorrectSubmit, setIncorrectSubmit] = useState(false);

  const passwordChangeHandler = (event) => {
    setPassword(event.target.value);
  };

  const emailChangeHandler = (event) => {
    setEmail(event.target.value);
  };

  const submitHandler = (event) => {
    event.preventDefault();
    if (dataCtx.emails.includes(email.trim()) || passwrod === "123") {
      dataCtx.getId(email.trim());


    } else {
      
      setIncorrectSubmit(true);
      setPassword("");
      setEmail("");

    }
  };

  return (
    <ThemeProvider theme={theme}>
      <Box
        display="flex"
        flexDirection="column"
        maxWidth='300px'
        minWidth="200px"
        margin="auto"
        marginTop="80px"
        bgcolor="#b0b0b0"
        color="orange"
        padding="20px"
        borderRadius="10px"
      >
        <Typography variant="h3">Welcome</Typography>
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
      </Box>
    </ThemeProvider>
  );
};

export default Login;
