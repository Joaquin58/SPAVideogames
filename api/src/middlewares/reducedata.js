const reducedata = (array) => {
    return array.map(Obj => {
        return {
            id: Obj.id,
            image: Obj.background_image || Obj.image,
            name: Obj.name,
            genres: Obj.genres.map(g => g.name),
            rating: Obj.rating,
            CreatedInDb: Obj.CreatedInDb ? Obj.CreatedInDb : false
        }
    })
}

module.exports = reducedata