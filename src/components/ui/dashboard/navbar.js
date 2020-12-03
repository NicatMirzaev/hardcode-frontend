import React from 'react';
import Logo from '../../../logo.png';
import HomeIcon from '../../../icons/home.svg';
import SearchIcon from '../../../icons/search.svg';
import LeaderboardIcon from '../../../icons/leaderboard.svg';

const dropdownStyle = {
  display: "inline-block",
  width: 0,
  height: 0,
  marginLeft: ".255em",
  verticalAlign: ".255em",
  content: "",
  borderTop: ".3em solid",
  borderRight: ".3em solid transparent",
  borderBottom: 0,
  borderLeft: ".3em solid transparent"
}
const Navbar = props => {
  return (
    <div style={{backgroundColor: '#323f4b'}} className="flex flex-col items-center w-16 h-full">
      <div className="flex mt-3 mb-16">
        <img src="https://i.imgur.com/8Km9tLL.jpg" className="rounded-full border-solid border-white border-2 w-12 cursor-pointer"/>
      </div>
      <div className="flex flex-col mb-12">
        <img className="mb-8 cursor-pointer" src={HomeIcon}/>
        <img className="mb-8 cursor-pointer" src={SearchIcon}/>
        <img className="cursor-pointer"src={LeaderboardIcon}/>
      </div>
      <div className="flex flex-col">
        <div style={{backgroundColor: "#7b8794"}} className="w-10 h-10 mb-3 rounded-md overflow-hidden"/>
        <div style={{backgroundColor: "#7b8794"}} className="w-10 h-10 mb-3 rounded-md overflow-hidden"/>
        <div style={{backgroundColor: "#7b8794"}} className="w-10 h-10 mb-3 rounded-md overflow-hidden"/>
        <div style={{backgroundColor: "#7b8794"}} className="w-10 h-10 mb-3 rounded-md overflow-hidden"/>
      </div>
    </div>
  )
}

export default Navbar;
