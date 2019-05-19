
const onUpdateUserDetail = () => {
  const db = firebase.firestore();
  const user = firebase.auth().currentUser;
  
  const biography = document.getElementById('biography').value;
  const lastName = document.getElementById('lastName').value;
  const birthDay = document.getElementById('birthDay').value;
  
  db.collection('users').doc(user.uid).set({
    biography,
    lastName,
    birthDay
  }).then(() => {
    window.location.href = '../user-detail'
    
  })
}



const main = () => {
  console.log('file loaded')
  
  const saveButton = document.getElementById('button');
  saveButton.addEventListener('click', onUpdateUserDetail)
}

window.addEventListener('DOMContentLoaded', main)
