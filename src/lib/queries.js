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
        isLiked
      }
      exp
      requiredExp
      completedTasks
      createdAt
    }
  }
}`;

export const CONFIRM_USER = `mutation confirmUser($token: String!) {
  confirmUser(token: $token){
    id
  }
}`;

export const SOLVE_TASK = `mutation solveTask($id: String!, $language: Int!, $code: String!) {
  solveTask(id: $id, language: $language, code: $code){
    Result
    Warnings
    Errors
    isSuccess
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
      isLiked
    }
    requiredExp
    completedTasks
    createdAt
  }
}`

export const FETCH_USER = `query user($id: String!) {
  user(id: $id) {
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
      isLiked
    }
    requiredExp
    completedTasks
    createdAt
  }
}`

export const FETCH_ALL_USERS = `query getAllUsers {
  getAllUsers {
    id
    username
    profileImg
    twitterURL
    GitHubURL
    LinkedinURL
    level
    exp
    completedTasks
    createdAt
  }
}`

export const FETCH_LEADERBOARD = `query getLeaderboard {
  getLeaderboard {
    id
    username
    profileImg
    level
    exp
    createdAt
  }
}`

export const FETCH_TASKS = `query getTasks($categoryId: String!) {
  getTasks(categoryId: $categoryId) {
    category {
      id
      name
      image
      views
      likes
      isLiked
    }
    tasks {
      id
      categoryId
      name
      difficulty
      solvedCount
      isSolved
      step
    }
  }
}`

export const FETCH_ALL_TASKS = `query getAllTasks {
  getAllTasks {
      id
      categoryId
      categoryName
      name
      difficulty
      solvedCount
      isSolved
      step
  }
}`

export const FETCH_TASK = `query getTask($id: String!) {
  getTask(id: $id) {
    id
    categoryId
    name
    difficulty
    solvedCount
    step
    data {
      languages {
        python
        java
        javascript
        c_cpp
        csharp
      }
      content
    }
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
        isLiked
      }
      requiredExp
      completedTasks
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
