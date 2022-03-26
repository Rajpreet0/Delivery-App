import React from 'react';
import { Link } from 'react-router-dom';
import { AiFillDelete, AiFillEdit } from 'react-icons/ai';
import defaultImage from '../../../images/default_product_image.png';
import './AdminProductCard.css';

function AdminProductCard({product, handleRemove}) {
 
    const { title, description, images, slug} = product;

  return (
    <div className='admin_product_card_main'>
      <div className='admin_product_card_gallery'>
          <div className='admin_product_card_content'>
              
              <img 
              src={images && images.length ? images[0].url : defaultImage}></img>
              <h3>{title}</h3>
              <p>{description && description.substring(0, 50)}...</p>
              <div className='admin_product_card_icons'>
              <Link to={`/admin/product/${slug}`}>
                 <AiFillEdit 
                 style={{marginRight: 50}}
                 className='category_banner_edit_icon'/>
              </Link>
                 <AiFillDelete 
                 onClick={() => handleRemove(slug)}
                 className='category_banner_delete_icon'/>
              </div>
              
          </div>
      </div>
    </div>
  )
}

export default AdminProductCard