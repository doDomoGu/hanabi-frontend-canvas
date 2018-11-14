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
        login(){
            this.$store.dispatch('user/Login',{username:this.form.username,password:this.form.password}).then(()=>{

                this.$store.dispatch('myRoom/GetInfo',{mode:'simple',force:true}).then(()=>{

                    if(this.$store.getters['myRoom/roomId'] > 0) {

                        this.$store.dispatch('myGame/GetInfo',{mode:'simple',force:true})

                    }

                })
            })
        }
    }
}
</script>
<style scoped>
    #login-form {
        margin:-120px;
        width:300px;
        position: absolute;
        left:50%;
        top:400px;
        font-size:12px;
        line-height:20px;
    }

    #login-form > .form-item{
        width: 200px;
        height:30px;
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
    }
    #login-form > .form-item > button {
        width:60px;
        height:20px;
        border:1px solid #333;
        display:block;
        float:left;
    }
</style>