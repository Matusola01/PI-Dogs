import { React, useEffect} from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllTemperaments, filterByTemp} from "../../redux/actions/index";

export default function FilterTemps() {
    
    const dispatch = useDispatch();
    
    useEffect( ()=> {
        dispatch(getAllTemperaments())
    },[dispatch]);
    
    const temperaments = useSelector((state) => state.temperaments)
    
    
    
    const handlefilterByTemps=(e)=>{
        dispatch(filterByTemp(e.target.value))
    }
    
   
    
    return (
      <div >
           <div>
              <select className='options'onChange={e=> handlefilterByTemps(e)}>
                  <option value="All">
                      All Temperaments
                  </option>
                  {temperaments && temperaments.map(e => (
                      <option key={e.id} value={e.name}> {e.name} </option>
                  ))}
                 
              </select>
          </div> 
      </div>
        );
      
}










 