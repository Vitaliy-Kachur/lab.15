async function fetchQ(countPage) {
  const users = await fetch(
    `https://api.unsplash.com/photos/?client_id=ab3411e4ac868c2646c0ed488dfd919ef612b04c264f3374c97fff98ed253dc9&page=${
      countPage == undefined ? "1" : countPage
    }`
  )
  const json = await users.json()
  return json
}

async function main(page) {
  const gUsers = await fetchQ(page)
  clearAll()
  const Div = document.createElement("div")
  Div.textContent = "User list =)"
  Div.classList.add("user_list")
  Div.classList.add("color2")
  app.appendChild(Div)
  const namesArr = gUsers.map((user) => user.user.username)
  const fotoArr = gUsers.map((user) => user.user.profile_image.medium)

  namesArr.forEach((item, index) => {
    const div = document.createElement("div")
    div.classList.add("rozmir", "color")
    const img = document.createElement("img")
    img.classList.add("border")
    img.src = fotoArr[index]
    div.appendChild(img)
    const name = document.createElement("div")
    name.textContent = item
    div.appendChild(name)
    app.appendChild(div)
    img.addEventListener("click", () => {
      const fullScreenDiv = document.createElement("div")
      fullScreenDiv.classList.add("full_screen")
      const Close = document.createElement("div")
      Close.textContent = "←   User Image"
      Close.classList.add("back_button", "color2")
      Close.addEventListener("click", () => {
        app.removeChild(fullScreenDiv)
      })
      fullScreenDiv.appendChild(Close)
      const fullScreenImg = document.createElement("img")
      fullScreenImg.src = gUsers[index].user.profile_image.large
      fullScreenDiv.appendChild(fullScreenImg)
      app.appendChild(fullScreenDiv)
    })
  })
  createListHtml(gUsers)
}
function createListHtml(list) {
  const app = document.getElementById("app")
  for (let i = 0; i < list.length; i++) {
    const div = document.createElement("div")
    app.appendChild(div)
  }
  paginationHtml()
}
function paginationHtml() {
  const pagesNums = Array.from(Array(10), (_, i) => i + 1)
  const app = document.getElementById("app");
  const divPaginate = document.createElement("div")
  divPaginate.classList.add("list")
  pagesNums.forEach((item) => {
    const div = document.createElement("div");
    div.textContent = item
    div.style.margin = "0 10px"
    div.addEventListener("click", () => {
      main(item)
    })
    divPaginate.appendChild(div)
  })
  app.appendChild(divPaginate)
}
function clearAll() {
  const app = document.getElementById("app");
  app.innerHTML = ""
}
main()
