import React from 'react';

const TaskCard = props => {
  return (
    <div className="flex items-center justify-between rounded shadow-lg">
      <div className="flex flex-col p-6">
        <span style={{fontFamily: 'OpenSans, Arial, Helvetica, sans-serif', fontWeight: 400, fontStyle: 'normal', fontSize: '21px', color: '1ba94c'}}>Hello World!</span>
        <div className="flex items-center">
          <span style={{fontFamily: 'OpenSans, Arial, Helvetica, sans-serif', fontWeight: 400, fontStyle: 'normal', fontSize: '12px', color: '#738f93', marginRight: '0.25rem'}}>Zorluk: </span>
          <span style={{fontFamily: 'OpenSans, Arial, Helvetica, sans-serif', fontWeight: 400, fontStyle: 'normal', fontSize: '12px', color: '#1ba94c', marginRight: '0.30rem'}}>Kolay,</span>
          <span style={{fontFamily: 'OpenSans, Arial, Helvetica, sans-serif', fontWeight: 400, fontStyle: 'normal', fontSize: '12px', color: '#738f93', marginRight: '0.25rem'}}>Kategori: </span>
          <span style={{fontFamily: 'OpenSans, Arial, Helvetica, sans-serif', fontWeight: 400, fontStyle: 'normal', fontSize: '12px', color: '#738f93', marginRight: '0.30rem'}}>Javascript (Başlangıç),</span>
          <span style={{fontFamily: 'OpenSans, Arial, Helvetica, sans-serif', fontWeight: 400, fontStyle: 'normal', fontSize: '12px', color: '#738f93'}}>Çözülme Sayısı: 25</span>
        </div>
      </div>
      <div className="w-1/5 pt-4 pr-6">
        <a href="/" className="whitespace-no-wrap inline-flex items-center justify-center px-4 py-2 border border-transparent text-base leading-6 font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-500 focus:outline-none focus:border-indigo-700 focus:shadow-outline-indigo active:bg-indigo-700 transition ease-in-out duration-150 w-full">
          Hemen Çöz!
        </a>
      </div>
    </div>
  )
}

export default TaskCard;
