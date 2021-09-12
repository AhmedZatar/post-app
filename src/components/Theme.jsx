import { createTheme, ThemeProvider } from "@material-ui/core/styles";

const theme = createTheme({
  typography: {
    h3: {
      fontSize: 30,
    },
    allVariants: {
      color: "#26418f",
    },
  },
  palette: {
    background: {
      default: "#222222",
    },
    text:{
        primary:'#283593'
    },
    primary: {
      light: "#48a697",
      main: "#007769",
      dark: "#004a3f",
      contrastText: "#fff",
    },
    secondary: {
      light: "#8e99f3",
      main: "#26418f",
      dark: "#26418f",
      contrastText: "#000",
    },
  },
});

const Theme = (props) => {
  return <ThemeProvider theme={theme}>{props.children}</ThemeProvider>;
};

export default Theme;
