module.exports = {

    getSymbols: (req, res) => {
    const db = req.app.get('db')
    db.get_symbols()
    .then(symbols => {
        res.status(200).send(symbols)
    })
    }
}