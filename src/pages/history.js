import React, { useState, useEffect } from "react";
import "../App.css";
import {
  MDBRow
} from "mdb-react-ui-kit";
import DataTable from "react-data-table-component";
import axios from '../config/server.config';

export default function History() {
  const [histories, setHistory] = useState();

  useEffect(() => {
    axios
      .get('/transaction/list')
      .then(function (res) {
        setHistory(res.data.data);
      })
  }, []);

  let headers = [
    {
      name: "transaction",
      center: true,
      wrap: true,
      selector: (row) => row.transaction_id,
    },
    {
      name: "sender",
      center: true,
      wrap: true,
      selector: (row) => row.sender,
    },

    {
      name: "amount",
      center: true,
      wrap: true,
      selector: (row) => row.amount,
    }
  ];

  return (
    <MDBRow>
      <h1>TRANSFER HISTORY</h1>
      <DataTable
        responsive
        columns={headers}
        data={histories}
        fixedHeader
        fixedHeaderScrollHeight={"65vh"}
        defaultPageSize={100}
        pagination
      />
    </MDBRow>
  );
}
