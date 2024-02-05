import HomePage from './scenes/HomePage'
import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'
import { useEffect, useState } from 'react'

const queryClient = new QueryClient()



function App() {
 

  return (
   <>
   <QueryClientProvider client={queryClient}>
      <HomePage/>
   </QueryClientProvider>
   </>
  )
}

export default App
