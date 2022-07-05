import React from "react";
import './Home.css'
import DogCards from "../Dogs/Dogs";

export default function mainRoute(){
    return (
        <div>
            <div className="home"> <DogCards /> </div>
        </div>
    )
}


