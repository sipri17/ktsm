const { File, User } = require('../models')
const { verifyHash, generateToken, verifyToken } = require('../helpers')
const path = require('path');

class Controller {
    static async login(req, res, next) {
        try {
            const { username, password } = req.body
            console.log('test awal', req.body);
            if (!username || !password) throw { name: 'data not found', message: 'username and password are required' }
            const user = await User.findOne({ where: { username } })
            console.log('user>>', username);
            if (!user) throw { name: 'data not found', message: 'error invalid username or password' }
            const validPassword = verifyHash(password, user.password)
            if (!validPassword) throw { name: 'data not found', message: 'error invalid username or password' }

            const payload = {
                id: user.id
            }

            const access_token = generateToken(payload)

            res.status(200).json({
                access_token,
                fullName:user.username,
                role:user.role
            })
        } catch (error) {
            next(error)
        }
    }



    static async createFile(req, res, next) {
        try {
            const fileCode = req.file.filename
            const name = req.file.originalname;
            const userId = req.user.id
            const newFile = await File.create({ name, fileCode, userId })
            res.status(201).json({ name, fileCode, userId })
        } catch (error) {
            next(error)

        }
    }

    static async showFile(req, res, next) {
        try {
            const { fileCode, accessToken } = req.params

            if (!accessToken) {
                throw ({ name: "invalid token" })
            }
            const payload = verifyToken(accessToken)
            const user = await User.findByPk(payload.id)
            const allFiles = await File.findAll({
                where: {
                    userId: user.id
                }
            })
            const checkOwnership = allFiles.some(file => file.fileCode == fileCode)
            if (!checkOwnership) throw { name: "forbidden" }
            res.sendFile(`${process.cwd()}/uploads/${fileCode}`)
        } catch (error) {
            next(error)
        }
    }

    static async showFiles(req, res, next) {
        try {
            const allFiles = await File.findAll({
                where: {
                    userId: req.user.id
                }
            })
            res.status(201).json({ files: allFiles })
        } catch (error) {
            next(error)

        }
    }

    static async updateFile(req, res, next) {
        try {
            const newfileCode = req.file.filename
            const originalCode = req.file.originalname;
            const file = await File.findOne( {
                where: { fileCode:originalCode }
            })
            console.log("file>>",file);
            if (!file) throw { name: "404data not found", message: `there is no file the file code ${originalCode}` }
            await file.update({ fileCode:newfileCode})
            res.status(201).json({ message: `file with the name ${file.name} has successfully updated` })
        } catch (error) {
            next(error)

        }
    }


}

module.exports = Controller