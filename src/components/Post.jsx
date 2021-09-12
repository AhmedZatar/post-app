import { Box } from "@material-ui/core";
import { Grid } from "@material-ui/core";
import { Typography } from "@material-ui/core";
import { useContext } from "react";
import DataContext from "../store/data-context";
import { Avatar } from "@material-ui/core";
import Menubutton from "./Menu";

const Post = (props) => {
  const dataCtx = useContext(DataContext);
  return (
    <Box
      display="flex"
      width="100%"
      minWidth={200}
      margin="auto"
      flexDirection="column"
      alignItems="center"
      padding={1}
      textAlign="left"
    >
      <Grid container spacing={5} alignItems="center">
        <Grid item xs={12}>
          <Grid container alignItems="center" spacing={2} direction="row">
            <Grid item xs={11}>
              <Grid container alignItems="center" spacing={1} direction="row">
                <Grid item xs={0}>
                  <Avatar>
                    {dataCtx.userData.name.substring(0, 2).toUpperCase()}
                  </Avatar>
                </Grid>
                <Grid item>
                  <Typography variant="body1" gutterBottom>
                    {dataCtx.userData.name}
                  </Typography>
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={1}>
              <Menubutton
                removePostHandler={props.removePostHandler}
                showUppdateHandler={props.showUppdateHandler}
                id={props.post.id}
                title={props.post.body}
                body={props.post.body}
        
              />
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12}>
          <Grid container alignContent="center" justifyContent="center">
            <Typography variant="h6">
              {props.post.title.toUpperCase()}
            </Typography>
          </Grid>
        </Grid>

        <Grid item xs={12}>
          <Typography variant="body1" gutterBottom>
            {props.post.body}
          </Typography>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Post;
