import React from 'react'
import ModalImage from 'react-modal-image';
import DefaultImage from '../../images/default_product_image.png';
import {AiFillDelete} from 'react-icons/ai';
import { useDispatch } from 'react-redux';

function ProductCardInCheckOut({p}) {

    const dispatch = useDispatch();
 
  const handleRemove = () => {
    let cart = [];

    if(typeof window !== "undefined") {
        if (localStorage.getItem("cart")) {
            cart = JSON.parse(localStorage.getItem("cart"));
        }

        cart.map((product, i) => {
            if(product._id === p._id) {
                cart.splice(i, 1);
            }
        });

        localStorage.setItem("cart", JSON.stringify(cart));
        dispatch({
            type: "ADD TO CART",
            payload: cart,
        });
    }
  };

  return (
    <tbody>
       <tr>
           <td>
               <div className='images_product_order'>
                   {p.images.length  ? (
                   <ModalImage small={p.images[0].url} large={p.images[0].url}/>
                   ) : ( 
                    <ModalImage small={DefaultImage} large={DefaultImage}/>
                   )}
               </div>
           </td>
           <td>{p.title}</td>
           <td>{p.price},00€</td>
           <td>
               <select
               name="size"
               >
                 {p.size ? <option>{p.size}</option> : <option>Select</option>}

               </select></td>
           <td>{p.shipping}</td>
           <td style={{textAlign: 'center'}}>
               <AiFillDelete 
               onClick={handleRemove}
               className='category_banner_delete_icon'/></td>
       </tr>
    </tbody>
  )
}

export default ProductCardInCheckOut