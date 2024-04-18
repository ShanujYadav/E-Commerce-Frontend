import { Card, Form, Row, InputGroup, Button } from "react-bootstrap"
import pic from "./cartoon.jpg.png"
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [type, setType] = useState('')

  const navigate = useNavigate()
  const myStyle = {
    backgroundImage: "url('https://img.freepik.com/free-photo/glamour-girl-holding-shopping-bags-pucker-lips-looking-coy-standing-against-pink-background_1258-123331.jpg?w=1380&t=st=1681489851~exp=1681490451~hmac=3e29f37e49f2b373fd3e88a37ce3afae7068d45e0ff9f5b00415116467c0b039')",
    height: '100vh',
    fontSize: '50px',
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    marginLeft: '-50px',
  }


  const loging = (e) => {
    e.preventDefault()
    fetch(`${process.env.REACT_APP_BASEURL}/login`, {
      method: 'Post',
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        email,
        password,
        Type: type
      })
    })
      .then(res => res.json())
      .then(data => {
        localStorage.setItem("jwt", data.token)
        console.log(data);
        if (data.Type === 'customer') {
          navigate('/')
        }
        else if (data.Type === 'seller'){
          navigate('/addToProduct')
        }
        else {
          alert(data.msg || 'Invalied Credntials !')
        }
      })
  }
  

  return <>
    <div style={myStyle}>
      <div>
        <img src={pic} style={{ height: '150px', width: '200px', marginLeft: '1400px', marginTop: '120px' }}></img>
        <Card style={{ width: '600px', float: 'right', marginRight: '150px', marginTop: '-35px', boxShadow: '15px 15px #513b47', backgroundImage: "url('https://img.freepik.com/free-vector/wavy-shape-business-background-paper-cut-style_1017-33399.jpg?w=1380&t=st=1681285537~exp=1681286137~hmac=6cdafcd8659eb6e36614208bdf43696b3a98b9de02ed784812ddbbf046615046')", backgroundRepeat: 'no-repeat', backgroundSize: 'cover' }}>
          <Card.Body style={{ padding: '30px' }}>
            <h1>Have an Account ?</h1>
            <Form onSubmit={loging}>
              <InputGroup className="mb-3">
                <InputGroup.Text id="basic-addon1">email</InputGroup.Text>
                <Form.Control
                  aria-label="Username"
                  aria-describedby="basic-addon1"
                  onChange={e => setEmail(e.target.value)}
                />
              </InputGroup>
              <InputGroup className="mb-3">
                <InputGroup.Text id="basic-addon1">password</InputGroup.Text>
                <Form.Control
                  aria-label="Username"
                  aria-describedby="basic-addon1"
                  type="password"
                  onChange={e => setPassword(e.target.value)}
                />
              </InputGroup>
              <InputGroup className="mb-3">
                <InputGroup.Text id="basic-addon1">Type</InputGroup.Text>
                <Form.Select aria-label="Default select example"
                  onChange={(e) => setType(e.target.value)} value={type}>
                  <option>Select Account Type</option>
                  <option value="seller">Seller</option>
                  <option value="costumer">Costumer</option>
                </Form.Select>
              </InputGroup>
              <Button type="submit" className="btn-primary btn-lg" style={{ marginLeft: '400px' }}>log in</Button> <h3>Don't have any account.? <Link to="/signup">click here</Link></h3>
            </Form>
          </Card.Body>
        </Card>
      </div>
    </div>
  </>
}
export default Login