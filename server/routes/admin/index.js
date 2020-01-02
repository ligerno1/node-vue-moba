const express = require('express')
const router = express.Router({ mergeParams: true })
const multer = require('multer')
const upload = multer({ dest: __dirname + '/../../uploads'})
const jwt = require('jsonwebtoken')
const AdminUser = require('../../models/AdminUser')
const assert = require('http-assert')

module.exports = app => {
    // login check
    const authMiddleware = require('../../middleware/auth')

    // resource check
    const resourceMidlleware = require('../../middleware/resource')
    
    
    router.post('/', authMiddleware(), async (req, res) => {
        const model = await req.Model.create(req.body)
        res.send(model)
    })

    router.put('/:id', authMiddleware(), async (req, res) => {
        const model = await req.Model.findByIdAndUpdate(req.params.id, req.body)
        res.send(model)
    })

    router.delete('/:id', authMiddleware(), async (req, res) => {
        await req.Model.findByIdAndDelete(req.params.id, req.body)
        res.send({
            success: true
        })
    })

    router.get('/', authMiddleware(), async (req, res) => {
        const queryOptions = {}
        if (req.Model.modelName === 'Category') {
            queryOptions.populate = 'parent' 
        }
        // const items = await req.Model.find().setOptions(queryOptions).limit(10)
        const items = await req.Model.find().setOptions(queryOptions)
        res.send(items)
    })

    router.get('/:id', async (req, res) => {
        const model = await req.Model.findById(req.params.id)
        res.send(model)
    })

    app.use('/admin/api/rest/:resource', authMiddleware(), resourceMidlleware(), router)

    app.post('/admin/api/upload', authMiddleware(), upload.single('file'), async (req, res) => {
        const file = req.file
        file.url = `http://localhost:3000/uploads/${file.filename}`
        res.send(file)
    })

    app.post('/admin/api/login', async (req, res) => {
        
        const { username, password } = req.body
        // 1.根据用户名查询用户
        
        const user = await AdminUser.findOne({username}).select('+password')
        assert(user, 422, '用户不存在')

        // 2.校验密码
        const isValid = require('bcryptjs').compareSync(password, user.password)    
        assert(isValid, 422, '密码错误')
        
        // 3.返回 token
       
        const token = jwt.sign({id: user._id}, app.get('secret'))
        res.send({token, username})
    })
    

    app.use(async (err, req, res, next) => {
        res.status(err.statusCode || 500).send({
            message: err.message
        })
    })
}