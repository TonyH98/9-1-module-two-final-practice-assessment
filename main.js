
const url = "https://ghibliapi.herokuapp.com/people"
const section = document.querySelector("#section")

const h4 = document.querySelector("#name")
const p1 = document.querySelector("#eyes")
const p2 = document.querySelector("#age")
const p3 = document.querySelector("#hair")

const form = document.querySelector("form")
const shoutout = document.querySelector("#shoutout")

const submit = document.getElementById("submit")

const error = document.querySelectorAll(".error")

const reset = document.querySelector("#reset-shoutouts")
console.log(reset)

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
    if(section.value === ""){
        error[0].classList.remove("hidden")
    }
    else {
        error[0].classList.add("hidden")

    }
    if(event.target.shoutout.value === ""){
        error[1].classList.remove("hidden")
    }
    else{
        error[1].classList.add("hidden")
        fetch(`${url}`)
        .then((res) => res.json())
        .then((resJson) => {
            const names = event.target.shoutout.value
            resJson.forEach((element) => {
                const character = element.name
                if(character.includes(names)){
                    generateList(names)
                }
            })
            form.reset()
        })
        .catch((error) => console.log(error))
    }
    })

    reset.addEventListener("click", () => {
       const unorder = document.querySelector("ul")
       const strong = document.querySelectorAll("strong")
       strong.forEach((str) => {
        unorder.removeChild(str)
       })
    })

function addList(names){
    const li = document.createElement("li")
    const strong = document.createElement("strong")
    strong.textContent
    if(names){
        strong.append(li, names)
    }
    
    return strong
}


function generateList(names){
    const li = addList(names);
    const ul = document.querySelector("ul");
    
    ul.append(li)
    
    
}