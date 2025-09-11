import React from "react";
import UserHeader from "./Header";

export const UserLayout = ({children}: {children: React.JSX.Element}) => (
    <>
    <UserHeader />
    {
        children
    }
    </>
)