import React from 'react';
import Navbar from '../../redux/containers/navbar';
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
      <div className="flex sm:w-1/5 w-1/3">
        <Navbar history={props.history}/>
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
