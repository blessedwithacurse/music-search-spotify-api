import * as React from 'react'

export default function NavBar () {

  return(
    <>
      <div class="text-cyan-600 px-6 py-6">
        <nav>
          {/* <div>
            <h1>
              <a href="/">Music Search</a>
            </h1>
          </div> */}
          <ul class="flex flex-row justify-evenly">
            <li>
              <a href="#"> <span>Home</span> </a>
            </li>
            <li>
              <a href="#"> <span>About</span> </a>
            </li>
            <li>
              <a href="#"> <span>Contact</span> </a>
            </li>
          </ul>
          <main>
          <div class="flex justify-end">
            <a class="px-2 text-yellow-500" href="#">Log In</a>
            <a class="px-2 text-yellow-500" href="#">Sign Up</a>
        </div>
      </main>
        </nav>
      </div>
    </>
  )

}

