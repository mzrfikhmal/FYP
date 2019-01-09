import React from "react";
import { Route, Switch } from "react-router-dom";
import Home from "./containers/Home";
import NotFound from "./containers/NotFound";
import UploadFile from "./containers/UploadFile";
import Receive from "./containers/Receive";
export default () =>
  <Switch>
    <Route path="/" exact component={Home} />
    <Route path="/uploadfile" exact component={UploadFile} />
    <Route path="/receive" exact component={Receive} />
    { /* Finally, catch all unmatched routes */ }
	<Route component={NotFound} />
  </Switch>;