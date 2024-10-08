import React from 'react'
import alertify from 'alertifyjs';
import {Button, ListGroup, ListGroupItem} from 'reactstrap';

const Cart = ({cartItems, onRemoveFromCart,onClearCart}) => {
  const totalPrice = cartItems.reduce((total, item) => total + item.price,0);

  // Ödev Çözümü

  const stackedCartItems = []
  cartItems.forEach(item => {
    const duplicateItem = stackedCartItems.find(obj => obj.id === item.id)
    if (duplicateItem) {
      duplicateItem.quantity += 1;
    } else {
      item.quantity = 1;
      stackedCartItems.push(item);
    }
  })
    


  const handleRemoveFromCart = (item) =>{
    onRemoveFromCart(item);
    alertify.error(`${item.name} sepetten çıkarıldı!`);
  }

  const handleClearCart = () => {
    onClearCart();
    alertify.error('Sepet boşaltıldı!');
  }

  return(
    <div>
    <h3>Sepet</h3>
      <ListGroup>
        {stackedCartItems.map((item) =>(
          <ListGroupItem key={item.id}>
            {item.name} - {item.quantity} Adet - ${item.price}
            <Button color='warning'
            onClick={()=> handleRemoveFromCart(item)}
            style={{float: 'right'}}
            className='btn btn-sm'>Kaldır
            </Button>
          </ListGroupItem>
        ))}
      </ListGroup>
      <h4 className='mt-5'>Toplam: ${totalPrice}</h4>
      <Button color='danger' onClick={()=>handleClearCart()}>Sepeti Boşalt</Button>
    </div>

  );
}
export default Cart;