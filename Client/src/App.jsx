import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./Pages/Login.jsx";
import Register from "./Pages/Register.jsx";
import Home from "./Pages/Home.jsx";
import Detailed from "./Pages/Detailed.jsx";
import SearchPage from "./Pages/SearchPage.jsx";
import FavouriteList from "./Pages/favouriteList.jsx";
import WatchList from "./Pages/watchList.jsx";
import Reviews from "./Pages/Reviews.jsx";
import ProfilePage from "./Pages/ProfilePage.jsx";
import CollectionPage from "./Pages/CollectionPage.jsx";

const App = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/home" element={<Home />} />
          <Route path="/detailed/:type/:id" element={<Detailed />} />
          <Route path="/favourite-list" element={<FavouriteList />} />
          <Route path="/watch-list" element={<WatchList />} />
          <Route path="/reviews" element={<Reviews />} />
          <Route path="/collection/:collectionId" element={<CollectionPage />} />
          <Route path="/profile-page" element={<ProfilePage />} />
          <Route path="/search/:query" element={<SearchPage />} />
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;
