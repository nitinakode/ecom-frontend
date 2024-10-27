import React, { useState } from "react";
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

interface ActionAreaCardProps {
  product_name: string;
  price: number;
  product_category: string;
}

export default function ActionAreaCard({
  product_name,
  price,
  product_category,
}: ActionAreaCardProps) {
  // State to manage visibility of Add button and quantity input
  const [showQuantityInput, setShowQuantityInput] = useState(false);
  const [quantity, setQuantity] = useState(1); // Start with quantity 1

  // Handle Add button click
  const handleAddButtonClick = () => {
    setShowQuantityInput(true); // Show quantity controls when "Add" is clicked
  };

  // Increment and decrement functions for quantity
  const handleIncrement = () => {
    setQuantity((prev) => Math.min(prev + 1, 3)); // Increment, max value 3
  };

  const handleDecrement = () => {
    if (quantity > 1) {
      setQuantity((prev) => prev - 1); // Decrement only if quantity > 1
    } else {
      setQuantity(1); // When quantity hits 1 and decrement is clicked, set to 0
      setShowQuantityInput(false); // Hide quantity and Cart button
    }
  };

  // Handle the "Cart" button click
  const handleAddToCart = () => {
    if (quantity > 0) {
      alert(`Added ${quantity} ${product_name}(s) to the cart`);
    } else {
      alert(`Please select a valid quantity before adding to cart.`);
    }
  };

  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardActionArea>
        {/* Product Image */}
        <CardMedia
          component="img"
          height="140"
          image="/static/images/cards/product.jpg"
          alt={product_name}
        />
        <CardContent>
          {/* Product Name */}
          <Typography gutterBottom variant="h5" component="div">
            {product_name}
          </Typography>
          {/* Product Category and Price */}
          <Typography variant="body2" color="text.secondary">
            Category: {product_category}
          </Typography>
          <Typography variant="h6" sx={{ marginTop: 1 }}>
            Price: ${price}
          </Typography>

          {/* Show "Add" button or quantity input based on state */}
          {!showQuantityInput ? (
            <Box mt={2}>
              <Button variant="contained" onClick={handleAddButtonClick}>
                Add
              </Button>
            </Box>
          ) : (
            <Box mt={2} display="flex" alignItems="center">
              {/* Decrement Button */}
              <Button
                variant="outlined"
                onClick={handleDecrement}
                sx={{ marginRight: 1 }}
                size="small" // Small size for the button
              >
                -
              </Button>

              {/* Quantity Text */}
              {/* <Typography variant="body2" sx={{ marginRight: 1 }}>
                Quantity
              </Typography> */}

              {/* Quantity TextField */}
              <TextField
                label="Quantity"
                type="number"
                value={quantity}
                onChange={(e) => setQuantity(Math.max(1, Number(e.target.value)))}
                inputProps={{ min: 1, max: 3 }}
                sx={{ width: 60, textAlign: "center", marginRight: 1 }}
              />

              {/* Increment Button */}
              <Button
                variant="outlined"
                onClick={handleIncrement}
                sx={{ marginRight: 2 }}
                size="small" // Small size for the button
              >
                +
              </Button>

              {/* Cart Button */}
              <Button
                variant="contained"
                color="primary"
                onClick={handleAddToCart}
              >
                Cart
              </Button>
            </Box>
          )}
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
