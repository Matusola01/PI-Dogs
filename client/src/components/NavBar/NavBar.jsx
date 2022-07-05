import React , {Component} from "react";
import { Link } from 'react-router-dom';
import SearchBar from "../SearchBar/SearchBar";
import { getDogByName } from "../../redux/actions/index";


import './NavBar.css'

export default class Nav extends Component {
    render() {
        return (
            <div>
                <div className="navStyle">
                    <Link to={'/'}>
                        <button className='toLanding'> Landing Page </button>
                    </Link>
                    <Link to={'/home'}>
                        <button className="toLanding"> Home </button>
                    </Link>
                    <Link to={'/home/create'}>
                        <button className='toLanding'> Create Dog </button>
                    </Link>
                    <div className="search"><SearchBar onSearch={getDogByName}/></div>
                </div>
            </div>
        )
    }
}