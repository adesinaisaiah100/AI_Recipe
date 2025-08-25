import React from "react";
import mechef from "./images/mechef.png";

export default function Header(){
    return(
        <div className="header absolute top-0 z-20 flex flex-row items-center justify-cente h-50 p-5 gap-3">
            <img src={mechef} alt="chef-claude" className="header_img h-20 max-sm:h-16 max-sm:w-16"/>
            <h1 className="header_h1 text-4xl max-sm:text-xl  text-neutral-200 ">ℭ𝔥𝔢𝔣 ℭ𝔩𝔞𝔲𝔡𝔢</h1>
        </div>
    )
}