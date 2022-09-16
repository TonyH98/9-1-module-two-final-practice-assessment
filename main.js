
const url = "https://ghibliapi.herokuapp.com/people"
const section = document.querySelector("#section")

const h4 = document.querySelector("#name")
const p1 = document.querySelector("#eyes")
const p2 = document.querySelector("#age")
const p3 = document.querySelector("#hair")

const form = document.querySelector("form")

const shoutout = document.querySelector("#shoutout")
console.log(shoutout)

let people

fetch(url)
.then((res) => res.json())
.then((resJson) => {
    people = resJson
    
    for(let i = 0; i < resJson.length; i++){
       const characterNames = resJson[i].name
        const option = document.createElement("option")
        option.innerHTML = characterNames
        option.value = resJson[i].id
        section.append(option)
        option.textContent = characterNames
         
     }

    
})
.catch((error) => console.log(error))

section.addEventListener("change", () => {
    fetch(`${url}/${section.value}`)
    .then((res) => res.json())
    .then((resJson) => {
        const name = resJson.name
        console.log(name)
        h4.innerHTML = ""
        h4.innerHTML = name

        const eyeColor = resJson.eye_color
        p1.innerHTML = ""
        p1.innerHTML = eyeColor

        const age = resJson.age
        p2.innerHTML = ""
        p2.innerHTML = age

        const hair = resJson.hair_color
        p3.innerHTML = ""
        p3.innerHTML = hair


    })
    .catch((error) => console.log(error))
})

form.addEventListener("submit", (event) => {
    event.preventDefault()
    fetch(`${url}`)
    .then((res) => res.json())
    .then((resJson) => {
        resJson.forEach((element) => {
            const name = element.name
            console.log(name)
            generateName(name)
        })
    })
    .catch((error) => console.log(error))
})


function getName(name){
    const li = document.createElement("li")
    li.textContent

    if(name){
        const strong = document.createElement("strong")
        strong.textContent = name
        li.append(strong)
    }
    return li
   
}

function generateName(name){
    const li = getName(name)
    const ul = document.querySelector("ul")
    ul.append(li)
}