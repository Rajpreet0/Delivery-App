import React from 'react'
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from  'react-redux';

function Search() {
 
    const navigate = useNavigate();
    let   dispatch = useDispatch();
    const {search} = useSelector((state) => ({ ...state }));
    const {text}   = search;

    const handleChange = (e) => {
        dispatch({
            type: "SEARCH_QUERY",
            payload: { text: e.target.value },
        });
    };

    const handleSearch = (e) => {
        e.preventDefault();
        navigate(`/shop?${text}`);
    }



    return (
    
     <>
       <div className='auth_right'>
           <form onSubmit={handleSearch}>
           <div className='search_input'>
              <input 
              type="search" 
              placeholder='Search' 
              value={text} 
              onChange={handleChange}></input>
             </div>
           </form> 
       </div>
      </>
    )
}

export default Search