
const onHandlePost = () => {
  console.log('button clicked');
  const db = firebase.firestore();
  const tweetText = document.getElementById('inputTweet').value;
  
  firebase.auth().onAuthStateChanged(user => {
    db.collection('Tweets').doc(user.uid).set({
      tweetText
    })
  })
}


const onUpLoadPhoto = () => {
  console.log('Button clicked', event);
  image = event.target.files[0];
  const newImage = document.getElementById('newImage')
  newImage.src = URL.createObjectURL(event.target.files[0])
  newImage.style = 'width: 200px; height: 200px;';
}

const main = () => {
  console.log('File Loaded')
  
  const browsePhoto = document.getElementById('browsePhoto');
  browsePhoto.addEventListener('click', onUpLoadPhoto);
  
  const postButton = document.getElementById('postButton');
  postButton.addEventListener('click', onHandlePost)
};


window.addEventListener('DOMContentLoaded', main);
