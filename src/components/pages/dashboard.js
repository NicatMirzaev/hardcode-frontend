import React from 'react';
import Navbar from '../ui/dashboard/navbar';
import Card from '../ui/card';

const Dashboard = props => {
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
      <div className="flex w-1/3">
        <Navbar/>
      </div>
      <div className="flex h-1/2 w-1/2 self-center flex-wrap">
        <Card/>
      </div>
    </div>
  )
}

export default Dashboard;
