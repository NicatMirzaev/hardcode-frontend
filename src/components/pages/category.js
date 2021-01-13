import React from 'react';
import Navbar from '../../redux/containers/navbar';
import TaskCard from '../ui/task-card';
import EyeIcon from '../../icons/eye.svg';
import HeartIcon from '../../icons/heart.svg';
import HeartRedIcon from '../../icons/heart_red.svg';
import { abbreviateNumber } from '../../lib/utils';
import settings from '../../lib/settings';
import { getValue } from '../../lib/store.js';
import { LIKE_CATEGORY, FETCH_TASKS, USER_DETAILS } from '../../lib/queries';

const Category = props => {
  const [data, setData] = React.useState({});
  const [filteredTasks, setFilteredTasks] = React.useState({});
  const [checkbox, setCheckbox] = React.useState({cb1: false, cb2: false, cb3: false, cb4: false, cb5: false})
  const { match: { params }} = props;

  React.useEffect(() => {
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
          query: FETCH_TASKS,
          variables: {categoryId: params.id}
        })
      }).then(r => r.json())
      .then(data => {
        if(data.errors === undefined) {
          setData(data.data.getTasks);
          setFilteredTasks(data.data.getTasks.tasks);
        }
        else {
          console.log(data.errors);
        }
      })
    }
  }, [props])

  const onClickLike = async () => {
    const value = getValue('token');
    if(value) {

      let response = await fetch(settings.apiURL, {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'Authorization': 'Bearer ' + value
        },
        body: JSON.stringify({
          query: LIKE_CATEGORY,
          variables: { categoryId: data.category.id }
        })
      });
      response = await response.json();
      setData({category: response.data.likeCategory, tasks: data.tasks})

      fetch(settings.apiURL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'Authorization': 'Bearer ' + value
        },
        body: JSON.stringify({
          query: USER_DETAILS
        })
    }).then(r => r.json())
      .then(data => {
        if(data.data) {
          const userData = data.data.me;
          if(userData)
          {
            if(userData.isConfirmed === true){
              props.setUser({isLogged: true, isLoading: false, data: {token: value, user: userData}})
            }
          }
          else props.setUser({isLogged: false, isLoading: false})
        }
        else {
          props.setUser({isLogged: false, isLoading: false})
        }
      });

    }
  }
  const handleCheckbox = id => {
    let checkboxStates = {};
    switch(id) {
      case 1: {
        setCheckbox({cb1: !checkbox.cb1, cb2: false, cb3: checkbox.cb3, cb4: checkbox.cb4, cb5: checkbox.cb5})
        checkboxStates = {cb1: !checkbox.cb1, cb2: false, cb3: checkbox.cb3, cb4: checkbox.cb4, cb5: checkbox.cb5}
        break;
      }
      case 2: {
        setCheckbox({cb1: false, cb2: !checkbox.cb2, cb3: checkbox.cb3, cb4: checkbox.cb4, cb5: checkbox.cb5})
        checkboxStates = {cb1: false, cb2: !checkbox.cb2, cb3: checkbox.cb3, cb4: checkbox.cb4, cb5: checkbox.cb5}
        break;
      }
      case 3: {
        setCheckbox({cb1: checkbox.cb1, cb2: checkbox.cb2, cb3: !checkbox.cb3, cb4: false, cb5: false})
        checkboxStates = {cb1: checkbox.cb1, cb2: checkbox.cb2, cb3: !checkbox.cb3, cb4: false, cb5: false}
        break;
      }
      case 4: {
        setCheckbox({cb1: checkbox.cb1, cb2: checkbox.cb2, cb3: false, cb4: !checkbox.cb4, cb5: false})
        checkboxStates = {cb1: checkbox.cb1, cb2: checkbox.cb2, cb3: false, cb4: !checkbox.cb4, cb5: false}
        break;
      }
      case 5: {
        setCheckbox({cb1: checkbox.cb1, cb2: checkbox.cb2, cb3: false, cb4: false, cb5: !checkbox.cb5})
        checkboxStates = {cb1: checkbox.cb1, cb2: checkbox.cb2, cb3: false, cb4: false, cb5: !checkbox.cb5}
        break;
      }
    }
    let filteredTasks = [];
    if(checkboxStates.cb1 === false && checkboxStates.cb2 === false && checkboxStates.cb3 === false && checkboxStates.cb4 === false && checkboxStates.cb5 === false) {
      setFilteredTasks(data.tasks);
    }
    else {
      const mustSolved = checkboxStates.cb1;
      const mustUnsolved = checkboxStates.cb2;
      let difficulty = "any";
      if(checkboxStates.cb3 === true) difficulty = "Kolay";
      else if(checkboxStates.cb4 === true) difficulty = "Orta";
      else if(checkboxStates.cb5 === true) difficulty = "Zor";
      for(let i = 0; i < data.tasks.length; i++) {
        if(mustSolved === true) {
          if(data.tasks[i].isSolved === true) {
            if(difficulty === "any"){
                filteredTasks.push(data.tasks[i]);
                continue;
            }
            else {
              if(data.tasks[i].difficulty === difficulty) {
                filteredTasks.push(data.tasks[i]);
                continue;
              }
              else continue;
            }
          }
          else continue;
        }
        if(mustUnsolved === true) {
          if(data.tasks[i].isSolved === false) {
            if(difficulty === "any"){
              filteredTasks.push(data.tasks[i]);
              continue;
            }
            else {
              if(data.tasks[i].difficulty === difficulty){
                filteredTasks.push(data.tasks[i]);
                continue;
              }
              else continue;
            }
          }
          else continue;
        }
        if(data.tasks[i].difficulty === difficulty){
          filteredTasks.push(data.tasks[i]);
          continue;
        }
      }
      setFilteredTasks(filteredTasks);
    }
  }

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

  if(data.category === undefined) {
    return (
      <div className="w-full h-full flex justify-center">
        <span className="text-green-500 opacity-75 top-1/2 my-0 block relative w-0 h-0 mb-24 mr-24" style={{top: '50%'}}>
          <i className="fas fa-circle-notch fa-spin fa-5x"></i>
        </span>
      </div>
    )
  }
  return (
    <div className="flex w-full h-full">
      <div className="flex md:w-1/5 sm:w-1/4 w-1/3">
        <Navbar history={props.history}/>
      </div>
      <div className="flex flex-col w-full h-full">
        <div className="flex flex-col mt-12 mb-6">
          <h2 className="text-xl text-center tracking-tight sm:mx-auto leading-10 mb-4 font-extrabold text-gray-900 sm:text-3xl sm:leading-none md:text-4xl">{data.category.name}</h2>
          <div className="flex mx-auto items-center mb-6">
            <img className="mr-2" src={EyeIcon}/>
            <p className="text-sm leading-6 mr-4 text-gray-500">{abbreviateNumber(data.category.views)} görüntüleme</p>
            {data.category.isLiked === true ? <img onClick={onClickLike} className="mr-2 cursor-pointer" src={HeartRedIcon}/> : <img onClick={onClickLike} className="mr-2 cursor-pointer" src={HeartIcon}/>}
            <p className="text-sm leading-6 text-gray-500">{abbreviateNumber(data.category.likes)} beğeni</p>
          </div>
          <div className="sm:flex hidden flex-wrap mx-auto items-center">
            <input onChange={() => handleCheckbox(1)} checked={checkbox.cb1} style={{width: '20px', height: '16px', marginRight: '2px'}} type="checkbox"/>
            <span className="text-sm mr-4">Çözülen</span>
            <input onChange={() => handleCheckbox(2)} checked={checkbox.cb2} style={{width: '20px', height: '16px', marginRight: '2px'}} type="checkbox"/>
            <span className="text-sm mr-4">Çözülmeyen</span>
            <input onChange={() => handleCheckbox(3)} checked={checkbox.cb3} style={{width: '20px', height: '16px', marginRight: '2px'}} type="checkbox"/>
            <span className="text-sm mr-4">Kolay</span>
            <input onChange={() => handleCheckbox(4)} checked={checkbox.cb4} style={{width: '20px', height: '16px', marginRight: '2px'}} type="checkbox"/>
            <span className="text-sm mr-4">Orta</span>
            <input onChange={() => handleCheckbox(5)} checked={checkbox.cb5} style={{width: '20px', height: '16px', marginRight: '2px'}} type="checkbox"/>
            <span className="text-sm mr-4">Zor</span>
          </div>
        </div>
        <div className="flex flex-col h-full w-11/12">
          {filteredTasks.length > 0 && filteredTasks.map(task => <TaskCard key={task.id} data={task} categoryName={data.category.name} history={props.history}/>)}
        </div>
      </div>
    </div>
  )
}

export default Category;
