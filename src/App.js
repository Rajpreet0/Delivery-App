import './App.css';
import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";
import Home from './pages/home/Home';
import {ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Login from './pages/auth/login/Login';
import Register from './pages/auth/register/Register';
import RegisterComplete from './pages/auth/registerComplete/RegisterComplete';
import ForgotPassword from './pages/auth/forgot_password/ForgotPassword';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { auth } from './firebase';
import { currentUser } from "./functions/auth";
import UserRoute from './routes/UserRoute';
import AdminRoutes from './routes/AdminRoutes';
import ProductPage from './pages/admin/product/productpage/ProductPage';
import Shop from './pages/shop/Shop';
import Cart from './pages/cart/Cart';

function App() {
 
  const dispatch = useDispatch();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      if (user) {
        const idTokenResult = await user.getIdTokenResult()
        console.log("user", user);

        currentUser(idTokenResult.token).then(
          (res) => 
          {
             dispatch({
                type: "LOGGED_IN_USER",
                payload: {
                   name: res.data.name,
                   email: res.data.email,
                   token: idTokenResult.token,
                   role: res.data.role,
                   _id: res.data._id,
                },
             });
          }).catch(err => console.log(err));

      }
    });
    return () => unsubscribe();
  }, []);

  return (
    <>
     <BrowserRouter>
      <ToastContainer/>
       <Routes>
        <Route exact path="/" element={<Home/>}/>
        <Route exact path='/login' element={<Login/>}/>
        <Route exact path='/register' element={<Register/>}></Route>
        <Route exact path='/register/complete' element={<RegisterComplete/>}></Route>
        <Route exact path='/forgot/password' element={<ForgotPassword/>}></Route>
        <Route exact path='/product/:slug' element={<ProductPage/>}></Route>
        <Route exact path='/user/*' element={<UserRoute/>}></Route>
        <Route exact path='/admin/*' element={<AdminRoutes/>}></Route>
        <Route exact path='/shop' element={<Shop/>}></Route>
        <Route exact path='/cart' element={<Cart/>}></Route>
       </Routes>
     </BrowserRouter>
    </>
  );
}

export default App;
