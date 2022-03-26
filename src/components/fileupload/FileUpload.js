import axios from 'axios';
import React from 'react';
import Resizer from 'react-image-file-resizer';
import { useSelector } from 'react-redux';
import {MdCancel} from 'react-icons/md';
import './FileUpload.css';

function FileUpload({values, setValues}) {

    const {user} = useSelector((state) => ({...state}));
 
    const fileUploadAndResize = (e) => {
      let files = e.target.files;
      let allUploadFiles = values.images;
      if (files) {
         for(let i = 0; i < files.length; i++) {
             Resizer.imageFileResizer(
                 files[i],
                 720,
                 720,
                 'JPEG',
                 100,
                 0,
                 (uri) => {
                     axios.post(`${process.env.REACT_APP_API}/uploadimages` , {image: uri}, {
                         headers: {
                             authtoken: user ? user.token: '',
                         }
                     }).then(res => {
                         console.log('IMAGE UPLOAD RES DATA', res)
                         allUploadFiles.push(res.data);
                         setValues({...values, images: allUploadFiles});
                     }).catch((err) => {
                         console.log('CLOUDINARY UPLOAD FAILED', err);
                     })
                 },
             'base64');
         }
      }
    };

    const handleImageRemove = (public_id) => {
        axios.post(
            `${process.env.REACT_APP_API}/removeimage`,
            { public_id },
            {
                headers: {
                    authtoken: user ? user.token: "",
                },
            }
        ).then((res) => {
            const {images} = values
            let filteredImages = images.filter((item) => {
                return item.public_id !== public_id;
            });
            setValues({...values, images: filteredImages});
        }).catch((err) => {
            console.log(err);
            
        })
    };

  return (
    <div className='fileupload_main'>
        <div className='image_banner'>
          {values.images && values.images.map((image) => (
              <>
              <MdCancel 
              onClick={() => handleImageRemove(image.public_id)}
              className='cancel_image'/>
             <img
             src={image.url}
             ></img>
             </>
          ))}
        </div>
        <label>Choose Picture</label>
        <input
        type="file"
        multiple
        hidden
        accept="images/*"
        onChange={fileUploadAndResize}>
        </input>
    </div>
  )
}

export default FileUpload