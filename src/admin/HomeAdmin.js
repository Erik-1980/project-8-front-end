import {  Routes, Route } from 'react-router-dom';
import FooterAdmin from './FooterAdmin';
import HeaderAdmin from './HeaderAdmin';
import GetUser from './user/GetUser'
import GetAllUsers from './user/GetAllUsers'
import AddProducts from './product/AddProduct';
import AddCategory from './product/AddCategory';
import GetAllProducts from './product/GetAllProducts';
import GetOneProduct from './product/GetOneProduct';
import UpdateProduct from './product/UpdateProduct';
import {admin} from '../Setting'

export default function HomeAdmin () {
  if(!admin){
    window.location.href = "/";
  }

  return (
    <div>
     <HeaderAdmin />
        <Routes>
          <Route path = '/getuser' element = {<GetUser />} />
          <Route path = '/getallusers' element = {<GetAllUsers />} />
          <Route path = '/addcategory' element = {<AddCategory />} />
          <Route path = '/getallproducts' element = {<GetAllProducts />} />
          <Route path = '/getoneproduct' element = {<GetOneProduct />} />
          <Route path = '/addproduct' element = {<AddProducts />} />
          <Route path = '/updateproduct' element = {<UpdateProduct />} />
        </Routes>
     <FooterAdmin />
    </div>
  );
}