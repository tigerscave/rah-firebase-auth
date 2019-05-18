
const onUpdateUserDetail = () => {
  const db = firebase.firestore();
  const user = firebase.auth().currentUser;
  
  const biography = document.getElementById('biography').value;
  
  db.collection('users').doc(user.uid).set({
    biography,
  }).then((res) => {
    console.log(res)
  })
}



const main = () => {
  console.log('file loaded')
  
  const saveButton = document.getElementById('button');
  saveButton.addEventListener('click', onUpdateUserDetail)
}

window.addEventListener('DOMContentLoaded', main)
