import React from 'react';
import Navbar from '../../redux/containers/navbar';
import TwitterIcon from '../../icons/twitter.png';
import GithubIcon from '../../icons/github.svg';
import LinkedinIcon from '../../icons/linkedin.svg';
import ProfileIcon from '../../icons/profile.png';
import ErrorIcon from '../../icons/cancel.svg';
import Card from '../../redux/containers/card';
import settings from '../../lib/settings.js';
import { timestampToDate, calculatePercentage } from '../../lib/utils.js';
import { UPDATE_PROFILE, FETCH_USER } from '../../lib/queries';
import { getValue } from '../../lib/store.js';

const Profile = props => {
  const [state, setState] = React.useState({loading: true, error: ''});
  const [data, setData] = React.useState({});
  const [content, setContent] = React.useState(0);
  const [categories, setCategories] = React.useState({});
  const userData = props.user.data && props.user.data.user;
  const { match: { params }} = props;

  React.useEffect(() => {
    setUsername(userData === undefined ? "" : userData.username);
    setImg(userData === undefined ? "" : userData.profileImg);
    setTwitter(userData === undefined ? "" : userData.twitterURL);
    setGitHub(userData === undefined ? "" : userData.GitHubURL);
    setLinkedin(userData === undefined ? "" : userData.LinkedinURL);

    const value = getValue('token');
    if(value) {
      fetch(settings.apiURL, {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'Authorization': 'Bearer ' + value
        },
        body: JSON.stringify({
          query: FETCH_USER,
          variables: {id: params.id}
        })
      }).then(r => r.json())
      .then(data => {
        if(data.data) {
          setData(data.data.user);
          setCategories(data.data.user.likes);
          setState({loading: false, error: ''});
        }
        else {
          setState({loading: false, error: data.errors[0].message})
        }
      })
    }
  }, [props])

  const [username, setUsername] = React.useState("");
  const [img, setImg] = React.useState("");
  const [twitter, setTwitter] = React.useState("");
  const [gitHub, setGitHub] = React.useState("");
  const [Linkedin, setLinkedin] = React.useState("");
  const [currentPassword, setCurrentPassword] = React.useState("");
  const [newPassword, setNewPassword] = React.useState("");
  const [msg, setMsg] = React.useState({type: 1, msg: ""})

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

  const handleChange = e => {
    const value = e.target.value;
    if(value.length > 0) {
      const filter = [];
      for(let i = 0; i < data.likes.length; i++) {
        if(data.likes[i].name.toLowerCase().includes(value.toLowerCase())) {
          filter.push(data.likes[i]);
        }
      }
      setCategories(filter);
    }
    else setCategories(data.likes);
  }

  const updateProfile = () => {
    const value = getValue('token');
    if(value) {
      fetch(settings.apiURL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'Authorization': 'Bearer ' + value
        },
        body: JSON.stringify({
          query: UPDATE_PROFILE,
          variables: { currentPassword, newPassword, Linkedin, gitHub, twitter, img, username}
        })
    }).then(r => r.json())
      .then(data => {
        if(data.errors) {
          setMsg({type: 1, msg: data.errors[0].message})
        }
        else {
          const userData = data.data.updateProfile;
          setMsg({type: 2, msg: "Your account has been successfully saved."})
          if(userData.id === params.id) setData(userData);
          props.setUser({isLogged: true, isLoading: false, data: {token: value, user: userData}})
        }
      });
    }
  }

  const showMessage = () => {
    if(msg.msg.length > 0) {
      if(msg.type == 1) {
        return (
          <p className="text-sm mb-6 text-red-500">
            {msg.msg}
          </p>
        )
      }
      else {
        return (
          <p className="text-sm mb-6 text-green-500">
            {msg.msg}
          </p>
        )
      }
    }
  }

  return (
    <div className="flex w-full h-full">
      <div className="flex md:w-1/5 sm:w-1/4 w-1/3">
        <Navbar history={props.history}/>
      </div>
      <div className="flex flex-col sm:flex-row w-full mt-12 sm:mt-32">
        <div className="flex flex-col items-center mb-24 sm:mb-0 sm:mr-32 sm:w-1/3 w-full">
          {data.profileImg.length <= 0 ? <img src={ProfileIcon} width="164" height="164" className="rounded-full border-solid border-white border-2 w-36 mb-4 cursor-pointer"/> : <img src={data.profileImg} width="164" height="164" className="rounded-full border-solid border-white border-2 w-36 mb-4 cursor-pointer"/>}
          <h4 className="text-lg mb-4 leading-6 font-medium text-gray-900">{data.username}</h4>
          <div className="flex flex-col mb-6">
            <p className="self-start mb-1 text-sm text-gray-500">Register date: {timestampToDate(data.createdAt)}</p>
            <p className="self-start mb-1 text-sm text-gray-500">Solved Tasks: {data.completedTasks}</p>
            <p className="self-start mb-4 text-sm text-gray-500">Level: {data.level} (XP {data.exp} / {data.requiredExp})</p>
            <div className="mb-4" style={{width: '100%', backgroundColor: '#ddd', height: '10px'}}>
              <div style={{width: calculatePercentage(data.exp, data.requiredExp), backgroundColor: '#4CAF50', height: '10px'}}/>
            </div>
            <div className="flex">
              <a href={data.twitterURL} target="_blank"><img src={TwitterIcon} className="mr-4" width="20" height="20"/></a>
              <a href={data.GitHubURL} target="_blank"><img className="mr-4" src={GithubIcon}/></a>
              <a href={data.LinkedinURL} target="_blank"><img src={LinkedinIcon}/></a>
            </div>
          </div>
          {params.id == userData.id &&
            <p onClick={() => setContent(1)} style={{borderRadius: '8rem'}} className="whitespace-no-wrap cursor-pointer inline-flex w-full items-center justify-center px-4 py-2 border border-transparent text-base leading-6 font-medium text-white bg-indigo-600 hover:bg-indigo-500 focus:outline-none focus:border-indigo-700 focus:shadow-outline-indigo active:bg-indigo-700 transition ease-in-out duration-150">
              Profile Settings
            </p>
          }
        </div>
        <div className="flex w-full flex-col">
          {content == 0 ?
            <div>
              <div className="md:w-2/3 mb-12">
                <span className="search-profile absolute text-gray-700 flex items-center pl-2">
                  <button type="submit" className="p-1 focus:outline-none focus:shadow-outline">
                    <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" className="w-6 h-6"><path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
                  </button>
                </span>
                <input onChange={e => handleChange(e)} style={{borderRadius: '12rem'}} className="shadow appearance-none w-full border py-2 px-12 text-grey-darker" placeholder="Search"/>
              </div>
              <div className="flex w-full h-full flex-wrap">
                {categories.length > 0 ? categories.map(category => <Card history={props.history} key={category.id} data={category}/>) : null}
              </div>
            </div>
            :
            <div>
              <h4 onClick={() => setContent(0)} className="text-lg mb-12 leading-6 cursor-pointer font-medium text-gray-900">{'<'} Profile Settings</h4>
              <input defaultValue={userData.username} onChange={e => setUsername(e.target.value)} className="shadow appearance-none w-11/12 border mb-12 rounded py-2 px-3 text-grey-darker" placeholder="Username"/>
              <input defaultValue={userData.profileImg} onChange={e => setImg(e.target.value)} className="shadow appearance-none w-11/12 border mb-12 rounded py-2 px-3 text-grey-darker" placeholder="Profile Image URL"/>
              <input defaultValue={userData.twitterURL} onChange={e => setTwitter(e.target.value)} className="shadow appearance-none w-11/12 border mb-12 rounded py-2 px-3 text-grey-darker" placeholder="Twitter Address"/>
              <input defaultValue={userData.GitHubURL} onChange={e => setGitHub(e.target.value)} className="shadow appearance-none w-11/12 border mb-12 rounded py-2 px-3 text-grey-darker" placeholder="GitHub Address"/>
              <input defaultValue={userData.LinkedinURL} onChange={e => setLinkedin(e.target.value)} className="shadow appearance-none w-11/12 border mb-12 rounded py-2 px-3 text-grey-darker" placeholder="Linkedin Address"/>
              <input value={currentPassword} onChange={e => setCurrentPassword(e.target.value)} className="shadow appearance-none w-11/12 border mb-12 rounded py-2 px-3 text-grey-darker" placeholder="Current Password"/>
              <input value={newPassword} onChange={e => setNewPassword(e.target.value)} className="shadow appearance-none w-11/12 border mb-12 rounded py-2 px-3 text-grey-darker" placeholder="New Password"/>
              {showMessage()}
              <p onClick={updateProfile} style={{borderRadius: '8rem'}} className="whitespace-no-wrap cursor-pointer mb-12 inline-flex w-11/12 items-center justify-center px-4 py-2 border border-transparent text-base leading-6 font-medium text-white bg-indigo-600 hover:bg-indigo-500 focus:outline-none focus:border-indigo-700 focus:shadow-outline-indigo active:bg-indigo-700 transition ease-in-out duration-150">
                Save changes
              </p>
            </div>
          }
        </div>
      </div>
    </div>
  )
}

export default Profile;
