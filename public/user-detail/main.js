
// const onUpdateUserDetail = () => {
// }


const onCheckState = () => {
  const db = firebase.firestore();
  const biography = document.getElementById('biography');
  const displayName = document.getElementById('displayName');
  const firstNameElement = document.getElementById('firstName')
  const lastNameElement = document.getElementById('lastName');
  const birthDayElement = document.getElementById('birthDay');
  
  firebase.auth().onAuthStateChanged(user => {
    console.log(user, 'user')
    if(user) {
      displayName.innerHTML = user.displayName;
      
      db.collection('users').doc(user.uid).get().then(doc => {
        console.log(doc.data())
        const userDetail = doc.data();
        firstNameElement.innerHTML = userDetail.firstName;
        lastNameElement.innerHTML = userDetail.lastName
        birthDayElement.innerHTML = userDetail.birthDay;
        biography.innerHTML = userDetail.biography;
      })
    } else {
      window.location.replace('../login/login.html')
  
    }
  })
}


const main = () => {
  console.log('file loaded')
  onCheckState();
  
  const editDetail = document.getElementById('button');
  editDetail.addEventListener('click', () => {
    window.location.href = '../user-edit-detail'
  })
}

window.addEventListener('DOMContentLoaded', main)
