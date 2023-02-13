import { NavLink as Link } from "react-router-dom";
import styled from "styled-components";
import React from "react";
import {
  MDBNavbar,
  MDBContainer,
  MDBNavbarBrand,
  MDBNavbarToggler,
  MDBCollapse,
  MDBNavbarNav,
  MDBNavbarItem,
  MDBBtn
} from "mdb-react-ui-kit";
import { createBrowserHistory } from "history";

export const NavLink = styled(Link)`
  color: #ffffff;
  font-family: Roboto, Helvetica Neue, sans-serif;
  font-size: 16px;
  display: flex;
  align-items: center;
  text-decoration: none;
  padding: 5px 12px;
  height: 100%;
  cursor: pointer;
  &.active {
    color: white;
    background-color: #0088ff;
  }
`;

export const NavItem = styled(MDBNavbarItem)`
  padding: 5px;
`;
export const NavBrand = styled(MDBNavbarBrand)`
  color: white;
  font: inherit;
  font-size: 20px;
`;

export default function Navbar(){

  const logout = () =>{
    const history = createBrowserHistory();
    
    sessionStorage.removeItem("data");
    history.push("/");
    history.go("/");
  }

  return(
    <MDBNavbar expand="lg" fixed="top" bgColor="primary">
      <MDBContainer fluid>
        <NavBrand href="/" style={{ marginLeft: "25px" }}>
          <img
            style={{ width: "30px", height: "30px" }}
            src="token.png"
          />
        </NavBrand>
        <MDBNavbarToggler
          type="button"
          data-target="#navbarColor02"
          aria-controls="navbarColor02"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
        </MDBNavbarToggler>
        <MDBCollapse navbar>
          <MDBNavbarNav className="me-auto mb-2 mb-lg-0">
            <NavItem>
              <NavLink aria-current="page" to="users">
                Users
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink aria-current="page" to="history">
                History
              </NavLink>
            </NavItem>
          </MDBNavbarNav>
          <MDBBtn onClick={() => logout()}>logout</MDBBtn>
        </MDBCollapse>
      </MDBContainer>
    </MDBNavbar>
  );
}