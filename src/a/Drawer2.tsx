import * as React from 'react';
import Avatar from '@mui/joy/Avatar';
import Box from '@mui/joy/Box';
import Button from '@mui/joy/Button';
import Drawer from '@mui/joy/Drawer';
import DialogTitle from '@mui/joy/DialogTitle';
import DialogContent from '@mui/joy/DialogContent';
import List from '@mui/joy/List';
import image from './image.png';
import ListItem from '@mui/joy/ListItem';
import ListItemButton from '@mui/joy/ListItemButton';
import Typography from '@mui/joy/Typography';
import ModalClose from '@mui/joy/ModalClose';
import CartCard from './CartCard';
import Cart from './Components/Cart';
import Product from './Components/Product';
import { useEffect } from 'react';

interface DrawerScrollableProps {
    onClose: () => void;
    cart: Cart;
    setCart: React.Dispatch<React.SetStateAction<Cart>>;
  }
 

 

export default function DrawerScrollable({onClose,cart, setCart}: DrawerScrollableProps) {
  const updateOrderedCost = (cartProducts: Product[]) => {
    // Update each product's ordered cost based on the price and ordered quantity
    cartProducts.forEach(product => {
      product.orderedCost = product.price * product.ordered;
    });
  };
  
  const updateTotalCost = (cartProducts: Product[]): number => {
    // First, update the ordered cost for all products
    updateOrderedCost(cartProducts);
  
    // Now, sum up the ordered cost of all products to calculate total cost
    const total = cartProducts.reduce((sum, product) => sum + product.orderedCost, 0);
    
    return parseFloat(total.toFixed(2)); // Ensure the total is rounded to 2 decimal places
  };
  


  const handleClose = () => {
    setOpen(false);
    onClose();
  };
  const [open, setOpen] = React.useState(true);

  useEffect(() => {
    const storedCart = localStorage.getItem('cart');
    if (storedCart) {
      setCart(JSON.parse(storedCart)); // Parse and set the stored cart
    }
  }, []);
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart)); // Save the updated cart
  }, [cart.products]);
  // Update total cost based on cart items
  

  // Increment the ordered quantity for a product
  const handleIncrement = (productId: number) => {
    const updatedProducts = cart.products.map((product) =>
      product.id === productId ? { ...product, ordered: product.ordered + 1 } : product
    );
    setCart({
      products: updatedProducts,
      totalCost: updateTotalCost(updatedProducts),
    });
  };

  // Decrement the ordered quantity for a product
  const handleDecrement = (productId: number) => {
    const updatedProducts = cart.products.map((product) =>
      product.id === productId && product.ordered > 1
        ? { ...product, ordered: product.ordered - 1 }
        : product
    );
    setCart({
      products: updatedProducts,
      totalCost: updateTotalCost(updatedProducts),
    });
  };

  // Remove product from cart
  const handleRemoveProduct = (productId: number) => {
    const updatedProducts = cart.products.filter((product) => product.id !== productId);
    setCart({
      products: updatedProducts,
      totalCost: updateTotalCost(updatedProducts),
    });
  };

  // Use the onClose prop to close the drawer when needed
 
  const handleButtonClick=()=>
  {
    console.log(cart)
  }

  return (
    <React.Fragment>
      <Drawer open={open}  onClose={handleClose}>
      <ModalClose onClick={handleClose} />
        <DialogTitle>Cart</DialogTitle>
        <DialogContent>
          <List>
          <CartCard
        cart={cart}
        onIncrement={handleIncrement}
        onDecrement={handleDecrement}
        onRemoveProduct={handleRemoveProduct}
      />
         
          </List>
        </DialogContent>
        <Box
          sx={{
            display: 'flex',
            gap: 1,
            p: 1.5,
            pb: 2,
            borderTop: '1px solid',
            borderColor: 'divider',
          }}
        >
        
          <Button sx={{width: '100%'}} onClick={handleButtonClick}>
            <div>
            <Typography level="title-md">{updateTotalCost(cart.products)}</Typography>
            <Typography  level="body-sm">Proceed to pay</Typography>
            </div>
          </Button>
        </Box>
      </Drawer>
    </React.Fragment>
  );
}
