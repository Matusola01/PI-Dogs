import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getDogDetail , cleanDogDetail } from '../../redux/actions/index'
import imageLoader from '../../img/loader.gif'
import ('./DogDetail.css')

export default function DogDetail(props){
    
    const dispatch = useDispatch();
    
    const id = props.match.params.id
    
    let details = useSelector(state => state.dogDetail)
    useEffect(()=>{
        dispatch(getDogDetail(id))
        return () => {
            dispatch(cleanDogDetail())
        }
        //eslint-disable-next-line
    },[dispatch])

    if(Object.keys(details).length !== 0){
        return (
            <div>
            <div className="containerD">
                <div className="imgDog">
                    <img className="dog" alt="img" src={details.img}/>
                </div>
                <div className="data">
                    <h1>{details.name}</h1>
                    <h5>Life span: {details.age}</h5>
                    <h5>Height: {details.height} cm</h5>
                    <h5>Weight: {details.weight} Kg</h5>
                    <h4>Temperaments: {details.temperament}</h4>
                </div>
            </div>
            </div>
        )
        }else{
            return (
            <div className='containerNF'>
                <div className='notFound'>Loading...</div>
                <div className='img'><img className='imgDog' alt="loading" src={imageLoader} /></div>
            </div>
        )
    }
};
    
