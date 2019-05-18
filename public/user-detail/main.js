
// const onUpdateUserDetail = () => {
// }


const onCheckState = () => {
  const db = firebase.firestore();
  const biography = document.getElementById('biography');
  
  firebase.auth().onAuthStateChanged(user => {
    console.log(user, 'user')
    if(user) {
      db.collection('users').doc(user.uid).get().then(doc => {
        console.log(doc.data())
      })
    } else {
      window.location.replace('../login/login.html')
  
    }
  })
}

const onHogeClicked = () => {
  console.log("hoge")
  const db = firebase.firestore();
  const user = firebase.auth().currentUser;
  console.log(user.uid);
  
  db.collection('users').doc(user.uid).set({
    firstName: "hoge",
    secondName: "rah"
  }).then((res) => {
    console.log(res)
  })
}

const main = () => {
  console.log('file loaded')
  onCheckState();
  
  const editDetail = document.getElementById('button');
  editDetail.addEventListener('click', () => {
    window.location.href = '../user-edit-detail'
  })
  document.getElementById('hoge').addEventListener('click', onHogeClicked)
}

window.addEventListener('DOMContentLoaded', main)
