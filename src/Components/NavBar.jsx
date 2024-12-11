import React from 'react'
import Movielogo from '../IMDB_Logo_2016.svg.svg'
import { Link } from 'react-router-dom'

function NavBar() {
  return (
    <div className='flex space-x-8 items-center py-1 w-full shrink overflow-auto flex-wrap'>

        <Link to='/home'><img className='w-[200px] items-center mb-8 rounded-xl mt-5' src={Movielogo} alt="#" /></Link>

        <Link to='/home' className='text-4xl font-bold text-blue-500 mb-2'>Movies</Link>
        <Link to='/watchlist' className='text-4xl font-bold text-blue-500 mb-2'>Watchlist</Link>

    </div>
  )
}

export default NavBar