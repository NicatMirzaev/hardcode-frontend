import React from 'react';
import EyeIcon from '../../icons/eye.svg';
import HeartIcon from '../../icons/heart.svg';
const Card = () => {
  return (
    <div className="flex flex-col h-1/2 w-56 rounded overflow-hidden shadow-lg">
      <img className="mb-6" src="https://www.tutorialrepublic.com/lib/images/javascript-illustration.png"/>
      <h4 className="text-lg text-center leading-6 font-medium text-gray-900 mb-6">Javascript (Başlangıç)</h4>
      <div className="flex ml-6 mb-2">
        <img className="mr-2" src={EyeIcon}/>
        <p className="text-sm leading-6 text-gray-500">25k görüntüleme</p>
      </div>
      <div className="flex ml-6 mb-8">
        <img className="mr-2" src={HeartIcon}/>
        <p className="text-sm leading-6 text-gray-500">5k beğeni</p>
      </div>
      <a href="/" className="whitespace-no-wrap inline-flex items-center justify-center px-4 py-2 border border-transparent text-base leading-6 font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-500 focus:outline-none focus:border-indigo-700 focus:shadow-outline-indigo active:bg-indigo-700 transition ease-in-out duration-150 w-full">
        Hemen Çöz!
      </a>
    </div>
  )
}

export default Card;
