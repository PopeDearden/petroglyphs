module.exports = {
    getNotes: (req, res) => {
        const id = req.params.id
        const db = req.app.get('db')
        db.get_notes(id)
            .then(notes => {
                res.status(200).send(notes)
            })
        console.log('getting notes...')
    },
    addNote: (req, res) => {
        const id = req.params.id
        const db = req.app.get('db')
        db.add_note(id)
            .then(notes => {
                res.status(200).send(notes)
            })
    },
    editNote: (req, res) => {
        const { noteId, title, note } = req.body
        console.log(note)
        const db = req.app.get('db')
        db.update_note([noteId, title, note])
            .then(notes => {
                res.status(200).send(notes)
            })
    },
    deleteNote: (req, res) => {
        const id = req.params.id
        const db = req.app.get('db')
        db.delete_note(id)
            .then(notes => {
                res.status(200).send(notes)
            })

    }
}

