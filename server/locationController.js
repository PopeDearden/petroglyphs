
module.exports = {
    addLocation: (req, res) => {
        const { name, longitude, latitude, image } = req.body
        console.log(name, longitude, latitude, image)
        const db = req.app.get('db')
        db.add_location([name, longitude, latitude, image])
            .then(locations => {
                res.status(200).send(locations)
            })
    },
    getLocation: (req, res) => {
        const db = req.app.get('db')
        db.get_locations()
            .then(locations => {
                res.status(200).send(locations)
            }
            )
    },
    getPanelTable: (req, res) => {
        const db = req.app.get('db')
        const id = req.params.id
        db.get_panel_table(id)
        .then(table =>
            res.status(200).send(table))
    }
}