let saveBtn = document.getElementById("save-btn")
let delBtn = document.getElementById("delete-btn")
let ulEl = document.getElementById("ul-el")
let inputEl = document.getElementById("input-el")
let myNotes = []
let tabBtn =document.getElementById("tab-btn")


saveBtn.addEventListener("click",function()
{
    myNotes.push(inputEl.value) //push the value to the stack
    inputEl.value = "" //clear the input field
    localStorage.setItem("myNotes",JSON.stringify(myNotes)) //store the value to the local storage
    renderNotes(myNotes) //render the notes
})

let notesFromStorage = JSON.parse(localStorage.getItem("myNotes"))

if(notesFromStorage) //if there is data present in storage,render it out
{
    myNotes = notesFromStorage
    renderNotes(myNotes)
}

delBtn.addEventListener("dblclick",function()
{
    localStorage.clear()
    myNotes = []
    renderNotes(myNotes)
})

tabBtn.addEventListener("click",function(){
        chrome.tabs.query({active:true,currentWindow:true},function(tabs){
            myNotes.push(tabs[0].url)
            localStorage.setItem("myNotes",JSON.stringify(myNotes))
            renderNotes(myNotes)
    })
})



function renderNotes(notes)
{
    let items = ""
    for(let i=0;i<notes.length;i++)
    {
        items += `<li>${myNotes[i]}</li>`
    }
    ulEl.innerHTML = items
}