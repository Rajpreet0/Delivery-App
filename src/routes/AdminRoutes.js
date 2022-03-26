import { useEffect } from "react";
import { useState } from "react";
import { useSelector } from "react-redux"
import { Route, Routes } from "react-router";
import { currentAdmin } from "../functions/auth";
import LoadingToRedirect from './LoadingToRedirect';
import AdminDashboard from '../pages/admin/dashboard/AdminDashboard';
import CategoryCreate from "../pages/admin/category/CategoryCreate";
import CategoryUpdate from "../pages/admin/category/categoryUpdate/CategoryUpdate";
import ProductCreate from "../pages/admin/product/ProductCreate";
import AllProducts from "../pages/admin/product/allproducts/AllProducts";
import ProductUpdate from "../pages/admin/product/productupdate/ProductUpdate";


const AdminRoutes = ({children, ...rest}) => {
   
    const {user} = useSelector((state) => ({...state}));
    const [ok , setOk] = useState(false);

    useEffect(() => {
        if (user && user.token) {
            currentAdmin(user.token)
            .then(res => {
                console.log("CURRENT ADMIN RES", res);
                setOk(true);
            }).catch (err => {
                console.log("ADMIN ROUTE ERR", err);
                setOk(false);
            })
        }
    })

    return ok ? (
        <Routes>
             <Route path="dashboard" element={<AdminDashboard/>}></Route>
             <Route path="category" element={<CategoryCreate/>}></Route>
             <Route path="category/:slug" element={<CategoryUpdate/>}></Route>
             <Route path="product" element={<ProductCreate/>}></Route>
             <Route path="products" element={<AllProducts/>}></Route>
             <Route path="product/:slug" element={<ProductUpdate/>}></Route>
        </Routes>
    ) : (
        <LoadingToRedirect/>
    )
}

export default AdminRoutes