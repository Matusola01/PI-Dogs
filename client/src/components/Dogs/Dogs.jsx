
import React, { useState } from 'react';
import { useEffect } from 'react';
import './Dogs.css';
import Pagination from '../Pagination/Pagination';
import FilterTemps from '../FilterByTemps/FilterByTemps';
import { useDispatch } from 'react-redux';
import { orderAZ , orderZA , orderByWeight , getDogsDB , getDogsApi , getAllDogs} from '../../redux/actions/index';


export default function DogCards() {

    const dispatch = useDispatch();
    const [,setRefreshState] = useState(false);
    const [orderWeight, setOrderWeight] = useState('')

    useEffect(()=>{
        dispatch(orderByWeight(orderWeight))
    },[orderWeight, dispatch]) 

    const handleSortName = (e)=>{
        if(e.target.value === 'orderAZ'){
            dispatch(orderAZ())
            setRefreshState((prevState) => !prevState);
        }
        else if(e.target.value === 'orderZA'){
            dispatch(orderZA())
            setRefreshState((prevState) => !prevState);
        }
    }

    
    const handleSortWeight = (e)=>{
            setOrderWeight(state => e.target.value)
            setRefreshState((prevState) => !prevState); 
    }


    const handleFilters = (e) =>{
        if(e.target.value === 'AllDogs'){
            dispatch(getAllDogs())
            setRefreshState((prevState) => !prevState);
        }
        else if(e.target.value === 'DogsApi'){
            dispatch(getDogsApi())
            setRefreshState((prevState) => !prevState);
        }
        else if(e.target.value === 'DogsDB'){
            dispatch(getDogsDB())
            setRefreshState((prevState) => !prevState);
        }
    }

    return (
            <div>
                <div >
                <FilterTemps />
                </div>
                <div >
                        <select className='options' onChange={handleSortName}>
                            <option value="" selected="selected" select disabled>Sort by name</option>
                            <option value='orderAZ'>Sort A-Z</option>
                            <option value='orderZA'>Sort Z-A</option>
                        </select>
                        <select className='options'onChange={handleSortWeight}>
                            <option value="" selected="selected" select disabled>Sort by weight</option>
                            <option value='weightAsc'>Ascendant</option>
                            <option value='weightDesc'>Descendant</option>
                        </select>
                        <select className='options' onChange={handleFilters}>
                            <option value="AllDogs" selected="selected">Dogs</option>
                            <option value='DogsApi'>API dogs</option>
                            <option value='DogsDB'>Created</option>
                        </select>
                </div>
                <div>
                    <Pagination />
                </div> 
            </div>
        );
}


