import React from 'react';
import Navbar from '../../redux/containers/navbar';

const Discover = props => {

  if(props.user.isLoading === true) {
    return (
      <div className="w-full h-full flex justify-center">
        <span className="text-green-500 opacity-75 top-1/2 my-0 block relative w-0 h-0 mb-24 mr-24" style={{top: '50%'}}>
          <i className="fas fa-circle-notch fa-spin fa-5x"></i>
        </span>
      </div>
    )
  }
  if(props.user.isLogged === false) {
    setTimeout(() => props.history.push('/'), 250);
    return null;
  }
  return (
    <div className="flex w-full h-full">
      <div className="flex w-16">
        <Navbar history={props.history}/>
      </div>
      <div className="flex flex-col mt-6 w-full">
        <h2 className="text-2xl tracking-tight mx-auto mb-6 leading-10 font-extrabold text-gray-900 sm:text-3xl sm:leading-none md:text-4xl">HardCode'u Keşfet!</h2>
        <div className="w-1/2 mx-auto">
          <span style={{top: "90px"}} className="absolute text-gray-700 flex items-center pl-2">
            <button type="submit" className="p-1 focus:outline-none focus:shadow-outline">
              <svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" viewBox="0 0 24 24" class="w-6 h-6"><path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
            </button>
          </span>
          <input style={{borderRadius: '12rem'}} className="shadow appearance-none w-full border py-2 px-12 text-grey-darker" placeholder="Arama"/>
        </div>
      </div>
    </div>
  )
}

export default Discover;
