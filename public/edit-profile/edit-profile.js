
const onUpdateProfile = () => {
  const user = firebase.auth().currentUser;
  
  const displayName = document.getElementById('name').value;
  const photoURL = document.getElementById('photoUrl').value;
  
  user.updateProfile({
    displayName,
    photoURL
  }).then(() => {
    window.location.href = '../my-account'
  }).catch(err => {
    alert('Error: ', err.message)
  })
}

const main = () => {
  const saveButton = document.getElementById('button')
  saveButton.addEventListener('click', onUpdateProfile)
};


window.addEventListener('DOMContentLoaded', main)
