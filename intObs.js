const cards = document.querySelectorAll(".card")

const intOb = new IntersectionObserver(observer =>{
  observer.forEach(observer =>{
    observer.target.classList.toggle("show", observer.isIntersecting)
  })
})