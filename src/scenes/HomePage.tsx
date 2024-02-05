import NavBar from '../components/NavBar'
import SearchBar from '../components/SearchBar'
import * as React from 'react'

export default function HomePage () {
  return (
    <>
      <NavBar/>
      <header>
        <h2 class="text-lg pl-6 pb-6 text-cyan-900">Find what you are looking for...</h2>
      </header>
      <SearchBar/>
    </>
  )
  
}