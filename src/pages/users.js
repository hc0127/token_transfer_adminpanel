import React, { useState, useEffect } from "react";
import "../App.css";
import {
  MDBRow, MDBBtn, MDBModal, MDBModalDialog, MDBModalHeader, MDBModalTitle, MDBModalBody, MDBModalContent, MDBModalFooter, MDBInput
} from "mdb-react-ui-kit";
import DataTable from "react-data-table-component";
import axios from '../config/server.config';

import toastr from "toastr";
import "toastr/build/toastr.min.css";

toastr.options = {
  hideDuration: 3000,
  timeOut: 3000,
}

export default function Users() {
  const [show, setShow] = useState(false);
  const [modal, setModal] = useState({});
  const [score, setFitScore] = useState(0);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    axios
      .get('/user/list')
      .then(function (res) {
        setUsers(res.data.data);
      })
  }, []);

  const headers = [
    {
      name: "userID",
      center: true,
      wrap: true,
      selector: (row) => row.userID,
    },
    {
      name: "email",
      center: true,
      wrap: true,
      selector: (row) => row.email,
    },
    {
      name: "wallet",
      center: true,
      wrap: true,
      selector: (row) => row.wallet,
    },
    {
      name: "token amount",
      center: true,
      wrap: true,
      selector: (row) => row.token_amount,
    },
    {
      name: "score amount",
      center: true,
      wrap: true,
      selector: (row) => row.score_amount,
    },
    {
      name: "exchange score",
      center: true,
      cell: (row) => <MDBBtn onClick={() => setModalData(row)}>exchange score</MDBBtn>,
    },
  ];

  const setModalData = (data) => {
    setModal(data);
    setShow(true);
    setFitScore(data.token_amount / 2);
  }

  const set_score = (e) => {
    if (modal.token_amount >= parseFloat(e.target.value)) {
      setFitScore(e.target.value);
    }
  }

  const exchange_score = () => {
    axios.post('user/exchange_score', {
      ...modal, exchange_score: score
    }).then(function (res) {
      if (res.data.status == 'success') {
        setUsers(res.data.data);
        toastr.clear();
        setTimeout(() => toastr.success('exchanged successfully'), 300);
      }else{
        toastr.clear();
        setTimeout(() => toastr.success(res.data.msg), 300);
      }
      setShow(false);
    });
  }

  return (
    <MDBRow>
      <h1>USERS</h1>
      <DataTable
        columns={headers}
        data={users}
        fixedHeader
        fixedHeaderScrollHeight={"65vh"}
        defaultPageSize={100}
        pagination
      />
      <MDBModal show={show} setShow={setShow} tabIndex='-1'>
        <MDBModalDialog>
          <MDBModalContent>
            <MDBModalHeader>
              <MDBModalTitle>Edit Score</MDBModalTitle>
              <MDBBtn className='btn-close' size='sm' color='none' onClick={() => setShow(false)}></MDBBtn>
            </MDBModalHeader>
            <MDBModalBody>
              <MDBInput type="number" label='score' value={score} max={modal.token_amount} onChange={(e) => set_score(e)} />
            </MDBModalBody>
            <MDBModalFooter>
              <MDBBtn color='secondary' onClick={() => setShow(false)} >
                Close
              </MDBBtn>
              <MDBBtn onClick={() => exchange_score()}>Exchange</MDBBtn>
            </MDBModalFooter>
          </MDBModalContent>.
        </MDBModalDialog>
      </MDBModal>
    </MDBRow>
  );
}
