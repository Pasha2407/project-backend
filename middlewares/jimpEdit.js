const Jimp = require('jimp')

async function jimpEdit(req, res, next) {
    try {
        const img = await Jimp.read(req.file.path)
        await img.cover(250, 250)
        await img.writeAsync(req.file.path)

        next()
    } catch (error) {
        next(error)
    }
}

module.exports = jimpEdit