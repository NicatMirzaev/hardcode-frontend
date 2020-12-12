import React from 'react';
import Navbar from '../ui/dashboard/navbar';
import TwitterIcon from '../../icons/twitter.png';
import GithubIcon from '../../icons/github.svg';
import LinkedinIcon from '../../icons/linkedin.svg';

const MyProfile = props => {
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
      <div className="flex sm:w-1/5 w-1/3">
        <Navbar history={props.history}/>
      </div>
      <div className="flex w-1/2 mt-32">
        <div className="flex flex-col items-center w-1/4 ">
          <img src="https://picsum.photos/144/144" className="rounded-full border-solid border-white border-2 w-36 mb-4 cursor-pointer"/>
          <h4 className="text-lg mb-4 leading-6 font-medium text-gray-900">Nicat Mirzayev</h4>
          <div className="flex flex-col mb-6">
            <p className="self-start mb-1 text-sm text-gray-500">Kayıt Tarihi: 12.11.2020</p>
            <p className="self-start mb-4 text-sm text-gray-500">Bitirilen Görevler: 89</p>
            <div className="flex">
              <a href="/" target="_blank"><img src={TwitterIcon} className="mr-4" width="20" height="20"/></a>
              <a href="https://github.com/NicatMirzoev" target="_blank"><img className="mr-4" src={GithubIcon}/></a>
              <a href="/" target="_blank"><img src={LinkedinIcon}/></a>
            </div>
          </div>
          <p style={{borderRadius: '8rem'}} className="whitespace-no-wrap cursor-pointer inline-flex w-full items-center justify-center px-4 py-2 border border-transparent text-base leading-6 font-medium text-white bg-indigo-600 hover:bg-indigo-500 focus:outline-none focus:border-indigo-700 focus:shadow-outline-indigo active:bg-indigo-700 transition ease-in-out duration-150">
            Profil Ayarları
          </p>
        </div>
      </div>
    </div>
  )
}

export default MyProfile;
