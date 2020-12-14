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
      profileImg
      twitterURL
      GitHubURL
      LinkedinURL
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
    profileImg
    twitterURL
    GitHubURL
    LinkedinURL
  }
}`

export const FORGOT_PASSWORD = `mutation sendResetPasswordConfirmation($email: String!) {
  sendResetPasswordConfirmation(email: $email)
}`;

export const RESET_PASSWORD = `mutation resetPassword($token: String!, $newPassword: String!, $type: Int!) {
  resetPassword(token: $token, newPassword: $newPassword, type: $type)
}`;

export const SUBSCRIBE_EMAIL = `mutation subscribeEmail($email: String!) {
  subscribeEmail(email: $email)
}`;
