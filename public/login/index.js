const onCheckState = () => {
  firebase.auth().onAuthStateChanged((user) => {
    console.log(user)
    if (user) {
      console.log(user)
      console.log('User signed in ...')
      window.location.href = "../my-account/index.html";
    } else {
      console.log('User could not sign in')
    }
  })
}

const main = () => {
  onCheckState()
  const inputEmail = document.getElementById('email');
  const inputPassword = document.getElementById('password');
  const button = document.getElementById('button');
  
  const onLogin = () => {
    const email = inputEmail.value;
    const password = inputPassword.value;
    
    firebase.auth().signInWithEmailAndPassword(email, password)
      .then(() => {
        //onCheckState()
        alert("user login!")
     //   window.location.replace('./index.html')
      })
      .catch((err) => {
        console.log('Error: ', err.message)
        alert('No user with this Email or Password')
      })
  }
  
  button.addEventListener('click', onLogin)
}

window.addEventListener('DOMContentLoaded', main)
