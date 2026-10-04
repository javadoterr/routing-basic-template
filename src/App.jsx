import React from 'react'
import Navbar from './components/Navbar/Navbar';
import AllRoute from './components/Routes/AllRoute';

const App = () => {
  return (
    <div className='app'>
      <Navbar />
      <main className='app_main'>
        <AllRoute />
      </main>
    </div>
  )
}

export default App;