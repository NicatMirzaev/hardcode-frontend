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
      level
      likes {
        id
        name
        image
        views
        likes
      }
      exp
      requiredExp
      createdAt
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
    level
    exp
    likes {
      id
      name
      image
      views
      likes
    }
    requiredExp
    createdAt
  }
}`

export const GET_CATEGORIES = `query getCategories {
  getCategories {
    id
    name
    image
    views
    likes
    isLiked
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

export const UPDATE_PROFILE = `mutation updateProfile($currentPassword: String!, $newPassword: String!, $Linkedin: String!, $gitHub: String!, $twitter: String!, $img: String!, $username: String!) {
  updateProfile(currentPassword: $currentPassword, newPassword: $newPassword, LinkedinURL: $Linkedin, GitHubURL: $gitHub, TwitterURL: $twitter, ProfileImg: $img, username: $username) {
      id
      username
      email
      isConfirmed
      profileImg
      twitterURL
      GitHubURL
      LinkedinURL
      level
      exp
      likes {
        id
        name
        image
        views
        likes
      }
      requiredExp
      createdAt
  }
}`;

export const LIKE_CATEGORY = `mutation likeCategory($categoryId: String!) {
  likeCategory(categoryId: $categoryId) {
    id
    name
    image
    views
    likes
    isLiked
  }
}`;
