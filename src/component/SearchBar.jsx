import { useState } from "react"
import { Form, Navbar, Nav, Container, Button } from "react-bootstrap"
import { Link } from "react-router-dom"


const SearchBar = ({ searching }) => {
  const [search, setSearch] = useState('')

  return <>
    <div style={{ width: 'fill' }}>
      <Navbar bg="black" expand="lg"  >
        <Container fluid>
          <h1 style={{ padding: '5px', fontStyle: 'italic', color: 'white' }}><u>E-commerce</u></h1>
          <Navbar.Toggle aria-controls="navbarScroll" />
          <Navbar.Collapse id="navbarScroll">
            <Nav
              className="me-auto my-2 my-lg-0"
              style={{ maxHeight: '100px', fontWeight: 'bolder', fontSize: '30px', marginLeft: '30px' }}
            >
              <Nav.Link><Link to='#' className="btn btn-lg" style={{ color: 'beige' }}>Home</Link></Nav.Link>
              <Nav.Link><Link to='/login' className="btn btn-lg" style={{ color: 'beige' }}>Login</Link></Nav.Link>
              <Nav.Link><Link to='/showCart' className="btn btn-lg" style={{ color: 'beige' }}>Cart</Link></Nav.Link>
            </Nav>
            <Form className="d-flex" onSubmit={(e) => {
              e.preventDefault()
              searching(search.toLowerCase())
            }}>
              <Form.Control
                type="text"
                placeholder="Search"
                className="me-2"
                style={{ width: '500px' }}
                onChange={e => setSearch(e.target.value)}
              />
              <Button className="btn btn-lg btn-primary" type="submit">Search</Button>
            </Form>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <hr
        style={{
          background: "#5F5959",
          height: "12px",
          border: "none",
          marginTop: '-3px'
        }}
      />
    </div>
  </>
}

export default SearchBar