import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import ValidatorSignUp from "./pages/ValidatorSignUp";
import Review from "./pages/Review";
import Category from "./pages/Category";
import NotFound from "./pages/404";
import Favourites from "./pages/favourites";
import Profile from "./pages/profile";
import AddActivity from "./pages/add-activity";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<Home/>}/>
        <Route path="validatorSignUp" element={<ValidatorSignUp/>}/>
        <Route path="review" element={<Review/>}/>
        <Route path="category/:categoryid" element={<Category/>}/>
        <Route path="404" element={<NotFound/>}/>
        <Route path="review/:reviewid" element={<Review/>}/>
        <Route path="favourites" element={<Favourites/>}/>
        <Route path="profile" element={<Profile/>}/>
        <Route path="add-activity" element={<AddActivity/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
