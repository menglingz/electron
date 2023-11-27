const information = document.getElementById('info')
const setButton = document.getElementById('btn')
const titleInput = document.getElementById('title')
setButton.addEventListener('click', () => {
  console.log(1)
  const title = titleInput.value
  window.versions.setTitle(title)
})
information.innerText = `本应用正在使用 Chrome (v${versions.chrome()}), Node.js (v${versions.node()}), 和 Electron (v${versions.electron()})`

const func = async () => {
  const res = await versions.ping()
  console.log(res)
}

func()