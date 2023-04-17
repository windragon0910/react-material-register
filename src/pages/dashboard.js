import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Header from "../elements/header";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import IconButton from "@mui/material/IconButton";
import ListItemText from "@mui/material/ListItemText";
import StarIcon from "@mui/icons-material/Star";

const useStyles = makeStyles(() => ({
  productContent: {
    margin: "20px auto !important",
    padding: "20px !important",
  },
}));

export default function Dashboard() {
  const classes = useStyles();
  const productList = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

  const handleClick = (event) => {
    event.currentTarget.style.color === "gray"
      ? (event.currentTarget.style.color = "green")
      : (event.currentTarget.style.color = "gray");
  };

  return (
    <div>
      <Header />
      <List sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }} className={classes.productContent}>
        {productList.map((value) => (
          <ListItem
            key={value}
            disableGutters
            secondaryAction={
              <IconButton aria-label="comment" onClick={handleClick} style={{ color: "gray" }}>
                <StarIcon />
              </IconButton>
            }
          >
            <ListItemText primary={`Product item ${value}`} />
          </ListItem>
        ))}
      </List>
    </div>
  );
}
