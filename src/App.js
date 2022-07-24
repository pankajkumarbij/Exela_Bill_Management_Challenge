import 'bootstrap/dist/css/bootstrap.min.css';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import AllBills from './components/allBills';
import AddBill from './components/addBill';
import EditBill from './components/editBill';
import ViewBill from './components/bill';

function App() {
  return (
    <>
      <Router>
        <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
          <Container>
            <Navbar.Brand as={Link} to="/">Exela Bills</Navbar.Brand>
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav">
              <Nav className="ms-auto me-auto">
                <Nav.Link as={Link} to="/" style={{color:'white'}}>Home</Nav.Link>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                <Nav.Link as={Link} to="/" style={{color:'white'}}>All Bills</Nav.Link>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                <Nav.Link as={Link} to="/addbill" style={{color:'white'}}>Add Bill</Nav.Link>
              </Nav>
              <Nav>
                <Nav.Link style={{color:'white'}}>By: Pankaj Kumar</Nav.Link>
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>
        <Routes>
          <Route path="/" exact element={<AllBills />} />
          <Route path="/addbill" exact element={<AddBill />} />
          <Route path="/editbill/:id" exact element={<EditBill />} />
          <Route path="/bill/:id" exact element={<ViewBill />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
