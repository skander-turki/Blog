import React , { useState } from "react";
import {  Outlet } from "react-router-dom";

function index() {
    return (
        <>
        <Outlet />  
        </>    
            
            
       
    );
}
export default index ;