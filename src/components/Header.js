import React from "react";

export default function Header(props){
    return(
        <header><span className="header-name">{props.children}'s Challenge</span></header>
    )
}