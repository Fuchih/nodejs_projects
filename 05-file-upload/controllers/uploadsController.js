const path = require('path')
const { StatusCodes } = require('http-status-codes')
const CustomError = require('../errors')
const cloudinary = require('cloudinary').v2
const fs = require('fs')

const uploadProductImageLocal = async (req, res) => {
  if (!req.files) throw new CustomError.BadRequestError('No File Uploaded')

  const productImage = req.files.image

  if (!productImage.mimetype.startsWith('image'))
    throw new CustomError.BadRequestError('Please upload Image')

  const maxSize = 1024 * 1024

  if (productImage.size > maxSize)
    throw new CustomError.BadRequestError(
      'Please upload image smaller than 1MB',
    )

  const imagePath = path.join(
    __dirname,
    '../public/uploads/' + `${productImage.name}`,
  )

  await productImage.mv(imagePath)
  res
    .status(StatusCodes.OK)
    .json({ image: { src: `/uploads/${productImage.name}` } })
}

const uploadProductImage = async (req, res) => {
  const result = await cloudinary.uploader.upload(req.files.image.tempFilePath)

  fs.unlinkSync(req.files.image.tempFilePath)
  res.status(StatusCodes.OK).json({ image: { src: result.secure_url } })
}

module.exports = { uploadProductImage }
