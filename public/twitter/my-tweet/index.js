
const onShowUserId = () => {
  const userId = firebase.auth().currentUser.uid
  console.log(userId)
}

const displayUserTweet = data => {
  const tweetList = document.getElementById('tweetList');
  data.map(d => {
    console.log(d.data().tweetText);
    const tweet = [d.data()];
    
    tweet.forEach(t => {
      console.log('Image url', t.image)
      const tweetElement = document.createElement('LI');
      
      const tweetTextElement = document.createElement('P')
      const tweetTextElementContent = document.createTextNode(t.tweetText)
      tweetTextElement.appendChild(tweetTextElementContent);
  
      const tweetImgElement = document.createElement('IMG');
      tweetImgElement.src = t.image;
      tweetImgElement.width = "200"
  
      tweetElement.appendChild(tweetTextElement)
      tweetElement.appendChild(tweetImgElement)
      
      tweetList.appendChild(tweetElement)
    })
  })
}

let lastVisible;

const pagination = isForward => {
  const user = firebase.auth().currentUser;
  const db = firebase.firestore();
  
  if (isForward) {
    db.collection('Tweets')
      .where("userId", "==", user.uid)
      .orderBy("createdAt", "desc")
      .startAfter(lastVisible)
      .limit(3)
      .get()
      .then(querySnapshot => {
        lastVisible = querySnapshot.docs[querySnapshot.docs.length - 1];
        displayUserTweet(querySnapshot.docs)
        console.log('old button clicked', lastVisible)
      })
  } else {
    db.collection('Tweets')
      .where("userId", "==", user.uid)
      .orderBy("createdAt", "desc")
      .endBefore(lastVisible)
      .limit(3)
      .get()
      .then(querySnapshot => {
        lastVisible = querySnapshot.docs[querySnapshot.docs.length - 1];
        displayUserTweet(querySnapshot.docs)
      })
  }
}

const onFetchUserTweets = user => {
  const db = firebase.firestore()
  db.collection('Tweets')
    .where("userId", "==", user.uid)
    .orderBy("createdAt", "desc")
    .limit(3)
    .get()
    .then(querySnapshot => {
      displayUserTweet(querySnapshot.docs);
      lastVisible = querySnapshot.docs[querySnapshot.docs.length - 1]
      console.log('new button clicked', lastVisible)
  })
}

const onCheckState = () => {
  firebase.auth().onAuthStateChanged(user => {
    if (user) {
      onFetchUserTweets(user)
    } else {
      window.location.replace('../../login/login.html')
    }
  })
}

const main = () => {
  onCheckState()
  
  const button = document.getElementById('button');
  button.addEventListener('click', onShowUserId)
  
  const newButton = document.getElementById('newer');
  newButton.addEventListener('click', () => pagination(true));
  
  const olderButton = document.getElementById('older');
  olderButton.addEventListener('click',  () => pagination(false));
  
}

window.addEventListener('DOMContentLoaded', main)
