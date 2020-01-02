const mongoose = require("mongoose")
const bcrypt = require('bcryptjs')

const schema = new mongoose.Schema({
    username: { type: String },
    password: { 
        type: String, 
        select: false, // 默认不显示密码
        set(val) { // 密码加密
            return bcrypt.hashSync(val, 10);
        },
    },
})

module.exports = mongoose.model('AdminUser', schema)