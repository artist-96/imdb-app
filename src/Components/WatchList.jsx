import React from 'react'
import { useState, useEffect } from 'react'
function WatchList() {

    const [favourites, setFavourites] = useState([]);
    const [genres, setGenres] = useState([]);
    const [currGenre, setCurrGenre] = useState("All Genres");
    const [rating, setRating] = useState(0);
    const [popularity, setPopularity] = useState(0);
    const [search, setSearch] = useState('');


    let genreids = {
        28: "Action",
        12: "Adventure",
        16: "Animation",
        35: "Comedy",
        80: "Crime",
        99: "Documentary",
        18: "Drama",
        10751: "Family",
        14: "Fantasy",
        36: "History",
        27: "Horror",
        10402: "Music",
        9648: "Mystery",
        10749: "Romance",
        878: "Sci-Fi",
        10770: "TV",
        53: "Thriller",
        10752: "War",
        37: "Western",
    };


    useEffect(() => {

        let moviesFromLocalStorage = localStorage.getItem('imdb');
        moviesFromLocalStorage = JSON.parse(moviesFromLocalStorage);
        setFavourites(moviesFromLocalStorage);

    }, [])

    useEffect(() => {
        let temp = favourites.map((movies) => genreids[movies.genre_ids[0]])
        temp = new Set(temp)
        setGenres(["All Genres", ...temp]);
    })

    //GENRE FILTER
    let filteredArrayofWatchList = [];

    filteredArrayofWatchList = currGenre == "All Genres" ? favourites : favourites.filter((movies) => genreids[movies.genre_ids[0]] == currGenre);

    //SEARCHING
    filteredArrayofWatchList = filteredArrayofWatchList.filter((movies)=>{
        return movies.title.toLowerCase().includes(search.toLowerCase())
    })

    //SORTING
    if (rating == 1) {
        filteredArrayofWatchList = filteredArrayofWatchList.sort(function compareR(objA, objB) {
            return objA.vote_average - objB.vote_average
        })
    }

    if (rating == -1) {
        filteredArrayofWatchList = filteredArrayofWatchList.sort(function compareR(objA, objB) {
            return objB.vote_average - objA.vote_average
        })
    }

    // if (popularity == 1) {
    //     filteredArrayofWatchList = filteredArrayofWatchList.sort(function compareP(objA, objB) {
    //         return objA.popularity - objB.popularity
    //     })
    // }

    // if (popularity == -1) {
    //     filteredArrayofWatchList = filteredArrayofWatchList.sort(function compareP(objA, objB) {
    //         return objB.popularity - objA.popularity
    //     })
    // }


    //DELETE MOVIES FROM WATCHLIST

    const del = (movies) => {
        let newArray = favourites.filter((movie) =>
            movie.id != movies.id
        )

        setFavourites([...newArray])

        localStorage.setItem('imdb', JSON.stringify(newArray))
    }

    return (

        <>

            <div className='mt-6 flex space-x-2 justify-center'>
                {
                    genres.map((genre) => {
                        return <button className={currGenre == genre ?
                            'm-2 text-lg p-1 px-2 bg-blue-500 text-white rounded-xl font-bold'
                            : 'm-2 text-lg p-1 px-2 bg-gray-400 hover:bg-blue-500 text-white rounded-xl font-bold'}
                            onClick={() => {
                                setCurrGenre(genre);
                            }}>

                            {genre}</button>
                    })
                }
            </div>

            <div className='mt-2'>
                <form class="max-w-md mx-auto">
                    <label for="default-search" class="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Search</label>
                    <div class="relative">
                        <div class="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                            <svg class="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
                            </svg>
                        </div>
                        <input type="search" id="default-search" class="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search your movies..." required 
                        onChange={(e)=> setSearch(e.target.value)}/>
                    </div>
                </form>
            </div>

            <div className='flex overflow-hidden rounded-lg border border-gray-200 shadow-md m-5'>
                <table className='w-full border-collapse bg-white text-left text-sm text-gray-800'>
                    <thead className='bg-gray-100'>
                        <tr>
                            <th className='px-6 py-4 font-medium'>Name</th>

                            <th>
                                <div className='flex '>
                                    <img src="https://img.icons8.com/external-those-icons-lineal-those-icons/24/000000/external-up-arrows-those-icons-lineal-those-icons-3.png" alt=""
                                        className="mr-1"
                                        onClick={() => {
                                            setRating(1);
                                        }} />
                                    <div>Ratings</div>

                                    <img src="https://img.icons8.com/external-those-icons-lineal-those-icons/24/000000/external-down-arrows-those-icons-lineal-those-icons-4.png" alt=""
                                        className='ml-1'
                                        onClick={() => {
                                            setRating(-1);
                                        }} />
                                </div>
                            </th>

                            <th>
                                <div className='flex '>
                                    {/* <img src="https://img.icons8.com/external-those-icons-lineal-those-icons/24/000000/external-up-arrows-those-icons-lineal-those-icons-3.png" alt=""
                                        className="mr-1"
                                        onClick={() => {
                                            setPopularity(1);
                                        }} /> */}
                                    <div>Popularity</div>
                                    {/* <img src="https://img.icons8.com/external-those-icons-lineal-those-icons/24/000000/external-down-arrows-those-icons-lineal-those-icons-4.png" alt=""
                                        className='ml-1'
                                        onClick={() => {
                                            setPopularity(-1);
                                        }} /> */}
                                </div>
                            </th>

                            <th>
                                <div className='flex '>
                                    <div>Genre</div>
                                </div>
                            </th>

                            <th>
                                <div className='flex '>
                                    <div>Year</div>
                                </div>
                            </th>
                            <th>

                            </th>
                        </tr>
                    </thead>

                    <tbody className='divide-y divide-gray-100 border-t border-gray-100'>

                        {
                            filteredArrayofWatchList.map((movies) => {
                                return <tr className='hover : bg-gray-50'>
                                    <td className='flex items-center px-6 py-4 font-normal text-gray'>

                                        <img className='h-[12rem] w-[10rem] object-fit'
                                            src={`https://image.tmdb.org/t/p/original/t/p/original/${movies.poster_path}`}
                                            alt="" />
                                        <div className='font-medium text-gray-700 text-sm mx-2'>{movies.title}</div>
                                    </td>

                                    <td className='pl-6 py-4'>{movies.vote_average}</td>

                                    <td className='pl-6 py-4'>{movies.popularity}</td>

                                    <td className='py-4'>{genreids[movies.genre_ids[0]]}</td>

                                    <td className='py-4'>{movies.release_date}</td>

                                    <td>
                                        <button className='text-red-500' onClick={(() => del(movies))}>Delete</button>
                                    </td>
                                </tr>

                            })
                        }


                    </tbody>
                </table>
            </div>
        </>

    )
}

export default WatchList