import * as React from 'react';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import SkipPreviousIcon from '@mui/icons-material/SkipPrevious';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import SkipNextIcon from '@mui/icons-material/SkipNext';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import image from './image.png';
import { useState } from 'react';
import Product from './Components/Product';
import Cart from './Components/Cart';
import { Button } from '@mui/material';
interface CartCardProps {
  cart: {
    products: Product[];
    totalCost: number;
  };
  onIncrement: (productId: number) => void;
  onDecrement: (productId: number) => void;
  onRemoveProduct: (productId: number) => void;
}

const CartCard: React.FC<CartCardProps> = ({ cart, onIncrement, onDecrement, onRemoveProduct }) => {
  return (
    <>
          {cart.products.map((product, index) => (
      <Card sx={{ display: 'flex', height: 120, width: '95%', marginLeft: '2%', marginBottom:1 }}> {/* Decreased height */}
  
          <>
            <Box sx={{ display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
              <CardContent sx={{ flex: '1 0 auto', paddingBottom: 1 }}> {/* Adjusted padding */}

                <Typography
                  component="div"
                  variant="h6"
                  sx={{
                    fontSize: '0.8rem',
                    overflow: 'hidden',
                    display: '-webkit-box',
                    WebkitBoxOrient: 'vertical',
                    WebkitLineClamp: 2, // Limits text to 3 lines
                    textOverflow: 'ellipsis', // Adds ellipsis if overflow occurs
                  }}
                >
                  {product.productName}
                </Typography>

                <Typography
                  variant="subtitle2" // Changed to subtitle2 for smaller font
                  component="div"
                  sx={{ color: 'text.secondary', fontSize: '0.8rem' }} // Adjusted font size
                >
                  {product.productDescription}
                </Typography>
                <Box sx={{ display: 'flex', alignItems: 'center', marginTop: 1 }}>
                  <Typography variant="h5" sx={{ marginRight: 1 }}>
                    {product.price}
                  </Typography>
                  <IconButton aria-label="decrease quantity" size="small" onClick={() => onDecrement(product.id)}>
                    <RemoveIcon fontSize="small" />
                  </IconButton>
                  <Typography sx={{ marginX: 1 }}>{product.ordered}</Typography> {/* Display quantity */}
                  <IconButton aria-label="increase quantity" size="small" onClick={() => onIncrement(product.id)}>
                    <AddIcon fontSize="small" />
                  </IconButton>
                </Box>
              </CardContent>
            </Box>
            <CardMedia
              component="img"
              sx={{ width: 100 }} // Decreased width
              image={product.imageUrl}
              alt="cover"
            />
          </>
       
        {/* Modal */}
      </Card>

      
))} )
    </>
  );
}
export default CartCard;
