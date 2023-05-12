const router = require("express").Router();
const multer = require("multer");


//upload document images
let fileName;
let fileNameInArray = []

var documentImage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/documents");
  },
  filename: function (req, file, cb) {
    fileName = new Date().toISOString().replace(/:/g, "-") + file.originalname;
    fileNameInArray.push(fileName.replaceAll(' ', ''))
    cb(null, fileName.replaceAll(' ', ''));
  },
});

var uploadDocumentImages = multer({ storage: documentImage });

router.post("/document-files", uploadDocumentImages.array('file'), (req, res) => {
  try {
    // const file = req.files[0];
    // console.log(file)
    const newFileName = fileNameInArray.map(data => {
      return {
        image: `uploads/documents/${data}`
      }
    })

    fileNameInArray = []
    return res.status(200).json({ images: newFileName });

  } catch (error) {
    console.log(error)
    return res.status(400).json({ message: 'Something is wrong' })
  }
});

//upload chat images
var chatImage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/chats");
  },
  filename: function (req, file, cb) {
    fileName = new Date().toISOString().replace(/:/g, "-") + file.originalname;
    fileNameInArray.push(fileName.replaceAll(' ', ''))
    cb(null, fileName.replaceAll(' ', ''));
  },
});

var uploadChatImages = multer({ storage: chatImage });

router.post("/chat-images", uploadChatImages.array('file'), (req, res) => {
  try {
    // const file = req.files["file"]?.path;
    const newFileName = fileNameInArray.map(data => {
      return {
        image: `uploads/chats/${data}`
      }
    })

    fileNameInArray = []
    return res.status(200).json({ images: newFileName });

  } catch (error) {
    console.log(error)
    return res.status(400).json({ message: 'Something is wrong' })
  }
});


//upload lawyer images
var lawyerImage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/lawyers");
  },
  filename: function (req, file, cb) {
    fileName = new Date().toISOString().replace(/:/g, "-") + file.originalname;
    fileNameInArray.push(fileName.replaceAll(' ', ''))
    cb(null, fileName.replaceAll(' ', ''));
  },
});

var uploadLawyerImages = multer({ storage: lawyerImage });

router.post("/lawyer-images", uploadLawyerImages.array('file'), (req, res) => {
  try {
    // const file = req.files["file"]?.path;
    const newFileName = fileNameInArray.map(data => {
      return {
        image: `uploads/lawyers/${data}`
      }
    })

    fileNameInArray = []
    return res.status(200).json({ images: newFileName });

  } catch (error) {
    console.log(error)
    return res.status(400).json({ message: 'Something is wrong' })
  }
});


module.exports = router;
