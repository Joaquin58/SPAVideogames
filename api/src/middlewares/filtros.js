function filter(filt, allVideogames) {
    const genresfilter = filt === 'ALL' ?
        allVideogames
        : allVideogames.filter(el => el.genres.includes(filt))
    return genresfilter
}
module.exports = filter