const getUserInfo = () => {
  const user = firebase.auth().currentUser;
  const image = document.getElementById('image');
  if (user != null) {
    image.src = user.photoURL;
  }
}

const onCheckState = () => {
  firebase.auth().onAuthStateChanged(user => {
    if(!user) {
      window.location.replace('../login/login.html')
    } else {
      getUserInfo()
    }
  })
}

const onUpdateUrlPhoto = photoURL => {
  const user = firebase.auth().currentUser;
  user.updateProfile({photoURL}).then(() => {
    alert('Profile Updated')
  })
}

let image;

const onUploadNewPhoto = () => {
  const storageRef = firebase.storage().ref();
  const imagesRef = storageRef.child(`images/${image.name}`)
  console.log('image from storage ', imagesRef)
  if (image) {
    imagesRef.put(image).then(snapshot => {
      snapshot.ref.getDownloadURL().then(url => {
        console.log('this is url from storage', url)
        onUpdateUrlPhoto(url)
        window.location.replace('../my-account')
      })
    })
  }
}

const main = () => {
  console.log('File Loaded ...')
  onCheckState()
  
  const browsePhoto = document.getElementById('browsePhoto');
  browsePhoto.addEventListener('click', event => {
    console.log('Button clicked', event);
    image = event.target.files[0];
    const newImage = document.getElementById('newImage')
    newImage.src = URL.createObjectURL(event.target.files[0])
    newImage.style = 'width: 200px; height: 200px;';
  });
  
  const uploadButton = document.getElementById('uploadButton');
  uploadButton.addEventListener('click', onUploadNewPhoto)
  
}

window.addEventListener('DOMContentLoaded', main)
