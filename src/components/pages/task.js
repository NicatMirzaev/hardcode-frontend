import React from 'react';
import Navbar from '../../redux/containers/navbar';
import ErrorIcon from '../../icons/cancel.svg';
import settings from '../../lib/settings.js';
import { FETCH_TASK, SOLVE_TASK, USER_DETAILS } from '../../lib/queries';
import { getValue } from '../../lib/store.js';
import ReactMarkdown from 'react-markdown';
import Editor from '../ui/editor.js';

const Task = props => {
  const [state, setState] = React.useState({loading: true, error: ''})
  const [compile, setCompile] = React.useState({loading: false, error: ''})
  const [data, setData] = React.useState({});
  const [code, setCode] = React.useState('');
  const [language, setLanguage] = React.useState('');
  const [menu, setMenu] = React.useState(false);
  const { match: { params }} = props;

  React.useEffect(() => {
    function handleClick(e){
      if(menu === true && e.target.localName !== "button" && e.target.outerText !== "Python" && e.target.outerText !== "Java" && e.target.outerText !== "C++" && e.target.outerText !== "C#" && e.target.outerText !== "NodeJS") {
        setMenu(false);
      }
    }
    window.addEventListener('mousedown', handleClick);

    if(data.data === undefined) {
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
            query: FETCH_TASK,
            variables: {id: params.id}
          })
        }).then(r => r.json())
        .then(data => {
          if(data.errors === undefined) {
            setData(data.data.getTask);
            const languages = data.data.getTask.data.languages;
            const defaultLanguage = Object.keys(languages)[0];
            setCode(languages[defaultLanguage]);
            setLanguage(defaultLanguage);
            setState({loading: false, error: ''});
          }
          else {
            setState({loading: false, error: data.errors[0].message})
          }
        })
      }
    }

    return () => {
      window.removeEventListener('mousedown', handleClick);
    }
  }, [props, menu])

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
        <div className="flex w-full h-full justify-center">
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
  const getDisplayLanguageName = lang => {
    let name = "";
    switch(lang) {
      case "python": {
        name = "Python";
        break
      }
      case "java": {
        name = "Java";
        break
      }
      case "c_cpp": {
        name = "C++";
        break
      }
      case "csharp": {
        name = "C#";
        break
      }
      case "javascript": {
        name = "NodeJS";
        break
      }
    }
    return name;
  }

  const getLanguageNumber = lang => {
    let number = 0;
    switch(lang) {
      case "python": {
        number = 24;
        break
      }
      case "java": {
        number = 4;
        break
      }
      case "c_cpp": {
        number = 28;
        break
      }
      case "csharp": {
        number = 1;
        break
      }
      case "javascript": {
        number = 23;
        break
      }
    }
    return number;
  }
  const runCode = async () => {
    const value = getValue('token');
    if(value) {
      setCompile({loading: true, error: ''});
      let response = await fetch(settings.apiURL, {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'Authorization': 'Bearer ' + value
        },
        body: JSON.stringify({
          query: SOLVE_TASK,
          variables: {id: params.id, language: getLanguageNumber(language), code: code}
        })
      })
      response = await response.json();
      if(response.errors === undefined) {
        setCompile({loading: false, error: '', data: response.data.solveTask})
      }
      else {
        setCompile({loading: false, error: response.errors[0].message})
      }

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

  const renderOutput = () => {
    if(compile.loading === true) {
      return (
        <div className="flex w-full justify-center">
          <span className="text-green-500 opacity-75 top-1/2 my-0 block relative w-0 h-0 mb-24 mr-24" style={{top: '50%'}}>
            <i className="fas fa-circle-notch fa-spin fa-5x"></i>
          </span>
        </div>
      )
    }
    else if(compile.error.length > 0) {
      return (
        <div className="flex w-full flex-col justify-center items-center">
          <img className="mb-6" src={ErrorIcon}/>
          <h4 className="font-bold text-red-600">{compile.error}</h4>
        </div>
      )
    }
    else if(compile.data !== undefined) {
      return (
        <div className="flex flex-col w-1/2 mb-6 shadow-lg border-2 rounded">
          {compile.data.map((data, index) => {
            if(data.isSuccess === false) {
              return (
                <div>
                  <h5 className="pl-6 pt-6 font-extrabold text-red-600">» Test {index + 1} başarısız!</h5>
                  <p className="pl-12 pr-2 pb-6 text-sm text-red-600">{data.Errors ? data.Errors : data.Result}</p>
                </div>
              )
            }
            else {
              return (
                <div>
                  <h5 className="pl-6 pt-6 font-extrabold text-green-600">» Test {index + 1} başarılı!</h5>
                  <p className="pl-12 pr-2 pb-6 text-sm text-green-600">{data.Result}</p>
                </div>
              )
            }
          })}
        </div>
      )
    }
  }
  return (
    <div className="flex w-full h-full">
      <div className="flex sm:w-1/5 w-1/3">
        <Navbar history={props.history}/>
      </div>
      <div className="flex flex-col items-center w-full h-full">
        <div className="w-1/2 mt-24 rounded shadow-lg mb-12">
          <ReactMarkdown className="p-4 markdown" children={data.data.content}/>
        </div>
        <div className="flex justify-center mb-16 items-center w-1/2">
          <span className="text-gray-500 font-bold mr-6">Dil</span>
          <button onClick={() => setMenu(!menu)} type="button" className="inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-indigo-500" id="options-menu" aria-haspopup="true" aria-expanded="true">
            {getDisplayLanguageName(language)}
            <svg className="-mr-1 ml-2 h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
              <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </button>
          {menu === true &&
            <div style={{top: '183px'}} className="absolute mt-2 w-56 rounded-md shadow-lg">
              <div className="rounded-md bg-white shadow-xs">
                <div className="py-1" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
                  {Object.keys(data.data.languages).map(lang => <p onClick={() => {setLanguage(lang); setMenu(false)}} key={lang} className="block cursor-pointer px-4 py-2 text-sm leading-5 text-gray-700 hover:bg-gray-100 hover:text-gray-900 focus:outline-none focus:bg-gray-100 focus:text-gray-900" role="menuitem">{getDisplayLanguageName(lang)}</p>)}
                </div>
              </div>
            </div>
          }
        </div>
        <Editor
          placeholder="Kodlarınızı buraya yazın.."
          mode={language}
          width="50%"
          theme="monokai"
          name="ace-editor"
          onChange={e => setCode(e)}
          fontSize={14}
          showPrintMargin={true}
          showGutter={true}
          highlightActiveLine={true}
          value={code}
          setOptions = {{
            showLineNumbers: true,
            tabSize: 2,
          }}
        />
        <p onClick={runCode} style={{borderRadius: '8rem'}} className="whitespace-no-wrap cursor-pointer inline-flex w-32 mb-6 mt-6 items-center justify-center px-4 py-2 border border-transparent text-base leading-6 font-medium text-white bg-indigo-600 hover:bg-indigo-500 focus:outline-none focus:border-indigo-700 focus:shadow-outline-indigo active:bg-indigo-700 transition ease-in-out duration-150">
          Çalıştır
        </p>
        
        {renderOutput()}
      </div>
    </div>
  )
}

export default Task;
