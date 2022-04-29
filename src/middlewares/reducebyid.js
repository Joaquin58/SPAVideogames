function reducebyid(Obj) {
    return {
        id: Obj.id,
        image: Obj.background_image,
        name: Obj.name,
        genres: Obj.genres.map(g => g.name),
        description: Obj.description,
        released: Obj.released,
        rating: Obj.rating,
        platforms: Obj.platforms.map(({ platform }) => platform.name)
    }
}

module.exports=reducebyid