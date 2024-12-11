import React from 'react'
import axios from 'axios'
import { useEffect, useState } from 'react';
import Pagenation from './Pagenation';


function Movies() {

    const [movies, setMovies] = useState([]);
    const [pageNum, setPageNum] = useState(1);
    const [watchList, setWathcList] = useState([]);
    const [hovered, setHovered] = useState([]);

    //PAGENATION
    const onNextClick = () => {
        setPageNum(pageNum + 1);
    }

    const onPrevClick = () => {
        if (pageNum > 1) {
            setPageNum(pageNum - 1);
        }
    }

    //WATCHLIST

    const addtoWatchList = (movies) => {
        const newWatchList = [...watchList, movies];
        setWathcList(newWatchList);
        localStorage.setItem('imdb', JSON.stringify(newWatchList))
    }



    const removefromWatchList = (movies) => {
        const filteredWatchList = watchList.filter((existingMovies) => {
            return existingMovies.id != movies.id;
        });

        setWathcList(filteredWatchList);
        localStorage.setItem('imdb', JSON.stringify(filteredWatchList))
    }

    // console.log(watchList);


    //HOVERING ON CARDS

    const showFavButton = (id) => {
        setHovered(id);
    }

    const hideFavButton = (id) => {
        setHovered('');
    }

    useEffect(() => {

        (function () {

            let moviesFromLS =localStorage.getItem('imdb');
            moviesFromLS = JSON.parse(moviesFromLS) || [];
            setWathcList(moviesFromLS);

            axios.get(`https://api.themoviedb.org/3/trending/movie/day?api_key=d7162ed65c9abab2daa14406dea8e2a1&page=${pageNum}`)
                .then((response) => {
                    // console.log(response.data);
                    setMovies(response.data.results);
                })
        })()

    }, [pageNum])

    // console.log(movies);

    return (

        <div>
            <div className='flex text-center justify-center text-2xl font-bold mb-8 text-center m-4'>
                Trending Movies
            </div>

            <div className='flex flex-wrap'>

                {movies.map((movies) => {
                    return <div

                        onMouseOver={() => showFavButton(movies.id)}
                        onMouseLeave={() => hideFavButton()}
                        key={movies.id}
                        className='w-[200px] h-[40vh] bg-center bg-cover bg-no -repeat rounded-xl hover:scale-110 duration-200 m-4 md:w[200px] md:h[40vh] relative flex items-end' style={
                            {
                                backgroundImage: `url(https://image.tmdb.org/t/p/original/t/p/w500/${movies.poster_path})`
                            }
                        }>

                        <div className='text-white font-bold text-center w-full bg-gray-900 bg-opacity-50'>
                            {movies.title}
                        </div>



                        <div className='p-1. absolute right-2 top-2 text-3xl cursor-pointer'

                            style={
                                { display: hovered == movies.id ? 'block' : 'none'}
                            }>

                            {
                                watchList.includes(movies) == false ?
                                    (
                                        <div onClick={() => addtoWatchList(movies)}>
                                            ⭐
                                        </div>
                                    )
                                    :
                                    (
                                        <div onClick={() => removefromWatchList(movies)}>
                                            ❌
                                        </div>
                                    )
                            }

                        </div>


                    </div>
                })}


            </div>

            <Pagenation

                pageNum={pageNum}
                onNextClick={onNextClick}
                onPrevClick={onPrevClick}

            />

        </div>

    )
}

export default Movies