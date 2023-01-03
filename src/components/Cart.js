import React, { useEffect, useState } from "react";
import { CartState } from "../context/context";
import "./styles.css";
import ListGroup from "react-bootstrap/ListGroup";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/esm/Col";
import Row from "react-bootstrap/esm/Row";
import Rating from "./Rating";
import Form from "react-bootstrap/Form";
import Image from "react-bootstrap/Image";
import { AiFillDelete } from "react-icons/ai";
const Cart = () => {
  const {
    state: { cart },
    dispatch,
  } = CartState();
  const [total, settotal] = useState(0);
  useEffect(() => {
    settotal(
      cart.reduce((acc, curr) => acc + Number(curr.price) * curr.qty, 0)
    );
  }, [cart]);

  return (
    <div className="home">
      <div className="productContainer">
        <ListGroup>
          {cart.map((prod) => {
            return (
              <ListGroup.Item>
                <Row>
                  <Col md={2}>
                    <Image src={prod.image} alt={prod.name} fluid rounded />
                  </Col>
                  <Col md={2}>
                    <span>{prod.name}</span>
                  </Col>
                  <Col md={2}>
                    <span>{prod.price}</span>
                  </Col>
                  <Col md={2}>
                    <Rating rating={prod.ratings}></Rating>
                  </Col>
                  <Col md={2}>
                    <Form.Control 
                    as="select" 
                    value={prod.qty}
                    onChange={(e)=>{
                      dispatch({
                        type : "CHANGE_CART_QTY",
                        payload : {
                          id: prod.id,
                          qty : e.target.value,
                        }
                      })
                    }}
                    >
                      {[...Array(prod.inStock).keys()].map((x) => (
                        <option key={x + 1}>{x + 1}</option>
                      ))}
                    </Form.Control>
                  </Col>
                  <Col md={2}>
                    <AiFillDelete
                      fontSize="20px"
                      style={{ cursor: "pointer" }}
                      onClick={() =>
                        dispatch({
                          type: "REMOVE_FROM_CART",
                          payload: prod,
                        })
                      }
                    />
                  </Col>
                </Row>
              </ListGroup.Item>
            );
          })}
        </ListGroup>
      </div>
      <div className="filter">
        <span className="title">Subtotal ({cart.length}) items</span>
        <span style={{ fontWeight: 700, fontSize: 20 }}>Total : {total}</span>
        <Button disabled={cart.length === 0}>Proceed to Checkout</Button>
      </div>
    </div>
  );
};

export default Cart;
