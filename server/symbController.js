module.exports = {

    getSymbols: (req, res) => {
    const db = req.app.get('db')
    db.get_symbols()
    .then(symbols => {
        res.status(200).send(symbols)
    })
    },
    getSymbol: (req, res) => {
        const db = req.app.get('db')
        const id = req.params.id
        db.get_symbol(id)
        .then(symbol =>{
            res.status(200).send(symbol)
        })
    },
    getMeanings: (req, res) => {
        const id = req.params.id
        console.log(req.params)
        const db = req.app.get('db')
        db.get_meaning(id)
        .then(meanings => {
            res.status(200).send(meanings)
        })
    },
    addMeaning: (req, res) => {
        const id = req.params.id
        const {meaning, language} = req.body
        console.log(meaning, language)
        const db=req.app.get('db')
        db.add_meaning(id,meaning, language)
        .then(res.status(200).send('did it'))
    },
    deleteMeaning: (req, res) => {
        const id = req.params.id
        const db = req.app.get('db')
        db.delete_meaning(id)
        .then(res.status(200).send('happy day'))
    },
    addSymbol:(req, res) => {
        const {name, drawing, attributes} = req.body
        console.log(name, drawing, attributes)
        const db=req.app.get('db')
        db.add_symbol([name, drawing, attributes])
        .then(symbols => {
            res.status(200).send(symbols)
        }
        )
    }
}