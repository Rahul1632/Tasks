import React from "react";
import { Container, Row } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { Outlet } from "react-router-dom";
import SideMenu from "../Pages/SideMenu";
class Layout extends React.Component {
  render() {
    return (
      <Container fluid>
        <Row className="gridStyle">
          <SideMenu />
          <div className="layout-content">
            <Outlet />
          </div>
        </Row>
      </Container>
    );
  }
}

export default Layout;
