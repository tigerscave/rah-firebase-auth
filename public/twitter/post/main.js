let image;



const onCreateTweetWithPhoto = () => {
  const storageRef = firebase.storage().ref();
  const imagesRef = storageRef.child(`images/${image.name}`);
  if (image) {
    imagesRef.put(image).then(snapshot => {
      snapshot.ref.getDownloadURL().then(imageUrl => {
        onHandleTweetPost(imageUrl);
      })
    })
  }
}

const onHandleTweetPost = imageUrl => {
  console.log('button clicked');
  const db = firebase.firestore();
  const tweetText = document.getElementById('inputTweet').value;
  
  const date = firebase.firestore.Timestamp
  firebase.auth().onAuthStateChanged(user => {
    db.collection('Tweets').doc().set({
      tweetText,
      image: imageUrl ? imageUrl : '',
      userId: user.uid,
      createdAt: date.fromDate(new Date())
    })
  })
}



const onUpLoadPhoto = event => {
  console.log('Button clicked', event);
  image = event.target.files[0];
  const imageElement = document.getElementById('imageElement')
  imageElement.src = URL.createObjectURL(event.target.files[0])
  imageElement.style = 'width: 200px; height: 200px;';
}

const main = () => {
  console.log('File Loaded')
  
  const browsImage = document.getElementById('browsImage');
  browsImage.addEventListener('click', onUpLoadPhoto);
  
  const postButton = document.getElementById('postButton');
  postButton.addEventListener('click', onCreateTweetWithPhoto)
};


window.addEventListener('DOMContentLoaded', main);
