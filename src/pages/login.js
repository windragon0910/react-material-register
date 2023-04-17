import React, { useState, useEffect } from "react";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import { MuiThemeProvider, createTheme } from "@material-ui/core/styles";
import InputAdornment from "@material-ui/core/InputAdornment";
import Lock from "@material-ui/icons/Lock";
import AccountCircle from "@material-ui/icons/AccountCircle";
import axios from "axios";
import { BACKEND_URL } from "../helper/constants";
import { LOGIN_REQUEST } from "./../redux/actionTypes";
import { useDispatch } from "react-redux";
import { Form, Formik } from "formik";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import { useNavigate } from "react-router-dom";

const theme = createTheme({
  palette: {
    primary: { main: "#F5B62A" },
    secondary: { main: "#383938" },
  },
});

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(25),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: "30px",
    backgroundColor: "white",
    borderradius: "4px",
    boxShadow: "0px 1px 5px 0px rgba(0,0,0,0.2), 0px 2px 2px 0px rgba(0,0,0,0.14), 0px 3px 1px -2px rgba(0,0,0,0.12)",
  },
  inputF: {},
  avatar: {
    margin: theme.spacing(2),
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

const SignIn = () => {
  const [disableBtn, disableButton] = useState(false);
  const [open, setOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const classes = useStyles();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    localStorage.removeItem("token");
  }, []);

  dispatch({
    type: LOGIN_REQUEST,
    payload: "",
  });

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  const handleSubmit = async (values) => {
    const { username, password } = values;

    const data = {
      username,
      password,
    };

    disableButton(true);
    document.getElementById("btnLogin").style = "background: #666666";

    axios
      .post(`${BACKEND_URL}auth/signin`, data)
      .then((result) => {
        dispatch({
          type: LOGIN_REQUEST,
          payload: result.data.id,
        });
        localStorage.setItem("token", result.data.accessToken);
        navigate("/home");
      })
      .catch((error) => {
        disableButton(false);
        setErrorMessage(error.response.data.message);
        setOpen(true);
        document.getElementById("btnLogin").style = "background: #383938";
      });
  };

  return (
    <MuiThemeProvider theme={theme}>
      <Container component="main" maxWidth="sm">
        <CssBaseline />
        <div className={classes.paper}>
          <Typography component="div">
            <Box fontSize={30} fontWeight={600} m={-2}>
              SIGN IN
            </Box>
          </Typography>
          <Typography component="div">
            <Box fontSize={16} m={1} paddingt="true">
              Sign into your account
            </Box>
          </Typography>
          <Formik
            initialValues={{
              username: "",
              password: "",
            }}
            onSubmit={handleSubmit}
          >
            {({ values, handleChange }) => {
              return (
                <Form>
                  <Grid container direction="row" justifyContent="center" alignItems="center">
                    <Grid item xs={9}>
                      <TextField
                        className={classes.inputF}
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        id="username"
                        label="User Name"
                        name="username"
                        value={values.username}
                        onChange={handleChange}
                        autoComplete="username"
                        autoFocus
                        InputProps={{
                          startAdornment: (
                            <InputAdornment position="start">
                              <AccountCircle color="disabled" />
                            </InputAdornment>
                          ),
                        }}
                      />
                    </Grid>

                    <Grid item xs={9}>
                      <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        name="password"
                        label="Password"
                        type="password"
                        id="password"
                        value={values.password}
                        onChange={handleChange}
                        autoComplete="current-password"
                        InputProps={{
                          startAdornment: (
                            <InputAdornment position="start">
                              <Lock color="disabled" />
                            </InputAdornment>
                          ),
                        }}
                      />
                    </Grid>

                    <Grid item xs={9}>
                      <Button
                        type="submit"
                        id="btnLogin"
                        fullWidth
                        variant="contained"
                        color="secondary"
                        disabled={disableBtn}
                        className={classes.submit}
                        m={0}
                      >
                        Sign In
                      </Button>
                    </Grid>
                  </Grid>
                </Form>
              );
            }}
          </Formik>
          <Snackbar open={open} autoHideDuration={3000} onClose={handleClose}>
            <MuiAlert onClose={handleClose} severity="error" sx={{ width: "100%" }}>
              {errorMessage}
            </MuiAlert>
          </Snackbar>
        </div>
      </Container>
    </MuiThemeProvider>
  );
};

export default SignIn;
