const main = () => {
  console.log('main loaded')
  const inputEmail = document.getElementById('email');
  const inputPassword = document.getElementById('password');
  const button = document.getElementById('button');
  
  const onSignUp = () => {
    console.log(firebase)
    const email = inputEmail.value;
    const password = inputPassword.value;
    console.log(email, password, 'email and password');
    
    firebase.auth().createUserWithEmailAndPassword(email, password)
      .then(res => {
        console.log('login')
        window.location.replace('../login');
      })
      .catch(err => {
        console.log('error: ', err.message)
    })
  }
  
  button.addEventListener('click', onSignUp)
}


window.addEventListener('DOMContentLoaded', main)
