import React from 'react';

const Hero = props => (
  <div className="px-4 mb-24 md:block">
    <div className="pb-8 mt-auto">
      <div className="text-center">
        <h2 className="text-4xl tracking-tight mb-12 leading-10 font-extrabold text-gray-900 sm:text-5xl sm:leading-none md:text-6xl">Improve your programming skills!</h2>
        <div className="md:max-w-2xl mx-auto">
          <p className="mt-3 text-base mb-6 text-gray-500 sm:mt-5 sm:text-lg sm:mx-auto md:mt-5 md:text-xl">
            Improve your programming skill by finishing tasks. Moreover, completely in English and Free! all you have to do is log in.
          </p>
        </div>
        <div className="mb-6 mt-12 flex flex-col sm:block">
          <a href="/" onClick={e => props.onClickGetStarted(e)} className="px-8 py-3 border sm:mr-6 border-transparent text-base leading-6 font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-500 focus:outline-none focus:border-indigo-700 focus:shadow-outline-indigo transition duration-150 ease-in-out md:py-4 md:text-lg md:px-10">
            Get Started!
          </a>
          <a href="/" onClick={e => props.onClickSubscribe(e)} className="px-8 py-3 border border-transparent text-base leading-6 font-medium rounded-md text-indigo-700 bg-indigo-100 hover:text-indigo-600 hover:bg-indigo-50 focus:outline-none focus:shadow-outline-indigo focus:border-indigo-300 transition duration-150 ease-in-out md:py-4 md:text-lg md:px-10">
            Subscribe
          </a>
        </div>
      </div>
    </div>
  </div>
)


export default Hero;
