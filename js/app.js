console.log('Create notes')

shownotes()
// if user adds a note inset it in local storage



let addNote = document.getElementById('addbtn')
let addtxt = document.getElementById('addtxt')
let addtitle = document.getElementById('addtitle')
addNote.addEventListener('click', function (e) {

    // localStorage.setItem('Note', addtxt.value)
    if (addtxt.value.length > 2) {
        let notes = localStorage.getItem('notes')
        if (notes == null) {
            notesObj = []
        }
        else {
            notesObj = JSON.parse(notes)
        }
        let myobj={
            title: addtitle.value,
            text:addtxt.value
        }
        notesObj.push(myobj)
        localStorage.setItem('notes', JSON.stringify(notesObj))
        addtxt.value = ""
        addtitle.value = ""
        // console.log(notesObj)
    }
    else {
        alert('Please Enter some text')
    }
    shownotes()
})




// console.log(addNote)


// Add note in Page
function shownotes() {
    let notes = localStorage.getItem('notes')
    if (notes == null) {
        notesObj = []
    }
    else {
        notesObj = JSON.parse(notes)
    }


    let html = ''
    notesObj.forEach(function (element, index) {
        html += `<div class="notecard my-2 mx-2" style="width: 18rem;">
        <div class="card-body">
            <h5 class="card-title addtitle">${element.title}</h5>
            <p class="card-text">${element.text}</p>
            <button class="btn btn-primary" id="${index}" onclick="deleteNote(this.id)">Delete</button>
        </div>
        </div>`
        
    })

    addnote=document.getElementById("notes")
    addnote.innerHTML = html
}

// delete the notes
function deleteNote(id) {
    console.log("Deleting note", id)
    let notes=localStorage.getItem("notes")
    if (notes== null) {
        notesObj=[]
    } else {
        notesObj= JSON.parse(notes)
    }
    notesObj.splice(id, 1);
    localStorage.setItem("notes", JSON.stringify(notesObj));
    shownotes()

}


// search functionality
search=document.getElementById("searchtxt")
search.addEventListener('input',function(e){

    let inputVal=search.value.toLowerCase();
    let cards=document.getElementsByClassName("notecard")
    Array.from(cards).forEach(function(element){
        let cardtxt = element.getElementsByTagName("p")[0].innerText
        let addtitle = element.getElementsByClassName("addtitle")[0].innerText
        if(cardtxt.toLowerCase().includes(inputVal) || addtitle.toLowerCase().includes(inputVal)){
            element.style.display ="block"
        }
        else{
            element.style.display = "none"
        }
    })
})

