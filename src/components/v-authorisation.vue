<template>
  <div class="v-authorisation" @keydown.enter="getAuth">
    <h1>Введите Логин и Пароль</h1>
    <p>Логин:</p>
    <input v-model="email" placeholder="Введите Логин">
    <p>Пароль:</p>
    <input 
    v-model="password" 
    placeholder="Введите Пароль"
    type="password">
    <br><br>
    <button class="btn" @click="getAuth">Войти</button>
  </div>
</template>

<script>
import {mapActions} from 'vuex';

export default {
  name: 'vAutorisation',
  components: {},
  props: {},
  data(){
      return  {
        email : "",
        password : ""
              }
  },
  mounted() {},

  methods: {
    ...mapActions([
      'GET_AUTH_FROM_API',
      'GET_MENU',
    ]),

    getAuth(){
      this.GET_AUTH_FROM_API(
        {username: this.email,
        password: this.password}
        )
        .then((response) => {
        if(response.status == 200){
        console.log(response);
        this.GET_MENU();
        this.$router.push('/calendar');
        }
        if(response.response.status == 401){
        alert('Неверные данные пользователя!');
        this.email = null;
        this.password = null;
        }
        })
        },
  }
}
</script>

<style lang="css" scoped>
.v-authorisation{
 margin: 0 auto;
}

input{
font-weight: bold;
font-size: 20px;
text-align: center;  
}

input:focus::placeholder{
color:transparent  
}

.btn{
border-radius: 10px;
padding: 10px;
background: wheat;
border: none;
font-size: 20px;
color: #9f752b ;  
margin: 0 10px;
margin-top: 10px;
}
</style>
