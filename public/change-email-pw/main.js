
const getUserInfo = () => {
  const user = firebase.auth().currentUser;
  console.log('This is user', user)
  document.getElementById('currentEmail').innerHTML = user.email;
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

const onClickedSaveButton = () => {
  const user = firebase.auth().currentUser;
  
  const newEmail = document.getElementById('email').value;
  console.log("Email---", newEmail)
  email && (
    user.updateEmail(newEmail).then(() => {
      window.location.href = '../my-account'
    }).catch(() => {
      firebase.auth().signOut()
        .then((res) => {
          alert("user logged out");
          window.location.replace("../login/login.html");
          console.log(res);
        })
        .catch((err) => {
          alert("Failed to logout !")
          console.log(err);
        })
    })
  );
  
  const newPassword = document.getElementById('password').value;
  console.log("Password---", newPassword)
  password && (
    user.updatePassword(newPassword).then(() => {
      window.location.href = '../my-account'
    }).catch(() => {
      firebase.auth().signOut()
        .then((res) => {
          alert("user logged out");
          window.location.replace("../login/login.html");
          console.log(res);
        })
        .catch((err) => {
          alert("Failed to logout !")
          console.log(err);
        })
    })
  )
}

const main = () => {
  onCheckState()
  
  const saveButton = document.getElementById('button')
  saveButton.addEventListener('click', onClickedSaveButton)
};


window.addEventListener('DOMContentLoaded', main)
