
const onCheckState = () => {
  
  const db = firebase.firestore();
  firebase.auth().onAuthStateChanged(user => {
    db.collection('users').doc(user.uid).get().then(doc => {
      const { firstName, lastName, birthDay, biography } = doc.data()
      console.log(firstName, 'first name')
      document.getElementById('firstName').value = firstName;
      document.getElementById('lastName').value = lastName;
      document.getElementById('birthDay').value = birthDay;
      document.getElementById('biography').value = biography
    })
  })
}


const onUpdateUserDetail = () => {
  const db = firebase.firestore();
  const user = firebase.auth().currentUser;
  
  const biography = document.getElementById('biography').value;
  const lastName = document.getElementById('lastName').value;
  const birthDay = document.getElementById('birthDay').value;
  const firstName = document.getElementById('firstName').value;
  
  db.collection('users').doc(user.uid).set({
    biography,
    firstName,
    lastName,
    birthDay
  }).then(() => {
    window.location.href = '../user-detail'
  })
}



const main = () => {
  console.log('file loaded')
  onCheckState()
  const saveButton = document.getElementById('button');
  saveButton.addEventListener('click', onUpdateUserDetail)
}

window.addEventListener('DOMContentLoaded', main)
