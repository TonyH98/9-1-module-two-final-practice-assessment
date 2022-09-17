
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





fetch(url)
.then((res) => res.json())
.then((resJson) => {
   
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





section.addEventListener("change", (event) => {
    
    fetch(`${url}/${section.value}`)
    .then((res) => res.json())
    .then((resJson) => {
        const name = resJson.name
        
        h4.innerHTML = name
        
        const eyeColor = resJson.eye_color
        
        p1.innerHTML = eyeColor
        
        const age = resJson.age
        
        p2.innerHTML = age
        
        const hair = resJson.hair_color

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
    error[1].classList.add("hidden")
    fetch(`${url}/${section.value}`)
    .then((res) => res.json())
    .then((resJson) => {
        const name = resJson.name
        
        const greeting = event.target.shoutout.value
        if(greeting === ""){
            error[1].classList.remove("hidden")
            error[1].textContent = `Please add a shout for ${name}`
        }
            
            generateList(greeting, name)
            
            form.reset()
        })
        .catch((error) => console.log(error))
        
        
    
        
    })
    
    reset.addEventListener("click", () => {
        const unorder = document.querySelector("ul")
    const strong = document.querySelectorAll("strong")
    strong.forEach((str) => {
        
        unorder.removeChild(str)
    })
})

function addList(greeting, name){
    const strong = document.createElement("strong")
    strong.textContent 

    if(name){
        strong.textContent +=  `${name}: ${greeting}`
        strong.append(document.createElement("br"))
    }
    
    return strong
}


function generateList(greeting, name){
    const li = addList(greeting, name);
    const ul = document.querySelector("ul");
    
    ul.append(li)
}


