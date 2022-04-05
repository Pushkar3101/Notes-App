const fs = require('fs')
const chalk = require('chalk')

const addNote = (title,body) =>{
    const notes = loadNotes()
  //  const duplicateNotes = notes.filter((note) => note.title === title)
    const duplicateNote = notes.find((note) => note.title === title)        //better way

   /* const duplicateNotes = notes.filter(function(note) {           //for reference
        return note.title === title
    })
   console.log(duplicateNotes) */

  if(!duplicateNote){
    notes.push({
        title:title,
        body:body
    })
    saveNotes(notes)
    console.log(chalk.green.inverse('New note added !'))
    }else{
    console.log(chalk.red.inverse('duplicate title!'))
    }   

   
}

const removeNote = (title) =>{
    //console.log(title)
    const notes = loadNotes()
    const filtered = notes.filter((note) =>  note.title !== title )

    if(notes.length > filtered.length){
        console.log(chalk.green.inverse('Note removed !'))

        saveNotes(filtered)
    }else{
        console.log(chalk.red.inverse('No Note found !'))

    }
}

const listNotes = () =>{
    const notes =loadNotes()
    console.log(chalk.red.inverse('Your Notes titles ...\n'))
    notes.forEach((note) =>{
        console.log(chalk.blue.inverse(note.title))
       // console.log(chalk.white.inverse(note.body))
    })
}

const readNote = (title)=>{
    const notes = loadNotes()
    const note = notes.find((note) => note.title === title)

    if(note){
        console.log(chalk.inverse(note.title))
        console.log(note.body)
    }else{
        console.log(chalk.red.inverse('No note found !!'))
    }
}

const loadNotes = () =>{
    try{
        const dataBuffer = fs.readFileSync('Notes.json')
        const dataJSON = dataBuffer.toString()
        return JSON.parse(dataJSON)
    }catch(e){
        return []
    }   
}

const saveNotes = (note) =>{
    const dataJSON = JSON.stringify(note)
    fs.writeFileSync('Notes.json',dataJSON)

}

module.exports = {
    addNote: addNote,
    removeNote: removeNote ,
    listNotes: listNotes,
    readNote: readNote
}