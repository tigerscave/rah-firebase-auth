
const onShowUserId = () => {
  const userId = firebase.auth().currentUser.uid
  console.log(userId)
}

const displayUserTweet = data => {
  const tweetList = document.getElementById('tweetList');
  
  data.map(d => {
    console.log(d.data().tweetText);
    const tweet = d.data();
    const tweetTextElement = document.createElement('LI');
    const tweetTextElementContent = document.createTextNode(tweet.tweetText)
    tweetTextElement.appendChild(tweetTextElementContent);
  
    tweetList.appendChild(tweetTextElement)
  })
}


const onFetchUserTweets = user => {
  const db = firebase.firestore()
  db.collection('Tweets')
    .where("userId", "==", user.uid)
    .orderBy("createdAt", "desc")
    .limit(3)
    .get()
    .then(querySnapshot => {
      displayUserTweet(querySnapshot.docs)
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
  
  // const fetchButton = document.getElementById('fetchButton');
  // fetchButton.addEventListener('click', onFetchUserTweets)
}

window.addEventListener('DOMContentLoaded', main)
