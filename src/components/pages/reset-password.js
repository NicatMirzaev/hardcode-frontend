import React from 'react';
import settings from '../../lib/settings';
import { RESET_PASSWORD } from '../../lib/queries';

const ResetPassword = props => {
  const [password, setPassword] = React.useState('');
  const [passwordAgain, setPasswordAgain] = React.useState('');
  const [message, setMessage] = React.useState({type: 0, msg: ''});
  const token = props.match.params.token;

  const handleClick = () => {
    if(password !== passwordAgain) return setMessage({type: 1, msg: 'Şifre tekrarı hatalı.'})
    fetch(settings.apiURL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify({
        query: RESET_PASSWORD,
        variables: { token: token, newPassword: password, type: 1},
      })
    }).then(r => r.json())
    .then(data => {
      if(data.errors) {
        setMessage({type: 1, msg: data.errors[0].message})
      }
      else {
        setMessage({type: 2, msg: 'Şifreniz değiştirildi.'})
        setTimeout(() => props.history.push('/'), 1000);
      }
    })
  }
  return (
    <div className="flex mt-16 flex-col items-center">
      <h2 className="text-4xl tracking-tight mb-12 leading-10 font-extrabold text-gray-900 sm:text-3xl sm:leading-none">Şifre Değiştirme</h2>
      <input type="password" className="shadow appearance-none border w-full sm:w-1/3 rounded py-2 px-3 text-grey-darker" placeholder="Yeni Şifre" value={password} onChange={e => setPassword(e.target.value)}/>
      <input type="password" className="shadow appearance-none border w-full sm:w-1/3 rounded py-2 px-3 mt-6 text-grey-darker" placeholder="Yeni Şifre Tekrar" value={passwordAgain} onChange={e => setPasswordAgain(e.target.value)}/>
      {message.type === 1 ?
        <span className="text-sm mt-6 text-red-500">
          {message.msg}
        </span>
        :
        <span className="text-sm mt-6 text-green-500">
          {message.msg}
        </span>
      }
      <p onClick={handleClick} className="mt-12 w-full cursor-pointer sm:w-1/3 px-8 py-3 border border-transparent text-base leading-6 font-medium text-center rounded-md text-white bg-indigo-600 hover:bg-indigo-500 focus:outline-none focus:border-indigo-700 focus:shadow-outline-indigo transition duration-150 ease-in-out md:py-4 md:text-lg md:px-10">
        Şifreyi Değiştir!
      </p>
    </div>
  )
}

export default ResetPassword;
