import React from "react";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Rating from "./Rating";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import "./styles.css";
import { CartState } from "../context/context";
const SingleProduct = ({ product }) => {
  const {
    state: { cart },
    dispatch,
  } = CartState();
  return (
    <div className="product">
      <Row xs={1} md={3} className="g-1">
        <Col>
          <Card style={{ width: "18rem" }}>
            <Card.Img variant="top" src={product.image} />
            <Card.Body>
              <Card.Title>{product.name}</Card.Title>
              <Card.Subtitle style={{ paddingBottom: 5 }}>
                <span>₹ {product.price.split(".")[0]}</span>
                {product.fastDelivery ? (
                  <div>Fast Delivery</div>
                ) : (
                  <div>4 days delivery</div>
                )}
                <Rating rating={product.ratings} />
              </Card.Subtitle>
            </Card.Body> 
            {
                cart.some(p=>p.id === product.id) ? 
                ( <Button
                    onClick={()=>{
                        dispatch({
                            type : "REMOVE_FROM_CART",
                            payload : product,
                        });
                    }}
                variant="danger" size="lg">
                Remove from Cart
              </Button>)
              :
              (
                <Button
                onClick={()=>{
                    dispatch({
                        type : "ADD_TO_CART",
                        payload : product,
                    });
                }}
                disabled={!product.inStock} variant="success" size="lg">
                  {!product.inStock ? "Out of Stock" : "Add to Cart"}
                </Button>)
            }
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default SingleProduct;
