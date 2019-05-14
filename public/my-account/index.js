

const getUserInfo = () => {
  const user = firebase.auth().currentUser;
  console.log(user)
  const emailElement = document.getElementById('email');
  const nameElement = document.getElementById('name');
  
  if (user != null) {
    emailElement.innerHTML = user.email;
    nameElement.innerHTML = user.name
  }
}

const onCheckState = () => {
  firebase.auth().onAuthStateChanged(user => {
    console.log(user, 'user')
    if(!user) {
      window.location.replace('../login/login.html')
    } else {
      getUserInfo()
    }
  })
}

const onSignOutUser = () => {
  firebase.auth().signOut().then(() => {
    console.log('User signed out')
    window.location.replace('../login/login.html')
  }).catch(err => {
    console.log('Error: ', err)
  })
}

const onDeleteAccount = () => {
  const user = firebase.auth().currentUser;
  
  user.delete().then(() => {
    window.location.replace('../login/login.html')
  }).catch(err => {
    console.log('Error: ', err.message)
  })
}


const main = () => {
  onCheckState()
  
  const signOutButton = document.getElementById('signOutButton')
  signOutButton.addEventListener('click', onSignOutUser)
  
  const deleteAccountButton = document.getElementById('deleteAccount')
  deleteAccountButton.addEventListener('click', onDeleteAccount)
}

window.addEventListener('DOMContentLoaded', main)
