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
            .then(symbol => {
                res.status(200).send(symbol)
            })
    },

    getMeanings: (req, res) => {
        const id = req.params.id
        const db = req.app.get('db')
        db.get_meaning(id)
            .then(meanings => {
                res.status(200).send(meanings)
            })
    },
    getAllMeanings: (req, res) => {
        const db = req.app.get('db')
        db.get_meanings()
            .then(meanings => {
                res.status(200).send(meanings)
            })
    },
    addMeaning: (req, res) => {
        const id = req.params.id
        const { meaning, language } = req.body
        const db = req.app.get('db')
        db.add_meaning(id, meaning, language)
            .then(res.status(200).send('did it'))
    },
    deleteMeaning: (req, res) => {
        const id = req.params.id
        const db = req.app.get('db')
        db.delete_meaning(id)
            .then(res.status(200).send('happy day'))
    },
    deleteSymbol: (req, res) => {
        const id = req.params.id
        const db = req.app.get('db')
        db.delete_symbol(id)
            .then(res.status(200).send('deleted symbol'))
    },
    addSymbol: (req, res) => {
        const { name, drawing, attributes } = req.body
        const db = req.app.get('db')
        db.add_symbol([name, drawing, attributes])
            .then(symbols => {
                res.status(200).send(symbols)
            }
            )
    },
    updateSymbol: (req, res) => {
        const { name, image, attributes, type } = req.body
        const id = req.params.id
        const db = req.app.get('db')
        db.update_symbol([name, image, attributes, id, type])
            .then(symbols => {
                res.status(200).send(symbols)
            })

    },
    addType: (req, res) => {
        const { name, description } = req.body
        const db = req.app.get('db')
        db.add_type([name, description])
            .then(types => {
                res.status(200).send(types)
            }
            )
    },
    getTypes: (req, res) => {
        const db = req.app.get('db')
       db.get_types()
       .then(types => {
           res.status(200).send(types)
       })

    },
}