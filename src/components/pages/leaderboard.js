import React from 'react';
import Navbar from '../../redux/containers/navbar';
import FirstPlace from '../../icons/first-place.svg';
import SecondPlace from '../../icons/second-place.svg';
import ThirdPlace from '../../icons/third-place.svg';
import ErrorIcon from '../../icons/cancel.svg';
import ProfileIcon from '../../icons/profile.png';
import settings from '../../lib/settings';
import { getValue } from '../../lib/store.js';
import { FETCH_LEADERBOARD } from '../../lib/queries';

const Leaderboard = props => {
  const [data, setData] = React.useState({});
  const [state, setState] = React.useState({loading: true, error: ''})

  React.useEffect(() => {
    setState({loading: true, error: ''})
    const value = getValue("token");
    if(value) {
      fetch(settings.apiURL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'Authorization': 'Bearer ' + value
        },
        body: JSON.stringify({
          query: FETCH_LEADERBOARD
        })
      }).then(r => r.json())
      .then(data => {
        if(data.errors) {
          setState({loading: false, error: data.errors[0].message})
        }
        else {
          const users = data.data.getLeaderboard;
          console.log(users);
          if(users.length >= 3) {
            setData(users);
            setState({loading: false, error: ''})
          }
          else {
            setState({loading: false, error: 'Lider tablosunu göstermek için yeterli kayıtlı üye yok.'})
          }
        }
      })
    }
  }, [props])

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

  if(state.loading === true) {
    return (
      <div className="flex w-full h-full">
        <div className="flex sm:w-1/5 w-1/3">
          <Navbar history={props.history}/>
        </div>
        <div className="w-full h-full flex justify-center">
          <span className="text-green-500 opacity-75 top-1/2 my-0 block relative w-0 h-0 mb-24 mr-24" style={{top: '50%'}}>
            <i className="fas fa-circle-notch fa-spin fa-5x"></i>
          </span>
        </div>
      </div>
    )
  }
  else if(state.error.length > 0) {
    return (
      <div className="flex w-full h-full">
        <div className="flex sm:w-1/5 w-1/3">
          <Navbar history={props.history}/>
        </div>
        <div className="flex w-full h-full flex-col justify-center items-center">
          <img className="mb-6" src={ErrorIcon}/>
          <h4 className="font-bold text-red-600">{state.error}</h4>
        </div>
      </div>
    )
  }

  return (
    <div className="flex w-full h-full">
      <div className="flex sm:w-0 w-16">
        <Navbar history={props.history}/>
      </div>
      <div className="flex flex-col mt-12 w-full items-center">
        <div className="flex w-full mb-24 flex-wrap justify-center items-center">
          <div onClick={() => props.history.push(`/profile/${data[1].id}`)} className="flex cursor-pointer flex-col sm:w-48 items-center sm:mr-6 mr-0 w-40 rounded overflow-hidden shadow-lg">
            {data[0].profileImg.length > 0 ? <img width="64" height="64" className="mb-4 mt-6 rounded-full" src={data[0].profileImg}/> : <img width="64" height="64" className="mb-4 mt-6 rounded-full" src={ProfileIcon}/>}
            <img src={SecondPlace} className="mb-2"/>
            <span className="text-base font-bold">{data[1].username}</span>
            <span className="text-sm text-gray-500 mb-3">Seviye {data[1].level}</span>
          </div>
          <div onClick={() => props.history.push(`/profile/${data[0].id}`)} className="flex cursor-pointer flex-col sm:w-48 items-center sm:mr-6 mr-0  w-40 rounded overflow-hidden shadow-lg">
            {data[0].profileImg.length > 0 ? <img width="64" height="64" className="mb-4 mt-6 rounded-full" src={data[0].profileImg}/> : <img width="64" height="64" className="mb-4 mt-6 rounded-full" src={ProfileIcon}/>}
            <img src={FirstPlace} className="mb-2"/>
            <span className="text-base font-bold">{data[0].username}</span>
            <span className="text-sm text-gray-500 mb-3">Seviye {data[0].level}</span>
          </div>
          <div onClick={() => props.history.push(`/profile/${data[2].id}`)} className="flex cursor-pointer flex-col sm:w-48 items-center w-40 rounded overflow-hidden shadow-lg">
            {data[2].profileImg.length > 0 ? <img width="64" height="64" className="mb-4 mt-6 rounded-full" src={data[2].profileImg}/> : <img width="64" height="64" className="mb-4 mt-6 rounded-full" src={ProfileIcon}/>}
            <img src={ThirdPlace} className="mb-2"/>
            <span className="text-base font-bold">{data[2].username}</span>
            <span className="text-sm text-gray-500 mb-3">Seviye {data[2].level}</span>
          </div>
        </div>
        <div className="flex sm:w-1/2 w-full flex-col">
          {data.slice(3).map((user, index) => {
            return (
            <div onClick={() => props.history.push(`/profile/${user.id}`)} key={user.id} className="flex cursor-pointer sm:flex-row flex-col justify-center mb-6 items-center w-full">
              <span className="text-base font-bold sm:mb-0 mb-4 mr-4">{index + 4}.</span>
              {user.profileImg.length > 0 ? <img width="64" height="64" className="rounded-full mr-2 sm:mb-0 mb-4" src={user.profileImg}/> : <img width="64" height="64" className="mb-4 mt-6 rounded-full" src={ProfileIcon}/>}
              <div style={{backgroundColor: '#EAA786', borderRadius: '4rem'}} className="flex sm:flex-row flex-col sm:justify-between items-center sm:w-full w-10/12 h-12">
                <span className="text-base pl-4 font-bold">{user.username}</span>
                <span className="text-base pr-4">Seviye {user.level}</span>
              </div>
            </div>
          )
          })}
        </div>
      </div>
    </div>
  )
}

export default Leaderboard;
