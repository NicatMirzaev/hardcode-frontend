export const REGISTER_USER = `mutation registerUser($username: String!, $email: String!, $password: String!) {
  registerUser(username: $username, email: $email, password: $password){
    token
    user {
      id
    }
  }
}`;

export const LOGIN_USER = `mutation loginUser($email: String!, $password: String!) {
  loginUser(email: $email, password: $password){
    token
    user {
      id
      username
      email
      isConfirmed
    }
  }
}`;

export const CONFIRM_USER = `mutation confirmUser($token: String!) {
  confirmUser(token: $token){
    id
  }
}`;

export const USER_DETAILS = `query me {
  me {
    id
    username
    email
    isConfirmed
  }
}`
