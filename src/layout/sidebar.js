//import useState hook to create menu collapse state
import React, { Component } from "react";

//import react pro sidebar components
import {
  Sidebar,
  Menu,
  SubMenu,
  MenuItem,
} from "react-pro-sidebar";

export default function Side(){
  return(
      <Sidebar theme='dark' style={{display:'flex',height:'100%'}}>
        <Menu>
          <SubMenu label="Charts">
            <MenuItem> Pie charts </MenuItem>
            <MenuItem> Line charts </MenuItem>
          </SubMenu>
          <MenuItem> Documentation </MenuItem>
          <MenuItem> Calendar </MenuItem>
          
        </Menu>
      </Sidebar>
  );
}