const onCheckState = () => {
  firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      console.log(user)
      console.log('User signed in ...')
      window.location.replace('./index.html')
    } else {
      console.log('User could not sign in')
    }
  })
}

const main = () => {
  const inputEmail = document.getElementById('email');
  const inputPassword = document.getElementById('password');
  const button = document.getElementById('button');
  
  const onLogin = () => {
    const email = inputEmail.value;
    const password = inputPassword.value;
    
    firebase.auth().signInWithEmailAndPassword(email, password)
      .then(() => {
        onCheckState()
      })
      .catch((err) => {
        console.log('Error: ', err.message)
      })
  }
  
  button.addEventListener('click', onLogin)
}

window.addEventListener('DOMContentLoaded', main)
