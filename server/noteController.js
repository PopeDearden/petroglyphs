module.exports= {
    getNotes: (req, res) => {
        const id = req.params.id
        const db = req.app.get('db')
        db.get_notes(id)
        .then(notes => {
            res.status(200).send(notes)
        })
        console.log('getting notes...')
    }
}
