const Upload = require("../model/Upload");
const {
  S3Client,
  PutObjectCommand,
  GetObjectCommand,
} = require("@aws-sdk/client-s3");
const { getSignedUrl } = require("@aws-sdk/s3-request-presigner");
const customError = require("../utils/error");

const s3Client = new S3Client({
  region: process.env.AWS_BUCKET_REGION,
  credentials: {
    accessKeyId: process.env.ACCESS_KEY_ID,
    secretAccessKey: process.env.SECRET_ACCESS_KEY,
  },
});

const uploadController = {
  uploadFile: async (req, res) => {
    const file = req.file;
    // Generating a unique key for the uploaded file
    const key = `${process.env.UPLOADS_DIR}` + Date.now() + file.originalname;
    const { userData } = req;
    // Creating a command for uploading the file to S3
    const command = new PutObjectCommand({
      Bucket: process.env.AWS_BUCKET_NAME,
      Key: key,
      ContentType: file.mimetype,
    });
    // Getting a signed URL for uploading the file
    const url = await getSignedUrl(s3Client, command);
    // Creating a record for the uploaded file in the database
    const uploadedFile = await Upload.create({
      userId: userData._id,
      key: key,
    });
    // Sending a response with the uploaded file information and URL
    res.status(200).json({
      success: true,
      message: "File uploaded successfully",
      data: uploadedFile,
      url: url,
    });
  },
  getFile: async (req, res) => {
    const { key } = req.query;
    console.log(key);
    // Checking if the requested file exists in the database
    const existingFile = await Upload.findOne({
      key: key,
    });
    if (!existingFile) {
      // Throwing an error if the requested file is not found
      throw new customError(404, "File not found");
    }
    // Creating a command for fetching the file from S3
    const command = new GetObjectCommand({
      Bucket: process.env.AWS_BUCKET_NAME,
      Key: key,
    });
    // Getting a signed URL for fetching the file
    const url = await getSignedUrl(s3Client, command);
    // Sending a response with the file URL
    res.status(200).json({
      success: true,
      message: "File fetched successfully",
      url: url,
    });
  },
};

module.exports = uploadController;
