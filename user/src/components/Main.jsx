import { BrowserRouter, Routes, Route } from "react-router-dom";
//Components
import Home from "./home/Home";
import Login from "./Login";
import Register from "./Register";
import MyOperations from "./MyOperations";
import MyCategories from "./MyCategories";
import NewOperation from "./NewOperation";
import ResetPassword from "./ResetPassword";
import NotFound from "./NotFound";
import EditCategory from "./EditCategory";
import EditOperation from "./EditOperation";
import Header from './header/Header';
import Logout from './Logout';
import Footer from './Footer';

const Main = () => {

  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/users/login" element={<Login />} />
        <Route exact path="/users/register" element={<Register />} />
        <Route exact path="/users/my-operations" element={<MyOperations />} />
        <Route exact path="/users/my-categories" element={<MyCategories />} />
        <Route exact path="/users/my-categories/edit/:id" element={<EditCategory />} />
        <Route exact path="/users/my-operations/new" element={<NewOperation />} />
        <Route exact path="/users/my-operations/edit/:id" element={<EditOperation />} />
        <Route exact path="/users/password/reset" element={<ResetPassword />} />
        <Route exact path="/users/logout" element={<Logout />} />
        <Route exact path="*" element={<NotFound />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  )
}

export default Main