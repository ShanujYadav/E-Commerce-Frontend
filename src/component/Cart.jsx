import { Card, Button, ButtonGroup } from "react-bootstrap"
import Style from "./product.module.css"
import { useEffect, useState } from "react"
import { Row } from "react-bootstrap"
import { Col } from "react-bootstrap"
import { Link } from "react-router-dom"
import HomeFooter from "./HomeFooter"


const Cart = () => {
  const [cart, setCart] = useState([])
  const [recart, setrecart] = useState(false)
  const [items, setItems] = useState()

  let numberofItem = 0
  let qty = 0

  useEffect(() => {
    fetch(`${process.env.REACT_APP_BASEURL}/showCart`, {
      method: 'get',
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + localStorage.getItem("jwt")
      },
    })
      .then(res => res.json())
      .then(data => {
        setCart(data)
        setrecart(false)
      })
  }, [recart])


  let price = 0
  cart.forEach(item => {
    price = price + (item.Pquantity * item.Pprice)
    numberofItem += 1
    qty = qty + item.Pquantity
  })

  const removerFromCart = (Pid) => {
    fetch(`${process.env.REACT_APP_BASEURL}/cancelFromCart`, {
      method: 'Post',
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + localStorage.getItem("jwt")
      },
      body: JSON.stringify({
        Pid: Pid
      })
    })
      .then(res => res.json())
      .then(data => {
        console.log(data)
        if (data.code === 200) {
          setrecart(true)
          alert(data.msg)
          // if (recart) {
          //   setrecart(false)
          // }
          // else {
          //   setrecart(true)
          // }
        }
        else {
          alert(data.msg)
        }
      })
  }


  const increaseQty = async (Piid) => {
    await fetch(`${process.env.REACT_APP_BASEURL}/addToCart/${Piid}`, {
      method: 'Post',
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + localStorage.getItem("jwt")
      },
    })
      .then(res => res.json())
      .then(data => {
        if (data.code === 200) {
          console.log(data)
          setrecart(true)
        }
        else alert('Something Went wrong')
      })
  }

  const decreaseQty = (id) => {
      fetch(`${process.env.REACT_APP_BASEURL}/decrease/${id}`, {
        method: 'Post',
        headers: {
          "Content-Type": "application/json",
          "Authorization": "Bearer " + localStorage.getItem("jwt")
        },
      })
        .then(res => res.json())
        .then(data => {
          console.log(data)
          if (data.code === 200) {
            setrecart(true)
          }
          else alert('Something went Wrong')
        })
    }


  const handleOpenRazorPay = (data) => {
    const options = {
      key: 'rzp_test_jcq1W2rqZQOleh',
      amount: data.amount,
      currency: data.currency,
      name: 'Your order',
      image: 'https://th.bing.com/th/id/OIP.2GafFXx44_yb8TysMzb-FgHaEi?pid=ImgDet&rs=1',
      order_id: data.id,
      handler: function (response) {
        //  console.log(response)
        // console.log(response.razorpay_payment_id,response.razorpay_order_id,response.razorpay_signature)
        fetch(`${process.env.REACT_APP_BASEURL}/payment-callback`, {
          method: 'Post',
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            razorpay_payment_id: response.razorpay_payment_id,
            razorpay_order_id: response.razorpay_order_id,
            razorpay_signature: response.razorpay_signature

          })
        })
          .then(res => res.json())
          .then(data => alert(data.message))

      }
    }

    const razorpay = new window.Razorpay(options)
    razorpay.open()

  }

  const handlePayment = (amount) => {
    console.log(amount)
    fetch(`${process.env.REACT_APP_BASEURL}/create-order`, {
      method: 'Post',
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        amount: amount
      })
    })
      .then(res => res.json())
      .then(data => {
        if (data) {
          console.log(data)
          handleOpenRazorPay(data)
        }
        else {
          alert("something went wrong ")
        }
      })
  }

  return <>
    <div className="container" style={{ display: 'inline' }}>
      <ButtonGroup>
        <i class="fas fa-shopping-cart"></i>
        <Link to='/'>  <img src="https://cdn-icons-png.flaticon.com/512/93/93634.png" alt="" height={40} style={{ marginTop: '15px', marginLeft: '30px' }}></img></Link><h2 style={{ marginTop: '10px', marginLeft: '30px' }}>Continue Shopping</h2>
      </ButtonGroup> <hr></hr>
      <Card className={Style.cartCard} style={{ marginBottom: '10px' }}>
        <Row>
          <Col sm='8'>
            <Card.Body>
              {cart.map(elem => {
                return <>
                  <Card style={{ width: '900px', backgroundColor: 'beige', marginLeft: '40px' }} >
                    <Card.Body>
                      <Row>
                        <Col sm='4'>
                          <img src={elem.Ppic} style={{ width: '65px' }} alt=""></img>
                          <h3>{elem.Pname}</h3>
                        </Col>

                        <Col sm='4'>
                          <ButtonGroup >
                            <Button variant="danger" onClick={() => decreaseQty(elem._id)} disabled={elem.Pquantity==1}>-</Button>
                            <Button>{elem.Pquantity}</Button>
                            <Button variant="success" onClick={() => increaseQty(elem.Pid)}>+</Button>
                          </ButtonGroup>
                        </Col>
                        <Col sm='4' >
                          <div style={{ display: 'inline' }}>
                            <h3>₹ {elem.Pprice}/-</h3>
                            <Button onClick={() => removerFromCart(elem._id)}>Remove</Button>
                          </div>
                        </Col>
                      </Row>
                    </Card.Body>
                  </Card>
                </>
              })}
            </Card.Body>
          </Col>
          <Col sm='4'>

            <Card className="bg-warning mt-20" style={{ marginTop: '20px', marginRight: '30px', height: '450px' }}>
              <Card.Body>
                <center>
                  <h2 style={{ fontWeight: 'bolder' }}><u> Order Summary</u></h2>
                </center>
                <div className="container mt-30" style={{ marginTop: '40px' }}>
                  <hr></hr>
                  <Row>
                    <Col sm='6'>
                      <h3 style={{ fontWeight: 'bold' }}>Total Item   -</h3>
                    </Col>
                    <Col sm='6'>
                      <h3 style={{ float: 'right', fontWeight: 'bold' }}>{numberofItem}</h3>
                    </Col>
                  </Row>
                  <hr></hr>
                  <Row>
                    <Col sm='6'>
                      <h3 style={{ fontWeight: 'bold', marginTop: '20px' }}>Total quantity -</h3>
                    </Col>
                    <Col sm='6'>
                      <h3 style={{ float: 'right', fontWeight: 'bold', marginTop: '20px' }}>{qty}</h3>
                    </Col>
                  </Row>
                  <hr></hr>
                  <Row>
                    <Col sm='6'>
                      <h3 style={{ fontWeight: 'bold', marginTop: '20px' }}>Total amount  -</h3>
                    </Col>
                    <Col sm='6'>
                      <h3 style={{ float: 'right', fontWeight: 'bold', marginTop: '20px' }}>{price}</h3>
                    </Col>
                  </Row>
                  <Button style={{ marginTop: '30px', float: 'right' }} variant="info" onClick={() => handlePayment(price)}>CheckOut</Button>
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>

      </Card>
      <HomeFooter />
    </div>
  </>
}
export default Cart;