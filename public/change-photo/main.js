const main = () => {
  console.log('File Loaded ...')
  
  const browsePhoto = document.getElementById('browsePhoto');
  browsePhoto.addEventListener('click', event => {
    console.log('Button clicked', event);
    const newImage = document.getElementById('newImage')
    newImage.src = URL.createObjectURL(event.target.files[0])
    newImage.style = 'width: 200px; height: 200px;'
  })
}

window.addEventListener('DOMContentLoaded', main)
