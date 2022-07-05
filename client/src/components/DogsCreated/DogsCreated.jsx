import React , { useState } from 'react';
import { useDispatch , useSelector } from 'react-redux';
import { createDog , getAllTemperaments} from '../../redux/actions/index';
import './DogsCreated.css'
import  validate  from './validations';

export default function CreateDog() {

    const dispatch = useDispatch();
    let t = useSelector(state => state.temperaments)

    const [input,setInput] = useState({
        name: '',
        minWeight: '',
        maxWeight: '',
        minHeight: '',
        maxHeight: '',
        minAge: '',
        maxAge: '',
        img: '',
        temperament: []
    })
    
    const [errors,setErrors] = useState({});

    React.useEffect(()=>{
        dispatch(getAllTemperaments())
    }, [dispatch])

    const handleChange = function (e){
      setInput({
          ...input,
          [e.target.name]: e.target.value
      })

      setErrors(validate({ 
          ...input,
          [e.target.name]: e.target.value
        }))
    }

    const hadleChangeTemp = function(e){
        e.preventDefault();

        if(input.temperament.length === 0) setInput({ ...input, temperament: [...input.temperament, e.target.value]})
        else{
            if(input.temperament.find(element => element === e.target.value)){   
            }
            else{
            setInput({ ...input, temperament: [...input.temperament, e.target.value]})}
        }
    }
    

    function handleDelete(e) {
        e.preventDefault();
        setInput({
            ...input,
            temperament: input.temperament.filter( temp => temp !== e.target.value)
        })
    };

    let id = 0
    function addKey(){
        return id++
    }

    const val = () =>{
        if(errors.age !== '' || errors.height !== '' || errors.img !== '' || errors.name !== '' || errors.weight !== ''){
            return false
        }
        else if(input.name && input.img && input.minHeight  && input.maxHeight && input.minWeight && input.maxWeight &&
            input.minAge && input.maxAge && input.temperament){
            return true
        }else{
            return 'empty'
        }
    }

    function handleSubmit(e) {
        e.preventDefault();
        if(val() === true){
            dispatch(createDog(input));
            alert("Dog was created successfully");
    
            setInput({
                name: '',
                minWeight: '',
                maxWeight: '',
                minHeight: '',
                maxHeight: '',
                minAge: '',
                maxAge: '',
                img: '',
                temperament: [],
            })
        }
        else if (val() === 'empty') {
            (alert('Must complete all the data required.'));
        }
        else (alert('Please complete correctly.'));
    }

    return (
        <div className='containerForm'>
          <form id="breedForm" className='divForm' onSubmit={handleSubmit}>
            <div>
                <label>Name: </label>
                <input autoComplete='off' className='inputStyle' name='name' value={input.name} onChange={handleChange} />
                {errors.name && (<p className='danger'>{errors.name}</p>)}
            </div>
            <div>
                <h4>Weight (Kg)</h4>
                <label> Min: </label>
                <input autoComplete='off' className='inputStyle' type="text" name='minWeight' value={input.minWeight} onChange={handleChange}  />
                <label> Max: </label>
                <input autoComplete='off' className='inputStyle' type="text" name='maxWeight' value={input.maxWeight} onChange={handleChange} />
                {errors.weight && (<p className='danger'>{errors.weight}</p>)}
            </div>
            <div>
                <h4>Height (cm) </h4>
                <label> Min:  </label>
                <input autoComplete='off' className='inputStyle' type="text" name='minHeight' value={input.minHeight} onChange={handleChange} />
                <label> Max:  </label>
                <input autoComplete='off' className='inputStyle' type="text" name='maxHeight' value={input.maxHeight} onChange={handleChange} />
                {errors.height && (<p className='danger'>{errors.height}</p>)}
            </div>
            <div>
                <h4>Life span (years) </h4>
                <label> Min: </label>
                <input autoComplete='off' className='inputStyle' type='text' name='minAge' max='35' value={input.minAge} onChange={handleChange} />
                <label> Max: </label>
                <input autoComplete='off' className='inputStyle' type='text' name='maxAge' max='35' value={input.maxAge} onChange={handleChange} />
                {errors.age && (<p className='danger'>{errors.age}</p>)}
            </div>
            <div>
                <label>img url: </label>
                <input autoComplete='off' className='inputStyle' type='text' name='img' placeholder='Paste your img link...' value={input.img} onChange={handleChange} />
                {errors.img && (<p className='danger'>{errors.img}</p>)}
            </div>
            <div>
                <label>Temperaments  </label>
                    <select onChange={hadleChangeTemp} className='tempSelect'>
                        {t && t.map((t) => (
                            <option key={t.id} value={t.name}>{t.name}</option>
                        ))}
                    </select>
            </div>

            <div className='temp' >
                {input.temperament.map(e => (
                    <div className='btnT' key={addKey()}>
                        <p>{e}</p>
                        <button className='delete' onClick={handleDelete} value={e}>X</button>
                    </div>
                ))}
            </div>
            <div>
                <button className='btnS' type='submit' >Create Dog</button>
            </div>
          </form>
        </div>
    );
}