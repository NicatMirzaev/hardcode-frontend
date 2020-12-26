import React from 'react';
import Navbar from '../../redux/containers/navbar';
import Card from '../ui/card';
import settings from '../../lib/settings';
import { getValue } from '../../lib/store.js';
import { GET_CATEGORIES } from '../../lib/queries';

const Dashboard = props => {
  const [categories, setCategories] = React.useState({});

  React.useEffect(() => {
    const value = getValue('token');
    fetch(settings.apiURL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': 'Bearer ' + value
      },
      body: JSON.stringify({
        query: GET_CATEGORIES
      })
    }).then(r => r.json())
    .then(data => {
      if(data.data) {
        const categories = data.data.getCategories;
        props.setCategories(categories);
        setCategories(categories);
      }
    })
  }, [])

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
  const handleChange = e => {
    const allCategories = props.categories;
    const search = e.target.value;
    if(search.length > 0) {
      const filteredCategories = [];
      for(let i = 0; i < allCategories.length; i++) {
        if(allCategories[i].name.toLowerCase().includes(search.toLowerCase())) {
          filteredCategories.push(allCategories[i]);
        }
      }
      setCategories(filteredCategories);
    }
    else {
      setCategories(allCategories);
    }
  }
  return (
    <div className="flex w-full h-full">
      <div className="flex sm:w-1/5 w-1/3">
        <Navbar history={props.history}/>
      </div>
      <div className="flex flex-col w-full justify-right">
        <div className="flex my-12 sm:w-full w-full">
          <div className="sm:w-1/2 w-full mb-6 mx-auto">
            <span style={{top: "55px"}} className="absolute text-gray-700 flex items-center pl-2">
              <button type="submit" className="p-1 focus:outline-none focus:shadow-outline">
                <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" className="w-6 h-6"><path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
              </button>
            </span>
            <input onChange={e => handleChange(e)} style={{borderRadius: '12rem'}} className="shadow appearance-none w-full border py-2 px-12 text-grey-darker" placeholder="Arama"/>
          </div>
        </div>
        <div className="flex flex-wrap mx-auto">
          {categories.length && categories.map(category => <Card key={category.id} data={category}/>)}
        </div>
      </div>
    </div>
  )
}

export default Dashboard;
