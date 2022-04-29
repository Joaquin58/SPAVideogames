function filter(filt, all) {
    const allVideogames = all
    const genresfilter = filt === 'ALL' ? allVideogames : allVideogames.filter(el => el.genres.includes(filt))
    return genresfilter
}
module.exports = filter