module.exports = {

    getSymbols: (req, res) => {
    const db = req.app.get('db')
    db.get_symbols()
    .then(symbols => {
        res.status(200).send(symbols)
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