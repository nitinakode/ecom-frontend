import React, { useEffect, useState } from "react";
import {
  Card,
  CardActionArea,
  CardMedia,
  CardContent,
  Typography,
  Box,
  Button,
  TextField,
} from "@mui/material";
import Product from "./Components/Product";
import Cart from "./Components/Cart";
import DrawerScrollable from "./Drawer2";

interface ActionAreaCardProps {
  productName: string;
  price: number;
  productDescription: string;
  imageUrl:string,
  cart: Cart;
  setCart: React.Dispatch<React.SetStateAction<Cart>>
}

export default function ActionAreaCard({
  productName,
  price,
  productDescription,
  imageUrl,
  cart,
  setCart
  
}: ActionAreaCardProps) {
  // State to manage visibility of Add button and quantity input
  const [showCart, setShowCart] = useState(false);
  const [quantity, setQuantity] = useState(1); // Start with quantity 1

  // Handle Add button click
  const handleshowcart = () => {
    setDrawer(true);
    setShowCart(true); // Show quantity controls when "Add" is clicked
  };

  // Increment and decrement functions for quantity
  // const handleIncrement = () => {
  //   setQuantity((prev) => Math.min(prev + 1, 3)); // Increment, max value 3
  // };

  // const handleDecrement = () => {
  //   if (quantity > 1) {
  //     setQuantity((prev) => prev - 1); // Decrement only if quantity > 1
  //   } else {
  //     setQuantity(1); // When quantity hits 1 and decrement is clicked, set to 0
  //     setShowQuantityInput(false); // Hide quantity and Cart button
  //   }
  // };

  // Handle the "Cart" button click
  const[drawer,setDrawer] =useState<boolean>(false);
  useEffect(() => {
    // Check if product is in localStorage and update state accordingly
    const storedCart = localStorage.getItem('cart');
    if (storedCart) {
      const parsedCart = JSON.parse(storedCart);
      const isProductInCart = parsedCart.products.some(
        (product: Product) => product.productName === productName
      );
      setShowCart(isProductInCart);
    }
  }, [drawer]);
  const handleAddToCart = () => {
    const newProduct: Product = {
      id: cart.products.length + 1,
      productName: productName,
      productDescription: productDescription,
      price: price,
      ordered: 1,
      orderedCost: price, // orderedCost is price * ordered (1)
      imageUrl: imageUrl,
      productCategory: ""
    };
   

    setCart(prevCart => ({
      ...prevCart,
      products: [...prevCart.products, newProduct]
    }));
    setDrawer(true);
    
    
     // alert(`Added ${quantity} ${productName}(s) to the cart`);

  };

  return (
<>
   {!drawer? <Card sx={{ maxWidth: 345 }}>
      <CardActionArea>
        {/* Product Image */}
        <CardMedia
          component="img"
          height="140"
          image={imageUrl}
          alt={productName}
        />
        <CardContent>
          {/* Product Name */}
          <Typography gutterBottom variant="h5" component="div">
            {productName}
          </Typography>
          {/* Product Category and Price */}
          <Typography variant="body2" color="text.secondary">
            Category: {productDescription}
          </Typography>
          <Typography variant="h6" sx={{ marginTop: 1 }}>
            Price: ${price}
          </Typography>

          {/* Show "Add" button or quantity input based on state */}
          {!showCart ? (
            <Box mt={2}>
              <Button variant="contained" onClick={handleAddToCart}>
                Add
              </Button>
            </Box>
          ) : (
            <Box mt={2} display="flex" flexDirection={"column"} alignItems="center">
              {/* Decrement Button */}
              {/* <Button
                variant="outlined"
                onClick={handleDecrement}
                sx={{ marginRight: 1 }}
                size="small" // Small size for the button
              >
                -
              </Button> */}

              {/* Quantity Text */}
              {/* <Typography variant="body2" sx={{ marginRight: 1 }}>
                Quantity
              </Typography> */}

              {/* Quantity TextField */}
              {/* <TextField
                label="Quantity"
                type="number"
                value={quantity}
                onChange={(e) => setQuantity(Math.max(1, Number(e.target.value)))}
                inputProps={{ min: 1, max: 3 }}
                sx={{ width: 60, textAlign: "center", marginRight: 1 }}
              /> */}

              {/* Increment Button */}
              {/* <Button
                variant="outlined"
                onClick={handleIncrement}
                sx={{ marginRight: 2 }}
                size="small" // Small size for the button
              >
                +
              </Button> */}

              {/* Cart Button */}
              <Button
                variant="contained"
                color="success"
                onClick={handleshowcart}
              >
                Go to Cart
              </Button>
            </Box>
          )}
        </CardContent>
      </CardActionArea>
    </Card>
    :(
    <DrawerScrollable onClose={()=>setDrawer(false)} cart={cart} setCart={setCart} ></DrawerScrollable>)}
    </>
  );
}
