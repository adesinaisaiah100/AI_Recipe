import React from "react";
import mechef from "./images/mechef.png";

export default function Header(){
    return(
        <div className="header">
            <img src={mechef} alt="chef-claude" className="header_img" />
            <h1 className="header_h1">Chef Claude</h1>
        </div>
    )
}