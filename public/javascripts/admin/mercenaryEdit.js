// 透過點擊預覽按鈕顯示圖片
const previewButton = document.querySelector('#previewButton')
previewButton.addEventListener('click', () => {
  const previewImage = document.querySelector('#preview')
  const image = document.querySelector('#image')
  previewImage.src = image.value
})
