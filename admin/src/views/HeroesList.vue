<template>
  <div>
    <h1>英雄列表</h1>
    <el-table :data="items.slice((this.currentPage - 1) * this.pagesize, currentPage * this.pagesize)">
        <el-table-column prop="_id" label="ID" width="250"></el-table-column>
        <el-table-column prop="catagories" label="所属分类">
            <template slot-scope="parents">
                <slot v-for="(id, i) in parents.row.categories">
                    <span v-for="item in categories" v-show="item._id == id" :key="i+item.name">{{i > 0? '，' + item.name : item.name}}</span>
                </slot>
            </template>
        </el-table-column>   
        <el-table-column prop="name" label="名称"></el-table-column>
        <el-table-column prop="title" label="称号"></el-table-column>
        <el-table-column prop="icon" label="头像">
            <template slot-scope="scope">
                <img :src="scope.row.icon" style="height: 3rem" alt="">
            </template>
        </el-table-column>
        <el-table-column fixed="right" label="操作" width="180">
            <template slot-scope="scope">
                <el-button type="text" size="small" @click="toEdit(scope.row._id)">编辑</el-button>
                <el-button type="text" size="small" @click="remove(scope.row)">删除</el-button>
            </template>
        </el-table-column>
    </el-table>
    <el-pagination class="pagination"
    layout="prev, pager, next"
    hide-on-single-page
    :total="total"
    @current-change="currentChange"
    >
    </el-pagination>
  </div>
</template>

<script>
    export default {
        data() {
            return {
                items: [],
                total: 0,
                currentPage: 1,
                pagesize: 10,
                categories:[],
            }
        },
        methods: {
            currentChange(currentPage) {
                this.currentPage = currentPage
            },
            async fetch() {
                const res = await this.$http.get('rest/heroes')
                this.total = res.data.length
                this.items = res.data
            },
            toEdit(id) {
                this.$router.push({path: `/heroes/edit/${id}`})
            },
            async remove(row) {
                this.$confirm(`是否确定要删除英雄 "${row.name}"`, '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(async () => {
                    const res = await this.$http.delete(`rest/heroes/${row._id}`) // eslint-disable-line no-unused-vars
                    this.$message({
                        type: 'success',
                        message: '删除成功!'
                    });
                    this.fetch()
                })
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
        },
        created() {
            this.fetch() 
            this.fetchCategories()
        }
    }
</script>

