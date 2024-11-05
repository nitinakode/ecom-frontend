import React from "react";// Assuming this is the file path for your existing component
import { Box } from "@mui/material";
import ActionAreaCard from "./Card";
import Product from "./Components/Product";
import image from './image.png';
import Cart from "./Components/Cart";
import productArray from './Products.json'

interface PrductListProps {
  cart: Cart; // Assuming Cart is a type you've defined elsewhere
  setCart: React.Dispatch<React.SetStateAction<Cart>>;
}



const ProductList:React.FC<PrductListProps> = ({ cart, setCart }) =>{
  return (
    <Box display="flex"
    flexDirection="column"
    justifyContent="space-between"
    sx={{ overflowX: "auto", padding: 2 }}>
    <Box
      display="flex"
      flexDirection="row"
   
      sx={{ overflowX: "auto", padding: 2 }}
    >
      {productArray.map((product, index) => (
        <Box key={index} sx={{ flexShrink: 0, width: 345, marginRight: 2 }}>
          <ActionAreaCard
          key={product.productName}
          productName={product.productName}
          price={product.price}
          productDescription={product.productDescription}
          imageUrl={product.imageUrl}
          cart={cart} // Pass cart and setCart props here
          setCart={setCart}
        />
        </Box>
      ))}
    </Box>
  <Box height={1}/>
    <Box
      display="flex"
      flexDirection="row"
 
      
      sx={{
        overflowX: "auto",
        padding: 2,
        cursor: "none", // Hide the cursor while scrolling
        "-webkit-overflow-scrolling": "touch", // Smooth scrolling on iOS
        scrollbarWidth: "none", // Firefox
        "&::-webkit-scrollbar": {
          display: "none", // Chrome, Safari, and Edge
        }}}
    >
      {productArray.map((product, index) => (
        <Box key={index} sx={{ flexShrink: 0, width: 345, marginRight: 2 }}>
          <ActionAreaCard
          key={product.productName}
          productName={product.productName}
          price={product.price}
          productDescription={product.productDescription}
          imageUrl={product.imageUrl}
          cart={cart} // Pass cart and setCart props here
          setCart={setCart}
        />
        </Box>
      ))}
    </Box>
    </Box>
  );
}
export default ProductList;