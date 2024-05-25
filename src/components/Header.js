// import React from 'react';
import "./header.css";
import { useNavigate } from "react-router-dom";

// const Header = () => {
//     const navigate = useNavigate();
//     const handleBack = () => {
//         navigate("/");
//     }
//     return (
//         <div className='layout-header'>
//             <nav className="navbar navbar-dropdown navbar-fixed-top navbar-expand-lg">
//                 <div className="navbar-brand" onClick={handleBack}>
//                     <span className="header-text" >ABC 카페 키오스크</span>
//                 </div>
//             </nav>
//         </div>
//     );
//     // return (
//     //     <nav className="navbar fixed-top bg-body-tertiary">
//     //     <div className="container-fluid">
//     //       <a className="navbar-brand">ABC 카페 키오스크</a>
//     //       <button type="button" className="btn btn-success call-staff" data-bs-toggle="modal" data-bs-target="#callStaff">
//     //         직원 호출
//     //       </button>
//     //     </div>
//     //   </nav>
//     //   <div className="modal fade" id="callStaff" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
//     //     <div className="modal-dialog">
//     //       <div className="modal-content">
//     //         <div className="modal-header">
//     //           <h1 className="modal-title fs-5" id="exampleModalLabel">직원 호출</h1>
//     //           <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
//     //         </div>
//     //         <div className="modal-body">
//     //           키오스크 사용이 어려우신가요? 직원이 도와드리겠습니다!
//     //         </div>
//     //         <div className="modal-footer">
//     //           <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">닫기</button>
//     //           <button type="button" className="btn btn-primary" data-bs-dismiss="modal" data-bs-target="#calledStaff">직원 호출</button>
//     //         </div>
//     //       </div>
//     //     </div>
//     //   </div>
//     // );
// };

import React, { useState } from "react";
import { Navbar, Container, Button, Modal } from "react-bootstrap";
import { Helmet } from "react-helmet";

const Header = () => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <div className="base">
      <Helmet>
        <link
          href="https://fonts.googleapis.com/css2?family=Nanum+Gothic&display=swap"
          rel="stylesheet"
        />
        <link
          href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css"
          rel="stylesheet"
          integrity="sha384-QWTKZyjpPEjISv5WaRU9OFeRpok6YctnYmDr5pNlyT2bRjXh0JMhjY6hW+ALEwIH"
          crossOrigin="anonymous"
        />
        <script
          src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"
          integrity="sha384-YvpcrYf0tY3lHB60NNkmXc5s9fDVZLESaAA55NDzOxhy9GkcIdslK1eN7N6jIeHz"
          crossOrigin="anonymous"
        ></script>
        <style>
          {`
            .nanum-gothic-regular {
              font-family: "Nanum Gothic", sans-serif;
              font-weight: 400;
              font-style: normal;
            }
          `}
        </style>
      </Helmet>
      <Navbar bg="body-tertiary">
        <Container fluid>
          <Navbar.Brand>ABC 카페 키오스크</Navbar.Brand>
          <Button variant="success" onClick={handleShow}>
            직원 호출
          </Button>
        </Container>
      </Navbar>

      <Modal
        show={show}
        onHide={handleClose}
        aria-labelledby="exampleModalLabel"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="exampleModalLabel">직원 호출</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          키오스크 사용이 어려우신가요? 직원이 도와드리겠습니다!
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            닫기
          </Button>
          <Button variant="primary" onClick={handleClose}>
            직원 호출
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

// export default FirstScreen;

export default Header;
