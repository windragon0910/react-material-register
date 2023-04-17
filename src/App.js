import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import SignIn from "./pages/login";
import Home from "./pages/dashboard";
import { Provider } from "react-redux";
import { store } from "./redux/store";

const App = () => {
  return (
    <Provider store={store}>
      <div className="App">
        <Router>
          <Routes>
            <Route exact path="/" element={<SignIn />} />
            <Route path="/home" element={<Home />} />
          </Routes>
        </Router>
      </div>
    </Provider>
  );
};

export default App;
