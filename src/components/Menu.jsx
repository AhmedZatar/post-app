import React from "react";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import PopupState, { bindTrigger, bindMenu } from "material-ui-popup-state";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import { IconButton } from "@material-ui/core";

const Menubutton = (props) => {
  return (
    <PopupState variant="popover" popupId="demo-popup-menu">
      {(popupState) => (
        <React.Fragment>
          <IconButton
            edge="start"
            color="secondary"
            aria-label="menu"
            {...bindTrigger(popupState)}
          >
            <MoreVertIcon />
          </IconButton>
          <Menu {...bindMenu(popupState)}>
            <MenuItem
              onClick={(e) =>
                props.showUppdateHandler(e, props.id, props.title, props.body)
              }
            >
              Upddate
            </MenuItem>
            <MenuItem onClick={props.removePostHandler}>Delete</MenuItem>
          </Menu>
        </React.Fragment>
      )}
    </PopupState>
  );
};

export default Menubutton;
