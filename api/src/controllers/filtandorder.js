const filtandorder = (req, res) => {
    const { status, genres, raiting, alfabet} = req.body
    try {
        res.status(200).json('conectado')
    } catch (error) {
        return res.status(500).json
    }
}

module.exports = filtandorder