import React, { useState } from "react";
import "../App.css";
import {
  MDBCard,
  MDBCardBody,
  MDBInput,
  MDBBtn,
  MDBTabs,
  MDBTabsItem,
  MDBTabsLink,
  MDBTabsPane,
  MDBTabsContent,
  MDBContainer,
  MDBCol
} from "mdb-react-ui-kit";
import axios, { client } from "../config/server.config";
import { createBrowserHistory } from "history";

import toastr from "toastr";
import "toastr/build/toastr.min.css";

toastr.options = {
  hideDuration: 3000,
  timeOut: 3000,
}

export default function Login() {
  const [loginRegisterActive, handleLoginRegisterClick] = useState('login');
  const [loginData, setLoginData] = useState({ email: '', password: '' });
  const [registerData, setRegisterData] = useState({ username: '', wallet: '', email: '', password: '' });

  const history = createBrowserHistory();

  client.onmessage = (res) => {
    var res = JSON.parse(res.data.toString());
    console.log(res)
    if (res.type == "admin_login") {
      if (res.data.status == 'success') {
        sessionStorage.setItem("data", JSON.stringify(res.data));
        history.push("/");
        history.go("/");
        toastr.clear();
        setTimeout(() => toastr.success('success login'), 300);
      } else {
        toastr.clear();
        setTimeout(() => toastr.error(res.data.msg), 300);
      }
    } else {
      toastr.clear();
      if (res.type == "success") {
        setTimeout(() => toastr.success(res.data), 300);
      } else {
        setTimeout(() => toastr.error(res.data), 300);
      }
      setRegisterData({ username: '', wallet: '', email: '', password: '' });
    }
  };

  const login = () => {
    client.send(JSON.stringify({
      type: "admin_login",
      data: loginData
    }));
  }

  const register = () => {
    let data = registerData.username + "\t" + registerData.password + "\t" + registerData.email + "\t" + registerData.wallet;
    client.send(JSON.stringify({
      type: "OnRegister",
      data: data
    }));
  }

  return (
    <MDBContainer className="mt-5">
      <MDBCol md='6' offsetMd={3}>
        <MDBCard>
          <MDBCardBody>
            <MDBTabs pills justify className='mb-3'>
              <MDBTabsItem>
                <MDBTabsLink
                  onClick={() => handleLoginRegisterClick('login')}
                  active={loginRegisterActive === 'login'}
                >
                  Login
                </MDBTabsLink>
              </MDBTabsItem>
              <MDBTabsItem>
                <MDBTabsLink
                  onClick={() => handleLoginRegisterClick('register')}
                  active={loginRegisterActive === 'register'}
                >
                  Register
                </MDBTabsLink>
              </MDBTabsItem>
            </MDBTabs>

            <MDBTabsContent>
              <MDBTabsPane show={loginRegisterActive === 'login'}>
                <p>Sign in:</p>
                <MDBInput className='mb-4' type='email' value={loginData.email} label='Email address' onChange={(e) => setLoginData({ ...loginData, email: e.target.value })} />
                <MDBInput className='mb-4' type='password' value={loginData.password} label='Password' onChange={(e) => setLoginData({ ...loginData, password: e.target.value })} />

                <MDBBtn className='mb-4' block onClick={() => login()}>
                  Sign in
                </MDBBtn>
              </MDBTabsPane>
              <MDBTabsPane show={loginRegisterActive === 'register'}>
                <p>Register</p>
                <MDBInput className='mb-4' label='username' value={registerData.username} onChange={(e) => setRegisterData({ ...registerData, username: e.target.value })} />
                <MDBInput className='mb-4' label='email address' type='email' value={registerData.email} onChange={(e) => setRegisterData({ ...registerData, email: e.target.value })} />
                <MDBInput className='mb-4' label='wallet address' value={registerData.wallet} onChange={(e) => setRegisterData({ ...registerData, wallet: e.target.value })} />
                <MDBInput className='mb-4' label='password' type='password' value={registerData.password} onChange={(e) => setRegisterData({ ...registerData, password: e.target.value })} />
                <MDBBtn className='mb-4' block onClick={() => register()}>
                  Register
                </MDBBtn>
              </MDBTabsPane>
            </MDBTabsContent>
          </MDBCardBody>
        </MDBCard>
      </MDBCol>
    </MDBContainer>
  );
}
