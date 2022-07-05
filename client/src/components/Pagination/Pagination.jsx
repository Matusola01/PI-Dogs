
import React, { useState, useEffect } from 'react';
import { getAllDogs , setPage } from '../../redux/actions/index';
import { useDispatch, useSelector } from 'react-redux';
import DogCard from '../DogCard/DogCard';
import './Pagination.css'
import imageDog from '../../img/perros.png'
import imageLoader from '../../img/loader.gif'

export default function Pagination() {

    const dispatch = useDispatch();
    // const [, /*refreshState*/ setRefreshState] = useState(false);
    const dogs = useSelector(state => state.dogs)
    let alldogs = [...dogs]
    const numPages = Math.ceil(dogs.length/8)
    const p = useSelector(state => state.page)
    const copyAlldogs = useSelector(state => state.AllDogs)
    const [currentPage,setCurrentPage] = useState(p)

    //Se ejecuta cada vez que se renderiza el componente ---> componentDidMount y componentDidUpdate
    useEffect(()=>{
        dispatch(getAllDogs())
    },[dispatch])

    let pages = getPages(alldogs,8);

    const firstPage = (e) => {
        setCurrentPage(
            1
        )
        dispatch(setPage(currentPage))
    }

    const lastPage = (e) => {
        setCurrentPage(
            numPages
        )
        dispatch(setPage(currentPage))
    }

    const nextPage = (e) => {
        setCurrentPage(
            currentPage + 1
        )
        dispatch(setPage(currentPage+1))
    }

    const previousPage = (e) => {
        setCurrentPage(
            currentPage - 1
        )
        dispatch(setPage(currentPage+1))
    }

    if(pages.length > 0 && pages[currentPage-1] !== undefined){
        return (
            <div>
                <div className='pageView'>
                    {
                        pages[currentPage-1].map( b => <DogCard key={b.id} img={b.img} name={b.name} weight={b.weight} temperament={b.temperament} temperaments={b.temperaments} id={b.id} />)
                    }
                </div>
                <div className='btnContainer'>
                    {
                        currentPage === 1 && pages.length === 1
                            ? <div> <input className='buttons' type='button' name='firtsPage' onClick={firstPage} value='1' /> </div>
                                                
                            :currentPage === 1
                                ? <div> <input className='buttons' type='button' name='firtsPage' onClick={firstPage} value='1' /> <input className='buttons' type='button' name='next' onClick={nextPage} value='next' /> <input className='buttons' type='button' name='lastPage' onClick={lastPage} value={numPages} /> </div>
                                                    
                                : currentPage === 2
                                    ? <div> <input className='buttons' type='button' name='firtsPage' onClick={firstPage} value='1' /> <input className='buttons' type='button' value={currentPage}/> <input className='buttons' type='button' name='next' onClick={nextPage} value='next' /> <input className='buttons' type='button' name='lastPage' onClick={lastPage} value={numPages} /> </div>
                                                         
                                    : currentPage > 2 && currentPage < numPages-1
                                        ? <div> <input className='buttons' type='button' name='firtsPage' onClick={firstPage} value='1' /> <input className='buttons' type='button' name='back' onClick={previousPage} value='back' /> <input className='buttons' type='button' value={currentPage}/> <input className='buttons' type='button' name='next' onClick={nextPage} value='next' /> <input className='buttons' type='button' name='lastPage' onClick={lastPage} value={numPages} /> </div>
                                                            
                                        : currentPage === numPages
                                            ? <div> <input className='buttons' type='button' name='firtsPage' onClick={firstPage} value='1' /> <input className='buttons' type='button' name='back' onClick={previousPage} value='back' /> <input className='buttons' type='button' name='lastPage' onClick={lastPage} value={numPages} /> </div>
                                                                
                                            : currentPage === numPages-1
                                                ? <div> <input className='buttons' type='button' name='firtsPage' onClick={firstPage} value='1' /> <input className='buttons' type='button' name='back' onClick={previousPage} value='back' /> <input className='buttons' type='button' value={currentPage}/> <input className='buttons' type='button' name='lastPage' onClick={lastPage} value={numPages} /> </div>
                        
                                                : null
                    }
                </div>
            </div>
        );

    }else if(pages.length>0 && currentPage-1 > pages.length){
        return (
            <div>
                <div className='pageView'>
                    {
                        pages[0].map( b => <DogCard key={b.id} img={b.img} name={b.name} weight={b.weight} temperament={b.temperament} temperaments={b.temperaments} id={b.id} />)
                    }
                </div>
                <div className='btnContainer'>
                    {
                        currentPage === 1 && pages.length === 1
                            ? <div> <input className='buttons' type='button' name='firtsPage' onClick={firstPage} value='1' /> </div>
                                                
                            :currentPage === 1
                                ? <div> <input className='buttons' type='button' name='firtsPage' onClick={firstPage} value='1' /> <input className='buttons' type='button' name='next' onClick={nextPage} value='next' /> <input className='buttons' type='button' name='lastPage' onClick={lastPage} value={numPages} /> </div>
                                                    
                                : currentPage === 2
                                    ? <div> <input className='buttons' type='button' name='firtsPage' onClick={firstPage} value='1' /> <input className='buttons' type='button' value={currentPage}/> <input className='buttons' type='button' name='next' onClick={nextPage} value='next' /> <input className='buttons' type='button' name='lastPage' onClick={lastPage} value={numPages} /> </div>
                                                         
                                    : currentPage > 2 && currentPage < numPages-1
                                        ? <div> <input className='buttons' type='button' name='firtsPage' onClick={firstPage} value='1' /> <input className='buttons' type='button' name='back' onClick={previousPage} value='back' /> <input className='buttons' type='button' value={currentPage}/> <input className='buttons' type='button' name='next' onClick={nextPage} value='next' /> <input className='buttons' type='button' name='lastPage' onClick={lastPage} value={numPages} /> </div>
                                                            
                                        : currentPage === numPages
                                            ? <div> <input className='buttons' type='button' name='firtsPage' onClick={firstPage} value='1' /> <input className='buttons' type='button' name='back' onClick={previousPage} value='back' /> <input className='buttons' type='button' name='lastPage' onClick={lastPage} value={numPages} /> </div>
                                                                
                                            : currentPage === numPages-1
                                                ? <div> <input className='buttons' type='button' name='firtsPage' onClick={firstPage} value='1' /> <input className='buttons' type='button' name='back' onClick={previousPage} value='back' /> <input className='buttons' type='button' value={currentPage}/> <input className='buttons' type='button' name='lastPage' onClick={lastPage} value={numPages} /> </div>
                        
                                                : null
                    }
                </div>
            </div>
        );
    }else if(copyAlldogs.length === 0){
        return(
            <div className='containerNF'>
                    <div className='notFound'>Loading...</div>
                    <div className='img'><img className='imgDog' alt="loading" src={imageLoader} /></div>
            </div>
        )
    }else if(copyAlldogs.length>0 && pages.length === 0){
        return(
            <div>
                <div className='containerNF'>
                    <div className='notFound'>No dogs found...</div>
                    <div className='img'><img className='imgDog' alt='imgDog' src={imageDog}></img></div>
                </div>
            </div>
        )
    }
}

function getPages(totaldogs,pageLimit){
    let pages = []
    let arr = []
    while (totaldogs.length > 0) {

        let breed = totaldogs.shift();

        if(totaldogs.length !== 0){

            if(arr.length <= pageLimit-1){
                arr = [...arr,breed];
            }
            else{
                pages = [...pages,arr];
                arr = [];
                arr = [...arr,breed];
            }
        }
        else{
            if(arr.length <= pageLimit-1){
                arr = [...arr,breed];
            }
            else{
                pages = [...pages,arr];
                arr = [];
                arr = [...arr,breed];
            }
            pages = [...pages,arr];
        }
    }
    return pages;
}