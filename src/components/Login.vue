<template>
    <form id="login-form">
        <div class="form-item username">
            <label for="username">用户名：</label>
            <input id="username" v-model="form.username">
        </div>
        <div class="form-item password">
            <label for="password">密码：</label>
            <input id="password" v-model="form.password" type="password">
        </div>
        <div class="form-item">
            <label >&nbsp;</label>
            <button type="button" @click="login">登录</button>
        </div>
    </form>
</template>
<script>
export default {
    name: 'login_form',
    data() {
        return {
            form: {
                username: 'admin',
                password: '123123'
            },
        }
    },
    methods: {
        async login(){

            this.$store.commit('common/setIsLoading', true)
            
            await this.$store.dispatch('user/Login',{username:this.form.username,password:this.form.password})
            
            if(this.$store.getters['user/isLogin']){
                await this.$store.dispatch('myRoom/GetInfo',{mode:'simple',force:true})
            }
            
            if(this.$store.getters['myRoom/roomId'] > 0){
                await this.$store.dispatch('myGame/GetInfo',{mode:'simple',force:true})
            }
            
            this.$store.commit('common/setIsLoading', false)
            
        }
    }
}
</script>
<style scoped>
    #login-form {
        position: absolute;
        width:240px;
        height:160px;
        padding:20px;
        margin-left:-120px;
        margin-top:-80px;
        box-sizing: border-box;
        left:50%;
        top:50%;
        font-size:20px;
        line-height:20px;
        background:rgba(70, 70, 70, 0.856);
        overflow:hidden;
        border-radius: 10px;
        color:#fff
    }

    #login-form > .form-item{
        width: 200px;
        height:40px;
    }

    #login-form > .form-item > label {
        width:80px;
        display:block;
        float:left;
        text-align:right;
    }

    #login-form > .form-item > input {
        width:110px;
        display:block;
        float:left;
        font-size:18px;
    }
    #login-form > .form-item > button {
        width:110px;
        height:30px;
        border:1px solid #333;
        padding: 0 2px;
        display:block;
        background:rgb(219, 219, 219);
        float:left;
        box-sizing:content-box;
    }
</style>