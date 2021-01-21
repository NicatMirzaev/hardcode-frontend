import React from 'react';
import Header from '../ui/landing/header';
import Hero from '../ui/landing/hero';
import Features from '../ui/landing/features.js';
import Footer from '../ui/landing/footer.js';
import Popup from '../ui/popup.js';
import settings from '../../lib/settings.js';
import { REGISTER_USER, LOGIN_USER, FORGOT_PASSWORD, SUBSCRIBE_EMAIL } from '../../lib/queries.js';

const Home = props => {
  const [popup, setPopup] = React.useState({type: 2, show: false});
  const [state, setState] = React.useState({disabled: false, error: ''});
  const [username, setUsername] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');

  const onClickGetStarted = e => {
    e.preventDefault();
    setUsername('');
    setEmail('');
    setPassword('');
    setState({disabled: false, error: ''})
    setPopup({type: 2, show: !popup.show});
  }

  const onClickSubscribe = e => {
    e.preventDefault();
    setUsername('');
    setEmail('');
    setPassword('');
    setState({disabled: false, error: ''})
    setPopup({type: 5, show: true})
  }

  const onClickSubscribePopup = () => {
    fetch(settings.apiURL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify({
        query: SUBSCRIBE_EMAIL,
        variables: { email },
      })
    }).then(r => r.json())
    .then(data => {
      if(data.errors) {
        setState({disabled: false, error: data.errors[0].message})
      }
      else {
        setPopup({type: 6, show: true})
      }
    })
  }
  const onClickRegister = e => {
    e.preventDefault();
    setState({disabled: true, error: ''});
    fetch(settings.apiURL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify({
        query: REGISTER_USER,
        variables: { username, email, password },
      })
  }).then(r => r.json())
    .then(data => {
      if(data.errors){
        setState({disabled: false, error: data.errors[0].message})
      }
      else{
        setPopup({type: 3, show: true})
      }
    });
  }

  const onClickLogin = e => {
    e.preventDefault();
    setState({disabled: true, error: ''});
    fetch(settings.apiURL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify({
        query: LOGIN_USER,
        variables: { email, password},
      })
    }).then(r => r.json())
    .then(data => {
      if(data.errors){
        setState({disabled: false, error: data.errors[0].message})
      }
      else{
        const userData = data.data.loginUser;
        if(userData.user.isConfirmed === false){
          setPopup({type: 3, show: true})
        }
        else {
          props.setUser({isLogged: true, isLoading: false, data: {token: userData.token, user: userData.user}})
          props.history.push('/dashboard')
        }
      }
    })
  }

  const onClickForgotPassword = () => {
      if(!email.length) return setState({disabled: false, error: 'Please enter your email address.'});
      fetch(settings.apiURL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify({
          query: FORGOT_PASSWORD,
          variables: { email }
        })
      }).then(r => r.json())
      .then(data => {
        if(data.errors){
          setState({disabled: false, error: data.errors[0].message})
        }
        else {
          setPopup({type: 4, show: true})
        }
      })
  }

  const showPopup = () => {
    if(popup.show === false) return null;
    if(popup.type == 1){
      return (
        <Popup>
          <div className="flex justify-end pb-3">
            <div onClick={() => setPopup({type: 2, show: false})} className="modal-close cursor-pointer z-50">
              <svg className="fill-current text-black" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18">
                <path d="M14.53 4.53l-1.06-1.06L9 7.94 4.53 3.47 3.47 4.53 7.94 9l-4.47 4.47 1.06 1.06L9 10.06l4.47 4.47 1.06-1.06L10.06 9z"></path>
              </svg>
            </div>
          </div>
          <div className="flex justify-center"><h2 className="text-4x1 font-bold">Sign up</h2></div>
          <form className={`pt-6 pb-2 my-2 ${state.disabled === true ? "pointer-events-none" : ""}`}>
            <div className="mb-4">
              <label className="block text-sm font-bold mb-2" htmlFor="username">
                Username
              </label>
              <input className="shadow appearance-none border rounded w-full py-2 px-3 text-grey-darker" id="username" type="text" value={username} onChange={e => setUsername(e.target.value)} placeholder="Username"/>
            </div>
            <div className="mb-4">
              <label className="block text-sm font-bold mb-2" htmlFor="email">
                Email Address
              </label>
              <input className="shadow appearance-none border rounded w-full py-2 px-3 text-grey-darker" id="email" type="text" value={email} onChange={e => setEmail(e.target.value)} placeholder="Email Address"/>
            </div>
            <div className="mb-6">
              <label className="block text-sm font-bold mb-2" htmlFor="password">
                Password
              </label>
              <input className="shadow appearance-none border rounded w-full py-2 px-3 text-grey-darker mb-3" id="password" type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Password"/>
            </div>
            {state.error.length > 0 &&
              <div className="mb-3">
                <span className="text-sm text-red-500">
                  {state.error}
                </span>
              </div>
            }
            <a href="/" onClick={e => onClickRegister(e)} className="whitespace-no-wrap inline-flex items-center justify-center px-4 py-2 border border-transparent text-base leading-6 font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-500 focus:outline-none focus:border-indigo-700 focus:shadow-outline-indigo active:bg-indigo-700 transition ease-in-out duration-150 w-full">
              Sign up
            </a>
            <p className="mt-2 text-sm leading-6 text-gray-500 mb-6">
              By registering, you agree to the <span className="text-blue-500 cursor-pointer">terms of use</span> and <span className="text-blue-500 cursor-pointer">privacy policy</span>
            </p>
            <div className="flex justify-center bg-gray-200">
              <p className="text-base leading-6">
                Do you have a account? <span onClick={() => setPopup({type: 2, show: true})} className="text-blue-500 cursor-pointer">Log in!</span>
              </p>
            </div>
          </form>
        </Popup>
      )
    }
    else if(popup.type == 2){
      return (
        <Popup>
          <div className="flex justify-end pb-3">
            <div onClick={() => setPopup({type: 2, show: false})} className="modal-close cursor-pointer z-50">
              <svg className="fill-current text-black" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18">
                <path d="M14.53 4.53l-1.06-1.06L9 7.94 4.53 3.47 3.47 4.53 7.94 9l-4.47 4.47 1.06 1.06L9 10.06l4.47 4.47 1.06-1.06L10.06 9z"></path>
              </svg>
            </div>
          </div>
          <div className="flex justify-center"><h2 className="text-4x1 font-bold">Login</h2></div>
          <form className={`pt-6 pb-2 my-2 ${state.disabled === true ? "pointer-events-none" : ""}`}>
           <div className="mb-4">
             <label className="block text-sm font-bold mb-2" htmlFor="email">
               Email Address
             </label>
             <input className="shadow appearance-none border rounded w-full py-2 px-3 text-grey-darker" id="email" value={email} onChange={e => setEmail(e.target.value)} type="text" placeholder="Email Address"/>
           </div>
           <div className="mb-6">
             <label className="block text-sm font-bold mb-2" htmlFor="password">
               Password
             </label>
             <input className="shadow appearance-none border rounded w-full py-2 px-3 text-grey-darker mb-3" id="password" value={password} onChange={e => setPassword(e.target.value)} type="password" placeholder="Password"/>
           </div>
           {state.error.length > 0 &&
             <div className="mb-3">
               <span className="text-sm text-red-500">
                 {state.error}
               </span>
             </div>
           }
           <a href="/" onClick={e => onClickLogin(e)} className="whitespace-no-wrap inline-flex items-center justify-center px-4 py-2 border border-transparent text-base leading-6 font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-500 focus:outline-none focus:border-indigo-700 focus:shadow-outline-indigo active:bg-indigo-700 transition ease-in-out duration-150 w-full">
             Login
           </a>
           <p onClick={onClickForgotPassword} className="mt-2 leading-6 text-blue-500 mb-6 cursor-pointer">
             Forgot your password?
           </p>
           <div className="flex justify-center bg-gray-200">
             <p className="text-base leading-6">
               Don't have an account? <span onClick={() => setPopup({type: 1, show: true})} className="text-blue-500 cursor-pointer">Sign up!</span>
             </p>
           </div>
         </form>
        </Popup>
      )
    }
    else if(popup.type == 3){
      return (
        <Popup>
          <div className="flex justify-end pb-3">
            <div onClick={() => setPopup({type: 2, show: false})} className="modal-close cursor-pointer z-50">
              <svg className="fill-current text-black" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18">
                <path d="M14.53 4.53l-1.06-1.06L9 7.94 4.53 3.47 3.47 4.53 7.94 9l-4.47 4.47 1.06 1.06L9 10.06l4.47 4.47 1.06-1.06L10.06 9z"></path>
              </svg>
            </div>
          </div>
          <div className="flex justify-center mb-3"><h2 className="text-4x1 font-bold">One last step!</h2></div>
          <p className="text-base leading-6">
            An email containing an activation link was sent to the <span className="font-bold">{email} </span> email address. You need to confirm your account to use your account
          </p>
        </Popup>
      )
    }
    else if(popup.type == 4) {
      return (
        <Popup>
          <div className="flex justify-end pb-3">
            <div onClick={() => setPopup({type: 2, show: false})} className="modal-close cursor-pointer z-50">
              <svg className="fill-current text-black" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18">
                <path d="M14.53 4.53l-1.06-1.06L9 7.94 4.53 3.47 3.47 4.53 7.94 9l-4.47 4.47 1.06 1.06L9 10.06l4.47 4.47 1.06-1.06L10.06 9z"></path>
              </svg>
            </div>
          </div>
          <div className="flex justify-center mb-3"><h2 className="text-4x1 font-bold">Change Password</h2></div>
          <p className="text-base leading-6">
            An email was sent to the <span className="font-bold">{email} </span> email address with a password change confirmation. You must give your consent to change your password.
          </p>
        </Popup>
      )
    }
    else if(popup.type == 5) {
      return (
        <Popup>
          <div className="flex justify-end pb-3">
            <div onClick={() => setPopup({type: 2, show: false})} className="modal-close cursor-pointer z-50">
              <svg className="fill-current text-black" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18">
                <path d="M14.53 4.53l-1.06-1.06L9 7.94 4.53 3.47 3.47 4.53 7.94 9l-4.47 4.47 1.06 1.06L9 10.06l4.47 4.47 1.06-1.06L10.06 9z"></path>
              </svg>
            </div>
          </div>
          <div className="flex justify-center mb-3"><h2 className="text-4x1 font-bold">Subscribe!</h2></div>
          <p className="text-base leading-6 mb-3">
            You should write your e-mail address below to be informed about news by subscribing for free. E-mail addresses are kept completely confidential, you can unsubscribe at any time.
          </p>
          {state.error.length > 0 && <p className="text-sm text-red-500">{state.error}</p>}
          <input className="mb-6 shadow appearance-none border rounded w-full py-2 px-3 text-grey-darker" id="email" value={email} onChange={e => setEmail(e.target.value)} type="text" placeholder="Email Address"/>
          <p onClick={onClickSubscribePopup} className="whitespace-no-wrap cursor-pointer inline-flex w-full items-center justify-center px-4 py-2 border border-transparent text-base leading-6 font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-500 focus:outline-none focus:border-indigo-700 focus:shadow-outline-indigo active:bg-indigo-700 transition ease-in-out duration-150">
            Subscribe
          </p>
        </Popup>
      )
    }
    else if(popup.type == 6) {
      return (
        <Popup>
          <div className="flex justify-end pb-3">
            <div onClick={() => setPopup({type: 2, show: false})} className="modal-close cursor-pointer z-50">
              <svg className="fill-current text-black" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18">
                <path d="M14.53 4.53l-1.06-1.06L9 7.94 4.53 3.47 3.47 4.53 7.94 9l-4.47 4.47 1.06 1.06L9 10.06l4.47 4.47 1.06-1.06L10.06 9z"></path>
              </svg>
            </div>
          </div>
          <div className="flex justify-center mb-3"><h2 className="text-4x1 font-bold">Teşekkürler!</h2></div>
          <p className="text-base leading-6">
            E-mail address has been successfully registered in the system. You will now be aware of the news, you can unsubscribe whenever you want.
          </p>
        </Popup>
      )
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
  if(props.user.isLogged === true) {
    setTimeout(() => props.history.push('/dashboard'), 250);
    return null;
  }
  return (
    <div>
      <Header onClickGetStarted={onClickGetStarted} onClickSubscribe={onClickSubscribe}/>
      <Hero onClickGetStarted={onClickGetStarted} onClickSubscribe={onClickSubscribe}/>
      <Features/>
      <Footer/>
      {showPopup()}
    </div>
  )
}

export default Home;
