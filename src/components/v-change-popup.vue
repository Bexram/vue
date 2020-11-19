<template>
  <div class="v-change-popup">
    <router-link :to="{name:'vTableUsers'}">
    <button class="close-button">X</button>
    </router-link>
    <div class="v-user-info" v-if="editUser">
    <div class="edit_field">
    <p>Пользователь: {{USERS[userPos].username}}</p>
    <p>Никнейм: <input class="edit_input" v-model="USERS[userPos].userprofile.username"></p>
    <p>Имя: <input class="edit_input" v-model="USERS[userPos].userprofile.first_name"></p>
    <p>Фамилия: <input class="edit_input" v-model="USERS[userPos].userprofile.last_name"></p>
    <p>Отчество: <input class="edit_input" v-model="USERS[userPos].userprofile.thirdname"></p>
    <p>Email: <input class="edit_input" v-model="USERS[userPos].userprofile.email"></p>
    <p>Должность: <input class="edit_input" v-model="USERS[userPos].userprofile.position"></p>
    <p>Дата рождения: <input class="edit_input" v-model="USERS[userPos].userprofile.birthday"></p>
    <p>Телефон: <input class="edit_input" v-model="USERS[userPos].userprofile.telephone"></p>
    <p>Паспорт: <input class="edit_input" v-model="USERS[userPos].userprofile.passport"></p>
    <p>Active <input v-model="USERS[userPos].is_active"></p>
     <router-link :to="{name:'vTableUsers'}">
    <button 
    @click="editProfile(USERS[userPos])"
    class="btn"
    >Сохранить
    </button>
     </router-link>
     </div>

  </div>
  <div class="v-new-user" v-if="createNewUser">
    <h2>Добавить пользователя</h2>
    <p>Username: <input v-model="newUser.username"></p>
    <p>Password: <input v-model="newUser.password"></p>
    <p>Status: <input v-model="newUser.status"></p>
    <p>FirstName: <input v-model="newUser.first_name"></p>
    <p>LastName: <input v-model="newUser.last_name"></p>
    <p>E-mail: <input v-model="newUser.email"></p>
    <p>position: <input v-model="newUser.position"></p>
    <p>thirdname: <input v-model="newUser.thirdname"></p>
    <p>Telephone: <input v-model="newUser.telephone"></p>
    <p>Birthday: <input v-model="newUser.birthday" placeholder="YYYY-MM-DD"></p>
    <p>Passport: <input v-model="newUser.passport"></p>
    <!-- Router is in method addUser() -->
    <button 
    @click="addNewUser"
    class="btn"
    >Добавить
    </button>
    
  </div>
  </div>
</template>

<script>
import {mapActions, mapGetters} from 'vuex'

export default {
  name: 'v-change-popup',
  components: {},
  data() {
    return {
      typeError: false,
      newUser:{
      "username": '',
      "password": '',
      "status": 1,
      "is_staff": 1,
      "is_active": 1,    
      "first_name": '',
      "last_name": '',
      "email": '',
      "thirdname": '',
      "position": '',
      "telephone": '',
      "birthday": '',
      "passport": '',
      },
    }
  },
  props:[
    'userPos',
    'editUser',
    'createNewUser'
    ],

  methods:{
    ...mapActions([
      'GET_USERS_FROM_API',
      'ADD_USER_TO_API',
      'CHANGE_USER_IN_API',
      'AUTHORIZATION',
    ]),
    addNewUser(){
      if((this.newUser.birthday[4] !== '-') + (this.newUser.birthday[7]!== '-')){
      this.typeError = true;  
      }
      else this.typeError = false;
      if (this.typeError){
      alert('Укажите дату рождения в правильном формате!');
      }
      else {
      let user = this.newUser;
      this.ADD_USER_TO_API(user);
      this.$router.push({name: 'vTableUsers'})
      }
  },
    editProfile(data){
      let changingParameters = data;
      this.CHANGE_USER_IN_API(changingParameters.userprofile);
      console.log('changing user is ',changingParameters.userprofile.id);
    }
  //  editUser(){

    //}
  },
  
  mounted() {
    this.GET_USERS_FROM_API()
    this.AUTHORIZATION();
  },

  computed: {
    ...mapGetters([
      'USERS'
    ])
  }
}
</script>

<style lang="css" scoped>
.v-change-popup{
 display:block;
 width: 500px;
 z-index:999; 
 border: 1px solid black;
background: rgba(255,255,255,0.8);
margin: 20px auto 0 auto;
padding: 20px;
position: relative;  
}

.close-button{
position: absolute;
right: 10px;
top: 10px;  
}

input:focus{
  outline: 1px solid #9f752b;

}

.edit_field{
display: flex;
flex-direction: column;  
justify-content: space-between;
}

.edit_field p{
margin: 0;
}

.edit_input{
display: inline;  
}

.fade-enter-active, .fade-leave-active {
  transition: opacity .5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active до версии 2.1.8 */ {
  opacity: 0;
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
