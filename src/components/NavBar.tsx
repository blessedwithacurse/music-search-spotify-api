import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import fontawesome from '@fortawesome/fontawesome'
import { faMusic } from '@fortawesome/fontawesome-free-solid'

fontawesome.library.add(faMusic);

export default function NavBar () {

  return(
    <nav class="mb-5">
      <div class="px-6 py-6 flex items-center	justify-between">
        <div class="text-blue-900  flex items-center">
          <FontAwesomeIcon icon="fa-soslid fa-music" size='5x'/>
          <h1 class="pl-20 text-4xl font-semibold	italic"></h1>
        </div>
        <div>
            <a class="text-blue-900 pr-2" href="#"> <span>Home</span> </a>
            <a class="text-blue-900 pr-2" href="#"> <span>About</span> </a>
            <a class="text-blue-900 pr-2" href="#"> <span>Contact</span> </a>
        </div>
      </div>
    </nav>
  )

}

