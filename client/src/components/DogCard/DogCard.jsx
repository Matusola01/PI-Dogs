import React from "react";
import { Link } from 'react-router-dom';
import './DogCard.css'

export default function DogCard ({img, name, weight, temperament, id ,temperaments}) {
    return (
      <div className="Card">
        <Link to={`/home/DogDetail/${id}`} >
        <div>
            <div >
              <img className="imageDog" src={img} alt={`${name}`} />
            </div>
          <h2 className="card-title" key={id}>{name}</h2>
          <div className="card-body">
            <div>
              <h4>Weight: </h4>
              <p>{weight} Kg</p>
            </div>
            <div className="temps">
              {
                temperaments 
                  ? <div><h4>Temperaments: </h4><p>{temperaments.map(e=>{return `${e.name}, `})}</p></div>
                  : <div><h4>Temperaments: </h4><p>{temperament}</p></div>
              }
            </div>
          </div>
        </div>
        </Link>
      </div>
    );
};