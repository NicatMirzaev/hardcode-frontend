import React from 'react';
import Navbar from '../../redux/containers/navbar';
import FirstPlace from '../../icons/first-place.svg';
import SecondPlace from '../../icons/second-place.svg';
import ThirdPlace from '../../icons/third-place.svg';
const Leaderboard = props => {

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
      <div className="flex sm:w-0 w-16">
        <Navbar history={props.history}/>
      </div>
      <div className="flex flex-col mt-12 w-full items-center">
        <div className="flex w-full mb-24 flex-wrap justify-center items-center">
          <div className="flex flex-col sm:w-48 items-center sm:mr-6 mr-0 w-40 rounded overflow-hidden shadow-lg">
            <img width="64" height="64" className="mb-4 mt-6 rounded-full" src="https://picsum.photos/64/64"/>
            <img src={SecondPlace} className="mb-2"/>
            <span className="text-base font-bold">Nicat Mirzayev</span>
            <span className="text-sm text-gray-500 mb-3">Seviye 56</span>
          </div>
          <div className="flex flex-col sm:w-48 items-center sm:mr-6 mr-0  w-40 rounded overflow-hidden shadow-lg">
            <img width="64" height="64" className="mb-4 mt-6 rounded-full" src="https://picsum.photos/64/64"/>
            <img src={FirstPlace} className="mb-2"/>
            <span className="text-base font-bold">Nicat Mirzayev</span>
            <span className="text-sm text-gray-500 mb-3">Seviye 60</span>
          </div>
          <div className="flex flex-col sm:w-48 items-center w-40 rounded overflow-hidden shadow-lg">
            <img width="64" height="64" className="mb-4 mt-6 rounded-full" src="https://picsum.photos/64/64"/>
            <img src={ThirdPlace} className="mb-2"/>
            <span className="text-base font-bold">Nicat Mirzayev</span>
            <span className="text-sm text-gray-500 mb-3">Seviye 54</span>
          </div>
        </div>
        <div className="flex sm:w-1/2 w-full flex-col">
          <div className="flex sm:flex-row flex-col justify-center mb-6 items-center w-full">
            <span className="text-base font-bold sm:mb-0 mb-4 mr-4">4.</span>
            <img width="64" height="64" className="rounded-full mr-2 sm:mb-0 mb-4" src="https://picsum.photos/64/64"/>
            <div style={{backgroundColor: '#EAA786', borderRadius: '4rem'}} className="flex sm:flex-row flex-col sm:justify-between items-center sm:w-full w-10/12 h-12">
              <span className="text-base pl-4 font-bold">Nicat Mirzayev</span>
              <span className="text-base pr-4">Seviye 50</span>
            </div>
          </div>
          <div className="flex sm:flex-row flex-col justify-center mb-6 items-center w-full">
            <span className="text-base font-bold sm:mb-0 mb-4 mr-4">5.</span>
            <img width="64" height="64" className="rounded-full mr-2 sm:mb-0 mb-4" src="https://picsum.photos/64/64"/>
            <div style={{backgroundColor: '#EAA786', borderRadius: '4rem'}} className="flex sm:flex-row flex-col sm:justify-between items-center sm:w-full w-10/12 h-12">
              <span className="text-base pl-4 font-bold">Nicat Mirzayev</span>
              <span className="text-base pr-4">Seviye 50</span>
            </div>
          </div>
          <div className="flex sm:flex-row flex-col justify-center mb-6 items-center w-full">
            <span className="text-base font-bold sm:mb-0 mb-4 mr-4">6.</span>
            <img width="64" height="64" className="rounded-full mr-2 sm:mb-0 mb-4" src="https://picsum.photos/64/64"/>
            <div style={{backgroundColor: '#EAA786', borderRadius: '4rem'}} className="flex sm:flex-row flex-col sm:justify-between items-center sm:w-full w-10/12 h-12">
              <span className="text-base pl-4 font-bold">Nicat Mirzayev</span>
              <span className="text-base pr-4">Seviye 50</span>
            </div>
          </div>
          <div className="flex sm:flex-row flex-col justify-center mb-6 items-center w-full">
          <span className="text-base font-bold sm:mb-0 mb-4 mr-4">7.</span>
            <img width="64" height="64" className="rounded-full mr-2 sm:mb-0 mb-4" src="https://picsum.photos/64/64"/>
            <div style={{backgroundColor: '#EAA786', borderRadius: '4rem'}} className="flex sm:flex-row flex-col sm:justify-between items-center sm:w-full w-10/12 h-12">
              <span className="text-base pl-4 font-bold">Nicat Mirzayev</span>
              <span className="text-base pr-4">Seviye 50</span>
            </div>
          </div>
          <div className="flex sm:flex-row flex-col justify-center mb-6 items-center w-full">
            <span className="text-base font-bold sm:mb-0 mb-4 mr-4">8.</span>
            <img width="64" height="64" className="rounded-full mr-2 sm:mb-0 mb-4" src="https://picsum.photos/64/64"/>
            <div style={{backgroundColor: '#EAA786', borderRadius: '4rem'}} className="flex sm:flex-row flex-col sm:justify-between items-center sm:w-full w-10/12 h-12">
              <span className="text-base pl-4 font-bold">Nicat Mirzayev</span>
              <span className="text-base pr-4">Seviye 50</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Leaderboard;
