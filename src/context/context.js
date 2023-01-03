import { createContext, useContext, useReducer } from "react";
import { cartReducer , productReducer} from "./reducer";
var faker = require('faker');
const Cart = createContext();
faker.seed(99);

const Context = ({ children }) => {
  const products = [...Array(20)].map(() => ({
    id: faker.datatype.uuid(),
    name: faker.commerce.productName(),
    price: faker.commerce.price(),
    image: faker.random.image(),
    inStock: faker.random.arrayElement([0, 3, 5, 6, 7]),
    fastDelivery: faker.datatype.boolean(),
    ratings: faker.random.arrayElement([1, 2, 3, 4, 5]),
  }));

  const [state, dispatch] = useReducer(cartReducer, {
    products: products,
    cart: [],
  });
  const [productState , productDispatch] = useReducer(productReducer,{
    byStock : false,
    byFastDelivery : false,
    byRating : 0,
    searchQuery : "",
  });

  return (
    <Cart.Provider value={{ state, dispatch , productState,productDispatch}}>
      {children}
    </Cart.Provider>
  );
};

export const CartState = () => {
  return useContext(Cart);
};

export default Context;
// import React, { createContext, useContext, useEffect, useReducer, useState } from 'react'
// import { cartReducer } from './reducer';       
// const Cart = createContext();
// const Context = ({children}) => {

//     const [products, setproducts] = useState([]);
//     const fetchProducts = async ()=>{
//         const res =  await fetch('https://dummyjson.com/products?limit=20');
//         const data = await res.json();
//         // if (data && data.products){
//         //   data.products.map((prod)=>{
//         //     prod.stock = Math.round(prod.stock / 10);
//         //     prod.rating = Math.round(prod.rating);
//         //   })
//             setproducts(data.products);
//         // }
//     }
//     useEffect(() => {
//         fetchProducts();
//       },[]);

//       const product = Array(...products);
//       console.log(product)

//       const [state, dispatch] = useReducer(cartReducer, {
//         products: product,
//         cart: [],
//       });
//   return (
//     <Cart.Provider value={{state , dispatch}}>
//         {children}
//     </Cart.Provider>
//   );
// };

// export const CartState = ()=>{
//     return useContext(Cart);
// };

// export default Context;
