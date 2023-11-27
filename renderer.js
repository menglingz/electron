const information = document.getElementById('info')
const setButton = document.getElementById('btn')
const titleInput = document.getElementById('title')
const fileBtn = document.getElementById('file-btn')
const counter = document.getElementById('counter')

window.versions.handlerCounter((event, value) => {
  const oldVlaue = Number(counter.innerText);
  const newValue = oldVlaue + value;
  counter.innerText = newValue;
  event.sender.send('counter-value', newValue)
})

setButton.addEventListener('click', () => {
  const title = titleInput.value
  window.versions.setTitle(title)
})

fileBtn.addEventListener('click', async () => {
  const filePath = await window.versions.openFile()
  fileBtn.innerText= filePath
})

information.innerText = `本应用正在使用 Chrome (v${versions.chrome()}), Node.js (v${versions.node()}), 和 Electron (v${versions.electron()})`
