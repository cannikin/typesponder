import React from "react";
import ReactDOM from "react-dom";
import "tachyons/css/tachyons.css";
import App from "./App";
// import * as serviceWorker from './serviceWorker';
import netlifyIdentity from "netlify-identity-widget";

window.netlifyIdentity = netlifyIdentity;
netlifyIdentity.init();

ReactDOM.render(<App />, document.getElementById("root"));
