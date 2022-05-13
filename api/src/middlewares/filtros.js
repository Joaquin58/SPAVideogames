function filter(filt, allVideogames) {
    const genresfilter = filt === 'ALL' || filt === "Filtra por generos" ?
        allVideogames
        : allVideogames.filter(el => el.genres.includes(filt))
    return genresfilter
}
module.exports = filter