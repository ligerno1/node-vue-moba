<template>
    <div>
        <h1>{{ id ? '编辑' : '新建' }}英雄</h1>
        <el-form label-width="120px" @submit.native.prevent="save">
            <el-tabs value="skills" type="border-card">
                <el-tab-pane label="基础信息">
                    <el-form-item label="名称">
                        <el-input v-model="model.name"></el-input>        
                    </el-form-item>
                    <el-form-item label="头像">
                        <el-upload
                        class="avatar-uploader"
                        :action="uploadUrl"
                        :headers="getAuthHeaders()"
                        :show-file-list="false"
                        :on-success="afterUpload"
                        >
                            <img v-if="model.icon" :src="model.icon" class="avatar">
                            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                        </el-upload>
                    </el-form-item>
                    <el-form-item label="称号">
                        <el-input v-model="model.title"></el-input>        
                    </el-form-item>
                    <el-form-item label="类型">
                        <el-select v-model="model.categories" multiple>
                            <el-option v-for="item in categories" 
                            :key="item._id" 
                            :label="item.name"
                            :value="item._id"
                            ></el-option>    
                        </el-select>    
                    </el-form-item>
                    <el-form-item label="难度">
                        <el-rate style="margin-top: 0.6rem;" :colors="['#FFFF00', '#FFFF00', '#FFFF00']" :max="10" show-score v-model="model.scores.difficulty"></el-rate>        
                    </el-form-item>
                    <el-form-item label="技能">
                        <el-rate style="margin-top: 0.6rem;" :colors="['#0000FF', '#0000FF', '#0000FF']" :max="10" show-score v-model="model.scores.skill"></el-rate>        
                    </el-form-item>
                    <el-form-item label="攻击">
                        <el-rate style="margin-top: 0.6rem;" :colors="['#FF0000', '#FF0000', '#FF0000']" :max="10" show-score v-model="model.scores.attack"></el-rate>        
                    </el-form-item>
                    <el-form-item label="生存">
                        <el-rate style="margin-top: 0.6rem;" :colors="['#333333', '#333333', '#333333']" :max="10" show-score v-model="model.scores.survive"></el-rate>        
                    </el-form-item>
                    <el-form-item label="顺风出装">
                        <el-select v-model="model.goods1" multiple>
                            <el-option v-for="item in goods" 
                            :key="item._id" 
                            :label="item.name"
                            :value="item._id"
                            ></el-option>    
                        </el-select>    
                    </el-form-item>
                    <el-form-item label="逆风出装">
                        <el-select v-model="model.goods2" multiple>
                            <el-option v-for="item in goods" 
                            :key="item._id" 
                            :label="item.name"
                            :value="item._id"
                            ></el-option>    
                        </el-select>    
                    </el-form-item>
                    <el-form-item label="使用技巧">
                        <el-input type="textarea" v-model="model.usageTips"></el-input>   
                    </el-form-item>
                    <el-form-item label="对抗技巧">
                        <el-input type="textarea" v-model="model.battleTips"></el-input>   
                    </el-form-item>
                    <el-form-item label="团战思路">
                        <el-input type="textarea" v-model="model.teamTips"></el-input>   
                    </el-form-item>
                </el-tab-pane>
                <el-tab-pane label="技能信息" name="skills">
                    <el-button type="text" @click="addSkill"> <i class="el-icon-plus"></i> 添加技能</el-button>
                    <el-row type="flex" style="flex-wrap: wrap">
                        <el-col :md="12" v-for="(item, i) in model.skills" :key="i">
                            <el-form-item label="名称">
                                <el-input v-model="item.name"></el-input>        
                            </el-form-item>
                            <el-form-item label="图标">
                                <el-upload
                                class="avatar-uploader"
                                :action="uploadUrl"
                                :headers="getAuthHeaders()"
                                :show-file-list="false"
                                :on-success="res => $set(item, 'icon', res.url)"
                                >
                                    <img v-if="item.icon" :src="item.icon" class="avatar">
                                    <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                                </el-upload>
                            </el-form-item>
                            <el-form-item label="冷却消耗">
                                <el-input v-model="item.chillDownConsume"></el-input>        
                            </el-form-item>
                            <el-form-item label="描述">
                                <el-input type="textarea" v-model="item.description"></el-input>        
                            </el-form-item>
                            <el-form-item label="提示">
                                <el-input type="textarea" v-model="item.tips"></el-input>        
                            </el-form-item>
                            <el-form-item>
                                <el-button size="small" type="danger" @click="model.skills.splice(i, 1)">删除</el-button>       
                            </el-form-item>
                        </el-col>
                    </el-row>        
                </el-tab-pane>
            </el-tabs>
            <el-form-item style="margin-top: 1rem;"> 
                <el-button type="primary" native-type="submit">保存</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
    export default {
        props: { 
            id: {}
        },
        data() {
            return {
                model: {
                    name: '',
                    icon: '',
                    scores: {
                        difficulty: 0,
                        skill: 0,
                        attack: 0,
                        survive: 0,
                    },
                    skills: [

                    ],
                },
                categories: [],
                goods:[]
            }
        },
        methods: {
            addSkill() {
                this.model.skills.push({})     
            },
            afterUpload(res) {
                this.model.icon = res.url
            },
            async save() {
                let res // eslint-disable-line no-unused-vars
                if (this.id) {
                    res = await this.$http.put(`rest/heroes/${this.id}`, this.model) 
                } else {
                    res = await this.$http.post('rest/heroes', this.model)
                } 

                this.$router.push('/heroes/list')
                this.$message({
                    type: 'success',
                    message: '保存成功'
                })
            },
            async fetch() {
                const res = await this.$http.get(`rest/heroes/${this.id}`)
                this.model = Object.assign({}, this.model, res.data)
            },
            async fetchCategories() {
                const res = await this.$http.get(`rest/categories`)
                this.categories = res.data.filter((item) => {
                    if (item.parent) {
                       return item.parent.name === 'hero'     
                    }
                    return false
                })
            },
            async fetchGoods() {
                const res = await this.$http.get(`rest/goods`)
                this.goods = res.data
            },
        },
        created() {
            this.fetchGoods()
            this.fetchCategories()  
            this.id && this.fetch()
        }
    }
</script> 
