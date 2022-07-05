import axios from 'axios'
const{
    GET_ALL_DOGS,
  GET_DOG_DETAIL,
  GET_ALL_TEMPERAMENTS,
  FIND_DOG_NAME,
  CREATE_DOG,
  CLEAN_DOG_DETAIL,
  ORDER_AZ,
  ORDER_ZA,
  ORDER_BY_WEIGHT,
  DOGS_DB,
  DOGS_API,
  FILTER_BY_TEMP,
  SET_PAGE  
} = require ('../action-types/index')

export function getAllDogs() {
    return async function(dispatch){
        const results = await axios.get('http://localhost:3001/Dogs');
        dispatch({
            type: GET_ALL_DOGS,
            payload: results.data
        })
    }
};

export function getDogDetail(id){
    return async function(dispatch){
        try {
            const results = await axios.get(`http://localhost:3001/Dogs/${id}`);
            dispatch({
                type: GET_DOG_DETAIL,
                payload: results.data
            })
        } catch (error) {
           console.log(error) 
        }
    }
};

export function getAllTemperaments(){
    return async function(dispatch){
        const results = await axios.get('http://localhost:3001/Temperaments');
        dispatch({
            type: GET_ALL_TEMPERAMENTS,
            payload: results.data,
        })
    }
};

export function getDogByName(value){
    return async function(dispatch){
        try {
            const results = await axios.get(`http://localhost:3001/Dogs?name=${value}`);
            dispatch({
                type: FIND_DOG_NAME,
                payload: results.data
            })
        } catch (error) {
            console.log(error)
        }
    }
};

export function createDog(data){
    return async function(dispatch){
        try {
            const results = await axios.post('http://localhost:3001/Dog', data);
            dispatch({
                type: CREATE_DOG,
                payload: results.data
            })
        } catch (error) {
            console.log(error)
        }
    }
};

export function cleanDogDetail(){
    return {
        type: CLEAN_DOG_DETAIL
    }
};

export function orderAZ(){
    return {
        type: ORDER_AZ
    }
};

export function orderZA(){
    return{
        type: ORDER_ZA
    }
};

export function orderByWeight(payload){
    return{
        type: ORDER_BY_WEIGHT,
        payload
    }
};


export function getDogsApi(){
    return async function(dispatch){
        const results = await axios.get('http://localhost:3001/Dogs/DogsApi');
        dispatch({
            type: DOGS_API,
            payload: results.data
        })
    }
};

export function getDogsDB(){
    return async function(dispatch){
        const results = await axios.get('http://localhost:3001/Dogs/DogsDB');
        dispatch({
            type: DOGS_DB,
            payload: results.data
        })
    }
};

export function filterByTemp(temperaments){
    return {
        type: FILTER_BY_TEMP,
        payload: temperaments,
    }
};

export function setPage(page){
    return {
        type: SET_PAGE,
        payload: page
    }
};

