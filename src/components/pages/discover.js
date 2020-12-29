import React from 'react';
import Navbar from '../../redux/containers/navbar';
import Card from '../../redux/containers/card';
import settings from '../../lib/settings';
import { getValue } from '../../lib/store.js';
import { GET_CATEGORIES } from '../../lib/queries';

const Discover = props => {
  const [menu, setMenu] = React.useState({show: false, chosen: 'Kategoriler'});

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

  return (
    <div className="flex w-full h-full">
      <div className="flex w-16">
        <Navbar history={props.history}/>
      </div>
      <div className="flex flex-col mt-6 w-full">
        <h2 className="text-2xl tracking-tight mx-auto mb-6 leading-10 font-extrabold text-gray-900 sm:text-3xl sm:leading-none md:text-4xl">HardCode'u Keşfet!</h2>
        <div className="w-1/2 mb-6 mx-auto">
          <span style={{top: "90px"}} className="absolute text-gray-700 flex items-center pl-2">
            <button type="submit" className="p-1 focus:outline-none focus:shadow-outline">
              <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" className="w-6 h-6"><path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
            </button>
          </span>
          <input style={{borderRadius: '12rem'}} className="shadow appearance-none w-full border py-2 px-12 text-grey-darker" placeholder="Arama"/>
        </div>
        <div className="flex justify-center mb-16 items-center w-1/2 mx-auto">
          <span className="text-gray-500 font-bold mr-6">Filtrele</span>
          <button onClick={() => setMenu({show: !menu.show, chosen: menu.chosen})} type="button" className="inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-indigo-500" id="options-menu" aria-haspopup="true" aria-expanded="true">
            {menu.chosen}
            <svg className="-mr-1 ml-2 h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
              <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </button>
          {menu.show === true &&
            <div style={{top: '183px'}} className="absolute mt-2 w-56 rounded-md shadow-lg">
              <div className="rounded-md bg-white shadow-xs">
                <div className="py-1" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
                  <p onClick={() => setMenu({show: false, chosen: 'Kategoriler'})} className="block cursor-pointer px-4 py-2 text-sm leading-5 text-gray-700 hover:bg-gray-100 hover:text-gray-900 focus:outline-none focus:bg-gray-100 focus:text-gray-900" role="menuitem">Kategoriler</p>
                  <p onClick={() => setMenu({show: false, chosen: 'Üyeler'})} className="block cursor-pointer px-4 py-2 text-sm leading-5 text-gray-700 hover:bg-gray-100 hover:text-gray-900 focus:outline-none focus:bg-gray-100 focus:text-gray-900" role="menuitem">Üyeler</p>
                  <p onClick={() => setMenu({show: false, chosen: 'Görevler'})} className="block cursor-pointer px-4 py-2 text-sm leading-5 text-gray-700 hover:bg-gray-100 hover:text-gray-900 focus:outline-none focus:bg-gray-100 focus:text-gray-900" role="menuitem">Görevler</p>
                </div>
              </div>
            </div>
          }
        </div>
        <div className="flex flex-wrap mx-auto w-2/3">
          {props.categories.length && props.categories.map(category => <Card key={category.id} data={category}/>)}
        </div>
      </div>
    </div>
  )
}

export default Discover;
