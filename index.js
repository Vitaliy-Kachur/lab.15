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
  let likedPhotos = [];
  const gUsers = await fetchQ(page)
  clearAll()
  const Div = document.createElement("div")
  Div.textContent = "User list =)"
  Div.classList.add("user_list")
  Div.classList.add("color2")
  app.appendChild(Div)
  const namesArr = gUsers.map((user) => user.user.username)
  const fotoArr = gUsers.map((user) => user.user.profile_image.medium)
  const backgroundColor = gUsers.map((user) => user.color)

  namesArr.forEach((item, index) => {
    const div = document.createElement("div")
    div.classList.add("rozmir","color")
    div.style.background = backgroundColor[index]
    const img = document.createElement("img")
    img.classList.add("border")
    img.src = fotoArr[index]
    div.appendChild(img)
    const name = document.createElement("div")
    name.textContent = item
    div.appendChild(name)
    app.appendChild(div)
    div.addEventListener("click", () => {
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
      fullScreenImg.src = gUsers[index].urls.regular
      const likeFoto = gUsers[index].likes
      fullScreenDiv.appendChild(fullScreenImg)
      app.appendChild(fullScreenDiv)
      const LikeP = document.createElement("div");
      LikeP.textContent = "🤍";
      LikeP.classList.add("white-heart");
      fullScreenDiv.appendChild(LikeP);
      let L = 0
      if (likedPhotos.includes(gUsers[index].id)) {
        LikeP.classList.add("red-heart");
        LikeP.textContent = "❤️";
        L = 1
      }
      const Like = document.createElement("div")
      Like.classList.add("color3")
      Like.textContent = `Кількість вподобань ${likeFoto + L}`
      fullScreenDiv.appendChild(Like)  
      LikeP.addEventListener("click", () => {
        LikeP.classList.toggle("white-heart")
        LikeP.classList.toggle("red-heart")
        const likeFoto = gUsers[index].likes
        if (LikeP.classList.contains("red-heart")) {
          likedPhotos.push(gUsers[index].id)
          Like.textContent = `Кількість вподобань ${likeFoto + 1}`
          LikeP.textContent = "❤️"
          LikeP.classList.add("red-heart")
        } else {
          likedPhotos = likedPhotos.filter((id) => id !== gUsers[index].id)
          Like.textContent = `Кількість вподобань ${likeFoto}`
          LikeP.textContent = "🤍"
          LikeP.classList.add("white-heart")
        }
      })
  })
  })
  paginationHtml(page)
}

function paginationHtml(currentPage) {
  const pagesNums = Array.from(Array(10), (_, i) => i + 1)
  const app = document.getElementById("app")
  const divPaginate = document.createElement("div")
  divPaginate.classList.add("list")
  const prevButton = document.createElement("div");
  prevButton.textContent = "Назад"
  prevButton.classList.add("cursor")
  prevButton.style.margin = "0 10px"
  prevButton.addEventListener("click", () => {
    if (currentPage > 1) {
      main(currentPage - 1)
    }
  })
  divPaginate.appendChild(prevButton);
  pagesNums.forEach((item) => {
    const div = document.createElement("div");
    div.textContent = item
    div.style.margin = "0 10px"
    div.addEventListener("click", () => {
      main(item)
    })
    if (item === currentPage) {
      div.classList.add("active")
    }
    divPaginate.appendChild(div)
  })
  const nextButton = document.createElement("div");
  nextButton.textContent = "Вперед"
  nextButton.classList.add("cursor")
  nextButton.style.margin = "0 10px"
  nextButton.addEventListener("click", () => {
    if (currentPage < 10) {
      main(currentPage + 1)
    }
  })
  divPaginate.appendChild(nextButton);
  app.appendChild(divPaginate)
}
function clearAll() {
  const app = document.getElementById("app");
  app.innerHTML = ""
}
main(1)
