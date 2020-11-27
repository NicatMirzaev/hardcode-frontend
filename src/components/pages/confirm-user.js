import React from 'react';
import { CONFIRM_USER } from '../../lib/queries.js';
import settings from '../../lib/settings.js';
import SuccessIcon from '../../icons/check.svg';
import ErrorIcon from '../../icons/cancel.svg';

const ConfirmUser = props => {
  const { match: { params }} = props;
  const [state, setState] = React.useState({loading: true, error: false})

  React.useEffect(() => {
    const token = params.token;
    fetch(settings.apiURL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify({
        query: CONFIRM_USER,
        variables: { token },
      })
  }).then(r => r.json())
    .then(data => {
      if(data.errors){
        setState({loading: false, error: true})
      }
      else{
        setState({loading: false, error: false})
      }
    });

  }, [params])

  if(state.loading === true){
    return (
      <div>
        <div className="w-full mt-16 flex justify-center">
          <span className="text-green-500 opacity-75 top-1/2 my-0 block relative w-0 h-0 mb-24 mr-24" style={{top: '50%'}}>
            <i className="fas fa-circle-notch fa-spin fa-5x"></i>
          </span>
        </div>
        <div className="flex justify-center">
          <h4>Hesabınız onaylanıyor..</h4>
        </div>
      </div>
    )
  }
  else{
    if(state.error === true){
      return (
        <div>
          <div className="w-full mb-6 mt-16 flex justify-center">
            <img src={ErrorIcon}/>
          </div>
          <div className="flex justify-center">
            <h4 className="font-bold text-red-600">Hesabınız onaylanamadı!</h4>
          </div>
        </div>
      )
    }
    else{
      return (
        <div>
          <div className="w-full mb-6 mt-16 flex justify-center">
            <img src={SuccessIcon}/>
          </div>
          <div className="flex justify-center">
            <h4 className="font-bold text-green-600">Hesabınız onaylandı!</h4>
          </div>
        </div>
      )
    }
  }
}

export default ConfirmUser;
