import { Avatar } from "@material-ui/core";
import Paper from "@material-ui/core/Paper";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles((theme) => ({
    root: {
      display: 'flex',
      flexDirection:'column ',
      flexGrow: 1,
      overflow: "hidden",
      padding: theme.spacing(0, 3),
      alignItems:'center',
    },
    paper: {
      maxWidth: 1000,
      minWidth: 700,
      margin: `${theme.spacing(1)}px auto`,
      padding: theme.spacing(2),
    },
    email: {
      marginTop: "5px",
      fontWeight: "bolder",
    },
  }));

const Comment = (props) => {

  const classes = useStyles();
  return (
    <Paper  className={classes.paper}>
      <Grid container wrap="nowrap" spacing={2}>
        <Grid item>
          <Avatar>{props.comment.email.substring(0, 2).toUpperCase()}</Avatar>
        </Grid>
        <Grid item xs zeroMinWidth>
          <Typography>{props.comment.body}</Typography>
          <Typography className={classes.email}>
            {props.comment.email}
          </Typography>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default Comment;
