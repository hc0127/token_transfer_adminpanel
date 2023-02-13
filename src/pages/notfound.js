import React from "react";
import "../App.css";
import {
  MDBRow
} from "mdb-react-ui-kit";

export default function NotFound() {

  return (
    <MDBRow>
      <h1>404 ERROR</h1>
      <p>please check url.<br />can't access this url</p>
    </MDBRow>
  );
}
