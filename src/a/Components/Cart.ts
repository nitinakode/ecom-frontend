import Product from "./Product";

export default interface Cart
{
   products:Product[],
   totalCost: number
}