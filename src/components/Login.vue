<template>
    <div>
        <div id="title">Hanabi</div>
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
                <button type="button" @click="login">登录</button>
            </div>
        </form>
    </div>
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
    #title {
        font-family:'Courier New', Courier, monospace;
        position: absolute;
        width:200px;
        height:40px;
        margin-left:-100px;
        margin-top:-140px;
        box-sizing: border-box;
        left:50%;
        top:50%;
        font-size:40px;
        font-weight: bolder;
        text-align: center;
        overflow:hidden;
        line-height:30px;
        color:#ffffff;
    }
    #login-form {
        position: absolute;
        width:280px;
        height:160px;
        padding:20px;
        margin-left:-140px;
        margin-top:-80px;
        box-sizing: border-box;
        left:50%;
        top:50%;
        background:#CCCCCC;
        overflow:hidden;
        border-radius: 10px;
        color:#333333;
        -webkit-box-shadow: 5px 5px 5px rgb(70, 70, 70);
        -moz-box-shadow: 5px 5px 5px rgb(70, 70, 70);
        box-shadow: 5px 5px 5px rgb(70, 70, 70);
    }

    #login-form > .form-item{
        width: 240px;
        height: 44px;
        overflow: hidden;
        margin:0;
    }

    #login-form > .form-item > label {
        width:80px;
        display:block;
        float:left;
        text-align:right;
        margin:0;
        padding:0;
        font-size:18px;
        line-height:30px;
    }

    #login-form > .form-item > input {
        width:160px;
        height:30px;
        padding:4px 10px;
        display:block;
        float:left;
        font-size:20px;

        border:none;
        border-radius: 4px;
        box-sizing: border-box;
    }
    #login-form > .form-item > button {
        width:240px;
        height:30px;
        padding: 0 2px;
        display:block;
        background:#336699;
        color:#ffffff;
        float:left;
        border:none;
        font-size:18px;
        letter-spacing: 10px;
    }
</style>