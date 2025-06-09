import { Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage/HomePage";
import AuthPageCallback from "./pages/AuthPage/AuthPageCallback";
import { AuthenticateWithRedirectCallback } from "@clerk/clerk-react";
import MainLayout from "./layout/MainLayout";
import AlbumPage from "./pages/album/AlbumPage";
import  { Toaster } from 'react-hot-toast';
// import {useUser} from "@clerk/clerk-react"
// import  { useEffect } from "react";
// import { useAuthStore } from "@/store/useAuthStore.ts";

import AdminPage from "./pages/Admin/AdminPage";

const App = () => {
  // const {isSignedIn} =  useUser();
  // const {checkAdminStatus} = useAuthStore();
  // useEffect(()=>{
  //   if (isSignedIn) {
  //     checkAdminStatus();
  //   }
  
  // },[isSignedIn,checkAdminStatus]);
  return ( 
    <div>
      <Toaster position="center"/>
      <Routes>
        <Route
          path="sso-callback"
          element={
            <AuthenticateWithRedirectCallback
              signUpForceRedirectUrl={"/auth-callback"}
            />
          }
        />
        <Route path="/auth-callback" element={<AuthPageCallback />} />
        <Route path="/admin" element={<AdminPage />} />
        <Route element={<MainLayout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/album/:id" element={<AlbumPage/>} />
        </Route>
      </Routes>
    </div>
  );
};

export default App;
