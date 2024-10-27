import React from "react";// Assuming this is the file path for your existing component
import { Box } from "@mui/material";
import ActionAreaCard from "./Card";

// JSON list of products
const productList = [
  {
    product_name: "Product 1",
    price: 19.99,
    product_category: "Category A"
  },
  {
    product_name: "Product 2",
    price: 29.99,
    product_category: "Category B"
  },
  {
    product_name: "Product 3",
    price: 39.99,
    product_category: "Category C"
  },
  {
    product_name: "Product 1",
    price: 19.99,
    product_category: "Category A"
  },
  {
    product_name: "Product 2",
    price: 29.99,
    product_category: "Category B"
  },
  {
    product_name: "Product 3",
    price: 39.99,
    product_category: "Category C"
  },
  {
    product_name: "Product 1",
    price: 19.99,
    product_category: "Category A"
  },
  {
    product_name: "Product 2",
    price: 29.99,
    product_category: "Category B"
  },
  {
    product_name: "Product 3",
    price: 39.99,
    product_category: "Category C"
  },
  {
    product_name: "Product 1",
    price: 19.99,
    product_category: "Category A"
  },
  {
    product_name: "Product 2",
    price: 29.99,
    product_category: "Category B"
  },
  {
    product_name: "Product 3",
    price: 39.99,
    product_category: "Category C"
  }
];

export default function ProductList() {
  return (
    <Box display="flex"
    flexDirection="column"
    justifyContent="space-between"
    sx={{ overflowX: "auto", padding: 2 }}>
    <Box
      display="flex"
      flexDirection="row"
      justifyContent="space-between"
      sx={{ overflowX: "auto", padding: 2 }}
    >
      {productList.map((product, index) => (
        <Box key={index} sx={{ flexShrink: 0, width: 345, marginRight: 2 }}>
          <ActionAreaCard
            product_name={product.product_name}
            price={product.price}
            product_category={product.product_category}
          />
        </Box>
      ))}
    </Box>
  <Box height={200}/>
    <Box
      display="flex"
      flexDirection="row"
      justifyContent="space-between"
      
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
      {productList.map((product, index) => (
        <Box key={index} sx={{ flexShrink: 0, width: 345, marginRight: 2 }}>
          <ActionAreaCard
            product_name={product.product_name}
            price={product.price}
            product_category={product.product_category}
          />
        </Box>
      ))}
    </Box>
    </Box>
  );
}
