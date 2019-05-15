
const onUpdateProfile = () => {
  const user = firebase.auth().currentUser;
  
  const name = document.getElementById('name').value;
  const photoUrl = document.getElementById('photoUrl').value;
  
  user.updateProfile({
    displayName: name,
    photoURL: photoUrl
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
