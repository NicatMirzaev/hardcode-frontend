import React from 'react';
import Navbar from '../ui/dashboard/navbar';
import Card from '../ui/card';

const Dashboard = props => {
  const [menu, setMenu] = React.useState(false);

  React.useEffect(() => {

    function handleClick(e){
      if(menu === true && e.target.outerText !== "Account settings" && e.target.outerText !== "Support"){
        setMenu(false);
      }
    }

    window.addEventListener('mousedown', handleClick);

    return () => {
      window.removeEventListener('mousedown', handleClick);
    }

  }, [menu])

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
      {menu === true &&
        <div className="origin-top-left fixed left-0 mt-2 w-56 ml-20 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
          <div className="py-1" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
            <p className="block mb-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900" role="menuitem">Seviye 4 (XP 2500 / 5000)</p>
            <div style={{width: '100%', backgroundColor: '#ddd', height: '10px'}}>
              <div style={{width: '50%', backgroundColor: '#4CAF50', height: '10px'}}/>
            </div>
            <a href="/" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900" role="menuitem">Profil</a>
            <button className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900 focus:outline-none focus:bg-gray-100 focus:text-gray-900" role="menuitem">
                Çıkış Yap
            </button>
          </div>
        </div>
      }
        <Navbar menu={menu} setMenu={setMenu}/>
      </div>
      <div className="flex w-full justify-right flex-wrap">
        <div className="flex my-12 md:w-full w-3/4">
          <input className="shadow appearance-none border mx-auto rounded py-2 px-3 sm:w-1/2 w-full text-grey-darker" placeholder="Arama Yapın"/>
        </div>
        <Card/>
        <Card/>
        <Card/>
        <Card/>
        <Card/>
        <Card/>
        <Card/>
        <Card/>
        <Card/>
        <Card/>
        <Card/>
        <Card/>
      </div>
    </div>
  )
}

export default Dashboard;
