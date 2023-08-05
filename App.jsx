import React from 'react'
import Home from './Components/Home/Home'
import Navbar from './Components/Navbar/Navbar'
import Search from './Components/Search/Search'
import Support from './Components/Support/Support'
import Info from './Components/Info/Info'
import Lounge from './Components/Lounge/Lounge'
import Travellers from './Components/Travellers/Travellers'
import Subcribers from './Components/Subscribers/Subscribers'
import Footer from './Components/Footer/Footer'


const App = () => {
  return (
    <div>
     
      <Navbar />
      <Home />
      <Search />
      {/* <Support />
      <Info />
      <Lounge/>
      <Travellers/>
      <Subcribers/>
      <Footer/>  */}


    </div>
  )
}

export default App
