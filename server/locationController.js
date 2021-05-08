
module.exports = {
    addLocation: (req, res) => {
        const { name, longitude, latitude, image } = req.body
        const db = req.app.get('db')
        db.add_location([name, longitude, latitude, image])
            .then(locations => {
                res.status(200).send(locations)
            })
    },
    getLocations: (req, res) => {
        const db = req.app.get('db')
        if(req.session.user){
            db.get_locations()
                .then(locations => {
                    res.status(200).send(locations)
                }
                )
        } else {
            res.status(200).send('You Do Not Have Permission')
        }

    },
    getAttributes: (req, res) => {
        const db = req.app.get('db')
        db.attribute_search()
            .then(locations =>
                res.status(200).send(locations))
    },
    getLocation: (req, res) => {
        const db = req.app.get('db')
        const { id } = req.params
        if(req.session.user){
        db.get_location(id)
            .then(location => {
                res.status(200).send(location)
            })
        } else {
            res.status(200).send('You do not have permission')
        }
    },
    getPanelTable: (req, res) => {
        const db = req.app.get('db')
        const id = req.params.id
        db.get_panel_table(id)
            .then(table =>
                res.status(200).send(table))
    },
    addOrder: (req, res) => {
        const db = req.app.get('db')
        const { id } = req.params
        const { locationId, row, pillar } = req.body
        db.add_order([id, locationId, row, pillar])
            .then(table =>
                res.status(200).send('yay!'))
    },
    deleteOrder: (req, res) => {
        const db = req.app.get('db')
        const { id } = req.params
        db.delete_order(id)
            .then(table =>
                res.status(200).send('deleted'))
    },
    getSymbolLocations: (req, res) => {
        const db = req.app.get('db')
        const { id } = req.params
        if(req.session.user){
        db.search_symbol_location(id)
            .then(locations =>
                res.status(200).send(locations))
            }else {
                res.status(200).send('YOU DO NOT HAVE PERMISSION')
            }
    },
    editLocation: (req, res) => {
        const db = req.app.get('db')
        const { id } = req.params
        const { name, long, lat, image } = req.body
        db.edit_location([id, name, long, lat, image])
            .then(location =>
                res.status(200).send(location))
    }
}