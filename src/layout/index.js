import React, { Suspense } from "react";
import { Route, Routes, Navigate } from "react-router-dom";

import routes from "../routes";
import Navbar from './navbar';
// import Side from "./sidebar";
// import { ProSidebarProvider } from 'react-pro-sidebar';

import {
  MDBRow,MDBCol, MDBContainer
} from "mdb-react-ui-kit";

export default function Layout(){
  return (
    <>
      <Navbar />
      <MDBRow className="mt-5 pt-3">
        {/* <MDBCol style={{flex:'0',position:'relative'}}>
          <Side />
        </MDBCol> */}
        <MDBCol>
          <MDBContainer>
            {/* <ProSidebarProvider> */}
              <Suspense>
                  <Routes>
                    {routes.map((route, idx) => {
                      return (
                        route.element && (
                          <Route
                            key={idx}
                            path={route.path}
                            exact={route.exact}
                            name={route.name}
                            element={<route.element />}
                          />
                        )
                      );
                    })}
                    <Route path="/" element={<Navigate to="history" replace />} />
                  </Routes>
              </Suspense>
            {/* </ProSidebarProvider> */}
          </MDBContainer>
        </MDBCol>
      </MDBRow>
    </>
  );
};
