<template>
    <el-container>
        <el-main>
            <el-card header="王者荣耀WEB后台管理" class="box-card" shadow="always">
                <el-form @submit.native.prevent="login">
                    <el-form-item label="账号">
                        <el-input v-model="model.username"></el-input>        
                    </el-form-item>
                    <el-form-item label="密码">
                        <el-input v-model="model.password" show-password></el-input>        
                    </el-form-item> 
                    <el-form-item>
                        <el-button type="primary" native-type="submit">登录</el-button>        
                    </el-form-item>     
                </el-form>    
            </el-card>
        </el-main>
    </el-container>
</template>

<script>

    export default {
        props: { 
            id: {}
        },
        data() {
            return {
                model: {
                    username: '',
                    password: '',
                }
            }
        },
        methods: {
            async login() {
                const res = await this.$http.post('login', this.model)
                localStorage.token = res.data.token
                this.$router.push({name:'main', params:{username: res.data.username}})
                this.$message({
                    type: 'success',
                    message: '登录成功'
                })
            },
        }
        
    }
</script> 

<style scoped>
    .el-main {
        background-color: #E9EEF3;
        color: #333;
        text-align: center;
        height: 100vh;
    }

    .box-card {
        width: 25vw;
        margin: 10% auto;
    }
</style>