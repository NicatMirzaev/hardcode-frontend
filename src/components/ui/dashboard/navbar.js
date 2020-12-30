import React from 'react';
import Logo from '../../../logo.png';
import HomeIcon from '../../../icons/home.svg';
import SearchIcon from '../../../icons/search.svg';
import LeaderboardIcon from '../../../icons/leaderboard.svg';
import ProfileIcon from '../../../icons/profile.png';
import { calculatePercentage } from '../../../lib/utils';
import { removeValue } from '../../../lib/store';

const Navbar = props => {
  const [menu, setMenu] = React.useState(false);
  const userData = props.user.data && props.user.data.user;

  React.useEffect(() => {

    function handleClick(e){
      if(menu === true && e.target.outerText !== "Profil" && e.target.outerText !== "Çıkış Yap"){
        setMenu(false);
      }
    }

    window.addEventListener('mousedown', handleClick);

    return () => {
      window.removeEventListener('mousedown', handleClick);
    }

  }, [menu])

  const handleLogout = () => {
    removeValue('token');
    props.setUser({isLogged: false, isLoading: false})
    props.history.push('/')
  }
  return (
    <div style={{backgroundColor: '#323f4b'}} className="flex flex-col fixed items-center w-16 h-full">
    {menu === true &&
      <div className="origin-top-left fixed left-0 mt-2 w-56 ml-20 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
        <div className="py-1" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
          <p className="block mb-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900" role="menuitem">Seviye {userData.level} (XP {userData.exp} / {userData.requiredExp})</p>
          <div style={{width: '100%', backgroundColor: '#ddd', height: '10px'}}>
            <div style={{width: calculatePercentage(userData.exp, userData.requiredExp), backgroundColor: '#4CAF50', height: '10px'}}/>
          </div>
          <p onClick={() => props.history.push(`/profile/${userData.id}`)} className="block cursor-pointer px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900" role="menuitem">Profil</p>
          <button onClick={handleLogout} className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900 focus:outline-none focus:bg-gray-100 focus:text-gray-900" role="menuitem">
              Çıkış Yap
          </button>
        </div>
      </div>
    }
      <div className="flex mt-3 mb-16">
        {userData.profileImg.length <= 0 ? <img onClick={() => setMenu(!menu)} src={ProfileIcon} width="50" height="40" className="rounded-full border-solid border-white border-2 w-12 cursor-pointer"/> : <img onClick={() => setMenu(!menu)} src={userData.profileImg} width="48" height="48" className="rounded-full border-solid border-white border-2 w-12 cursor-pointer"/>}
      </div>
      <div className="flex flex-col mb-12">
        <img onClick={() => props.history.push('/dashboard')} className="mb-8 cursor-pointer" src={HomeIcon}/>
        <img onClick={() => props.history.push('/discover')} className="mb-8 cursor-pointer" src={SearchIcon}/>
        <img onClick={() => props.history.push('/leaderboard')} className="cursor-pointer"src={LeaderboardIcon}/>
      </div>
      <div className="flex flex-col">
        {userData.likes.map(category => <div key={category.id} style={{backgroundImage: `url(${category.image})`, backgroundRepeat: 'no-repeat', backgroundSize: 'cover', backgroundPosition: 'center'}} className="w-10 h-10 mb-3 rounded-md overflow-hidden cursor-pointer"/>)}
      </div>
    </div>
  )
}

export default Navbar;
