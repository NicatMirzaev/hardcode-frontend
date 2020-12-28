import React from 'react';
import EyeIcon from '../../icons/eye.svg';
import HeartIcon from '../../icons/heart.svg';
import HeartRedIcon from '../../icons/heart_red.svg';
import { abbreviateNumber } from '../../lib/utils';
import settings from '../../lib/settings';
import { getValue } from '../../lib/store.js';
import { LIKE_CATEGORY } from '../../lib/queries';

const Card = props => {
  const [data, setData] = React.useState({});

  React.useEffect(() => {
    setData(props.data);
  }, [])

  const onClickLike = () => {
    const value = getValue('token');
    fetch(settings.apiURL, {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': 'Bearer ' + value
      },
      body: JSON.stringify({
        query: LIKE_CATEGORY,
        variables: { categoryId: data.id }
      })
    }).then(r => r.json())
    .then(data => {
      setData(data.data.likeCategory);
    })
  }
  return (
    <div style={{maxWidth: '224px', maxHeight: '322px', minWidth: '224px', minHeight: '322px'}} className="flex flex-col sm:w-56 w-52 mr-6 rounded overflow-hidden shadow-lg mb-12">
      <img style={{maxWidth: '224px', maxHeight: '84px', minWidth: '224px', minHeight: '84px'}} className="mb-6" src={data.image}/>
      <h4 className="text-lg text-center leading-6 font-medium text-gray-900 mb-6">{data.name}</h4>
      <div className="flex ml-6 mb-2">
        <img className="mr-2" src={EyeIcon}/>
        <p className="text-sm leading-6 text-gray-500">{abbreviateNumber(data.views)} görüntüleme</p>
      </div>
      <div className="flex ml-6 mb-8">
        {data.isLiked === true ? <img onClick={onClickLike} className="mr-2 cursor-pointer" src={HeartRedIcon}/> : <img onClick={onClickLike} className="mr-2 cursor-pointer" src={HeartIcon}/>}
        <p className="text-sm leading-6 text-gray-500">{abbreviateNumber(data.likes)} beğeni</p>
      </div>
      <a href="/" className="whitespace-no-wrap inline-flex items-center justify-center px-4 py-2 border border-transparent text-base leading-6 font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-500 focus:outline-none focus:border-indigo-700 focus:shadow-outline-indigo active:bg-indigo-700 transition ease-in-out duration-150 w-full">
        Hemen Çöz!
      </a>
    </div>
  )
}

export default Card;
