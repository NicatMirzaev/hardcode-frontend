import React from 'react';

const TaskCard = props => {
  const data = props.data;
  let difficultyColor;
  switch(data.difficulty) {
    case 'Kolay':
      difficultyColor = "#1ba94c";
      break;
    case 'Orta':
      difficultyColor = "#ff9900";
      break;
    default:
      difficultyColor = "#ff0000";
  }
  return (
    <div className="flex w-full sm:flex-row flex-col sm:ml-0 sm:mr-0 ml-auto mr-6 items-center justify-between rounded shadow-lg">
      <div className="flex flex-col p-6">
        <span className="text-center sm:text-left" style={{fontFamily: 'OpenSans, Arial, Helvetica, sans-serif', fontWeight: 400, fontStyle: 'normal', fontSize: '21px', color: '1ba94c'}}>{data.name}</span>
        <div className="flex sm:flex-row flex-col items-center">
          <span style={{fontFamily: 'OpenSans, Arial, Helvetica, sans-serif', fontWeight: 400, fontStyle: 'normal', fontSize: '12px', color: '#738f93', marginRight: '0.25rem'}}>Zorluk: </span>
          <span style={{fontFamily: 'OpenSans, Arial, Helvetica, sans-serif', fontWeight: 400, fontStyle: 'normal', fontSize: '12px', color: difficultyColor, marginRight: '0.30rem'}}>{data.difficulty},</span>
          <span style={{fontFamily: 'OpenSans, Arial, Helvetica, sans-serif', fontWeight: 400, fontStyle: 'normal', fontSize: '12px', color: '#738f93', marginRight: '0.25rem'}}>Kategori: </span>
          <span style={{fontFamily: 'OpenSans, Arial, Helvetica, sans-serif', fontWeight: 400, fontStyle: 'normal', fontSize: '12px', color: '#738f93', marginRight: '0.30rem'}}>Javascript (Başlangıç),</span>
          <span style={{fontFamily: 'OpenSans, Arial, Helvetica, sans-serif', fontWeight: 400, fontStyle: 'normal', fontSize: '12px', color: '#738f93'}}>Çözülme Sayısı: {data.solvedCount}</span>
        </div>
      </div>
      <div className="sm:w-1/5 w-full sm:pt-4 sm:pr-6">
        {data.isSolved === false ?
          <a href="/" className="whitespace-no-wrap inline-flex items-center justify-center px-4 py-2 border border-transparent text-base leading-6 font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-500 focus:outline-none focus:border-indigo-700 focus:shadow-outline-indigo active:bg-indigo-700 transition ease-in-out duration-150 w-full">
            Hemen Çöz!
          </a>
          :
          <a href="/" className="whitespace-no-wrap inline-flex items-center justify-center px-4 py-2 border border-transparent text-base leading-6 font-medium rounded-md text-white bg-green-600 hover:bg-green-500 focus:outline-none focus:border-green-700 focus:shadow-outline-green active:bg-green-700 transition ease-in-out duration-150 w-full">
            Çözüldü ✓
          </a>
        }
      </div>
    </div>
  )
}

export default TaskCard;
