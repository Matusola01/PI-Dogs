import { sortAsc, sortDesc } from '../../fixes';
const {
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

const initialState = {
    dogs: [],
    temperaments: [],
    dogDetail: {},
    created: [],
    apiDogs: [],
    AllDogs: [],
    page: 1
}

function rootReducer(state = initialState, action){
    switch (action.type) {
        case GET_ALL_DOGS:
            return{
                ...state,
                dogs: action.payload,
                AllDogs: action.payload
            };
        
        case GET_ALL_TEMPERAMENTS:
            return{
                ...state,
                temperaments: action.payload
            };

        case GET_DOG_DETAIL:
            return{
                ...state,
                dogDetail: action.payload
            };

        case FIND_DOG_NAME:
            return{
                ...state,
                dogs: action.payload
            };

        case CREATE_DOG:
            return{
                ...state,
            };

        case CLEAN_DOG_DETAIL:
            return{
                ...state,
                dogDetail: {}
            };

        case ORDER_AZ:
            let orderAZ = state.dogs.sort(function(a, b){
                if(a.name.toLowerCase() > b.name.toLowerCase()) return 1;
                if(a.name.toLowerCase() < b.name.toLowerCase()) return -1;
                return 0;
            });
            return{
                ...state,
                dogs: orderAZ
            };

        case ORDER_ZA:
            let orderZA = state.dogs.sort(function(a, b){
                if(a.name.toLowerCase() > b.name.toLowerCase()) return -1;
                if(a.name.toLowerCase() < b.name.toLowerCase()) return 1;
                return 0;
            });
            return{
                ...state,
                dogs: orderZA
            };


            case ORDER_BY_WEIGHT:
                let orderWeight = [];
                let toOrder = state.dogs;
                if (action.payload === 'weightAsc') orderWeight = [...toOrder]?.sort((a, b) => sortAsc(a, b, 'weight'));
                else if (action.payload === 'weightDesc') orderWeight = [...toOrder]?.sort((a, b) => sortDesc(a, b, 'weight'));
                else orderWeight = [...toOrder]
                return {
                    ...state,
                    dogs: orderWeight
            }

        case DOGS_DB:
            return{
                ...state,
                created: action.payload,
                dogs: action.payload
            };

        case DOGS_API:
            return{
                ...state,
                dogs: action.payload
            };

        case FILTER_BY_TEMP:
            const temperamentFiltered =  state.AllDogs.filter(dog => dog.temperament?.includes(action.payload));
            return {
                ...state,
                dogs: action.payload === 'All' ? state.AllDogs : temperamentFiltered
            };

              

        case SET_PAGE:
            return{
                ...state,
                page: action.payload
            };
            
    
        default:
            return{...state};
    }
}

export default rootReducer;

// 