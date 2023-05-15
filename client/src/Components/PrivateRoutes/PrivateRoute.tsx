import React from 'react';
import {Navigate, Outlet} from "react-router-dom";

export const PrivateRoutes = ({auth}:{auth: boolean}) => {
	return auth ? <Outlet/> : <Navigate to="/login" replace/>
};
