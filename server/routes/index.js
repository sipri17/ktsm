const Controller = require('../controllers')
const {upload} = require('../middlewares/multer')

const router = require('express').Router()
const authentication = require('../middlewares/authentication')

router.post("/login", Controller.login)
router.get("/file/:accessToken/:fileCode",Controller.showFile)
router.use(authentication)
router.get("/files",Controller.showFiles)
router.post("/upload",upload.single("application"),Controller.createFile)
router.put("/upload",upload.single("application"),Controller.updateFile)

module.exports = router