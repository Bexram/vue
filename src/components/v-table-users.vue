<template>
  <div class="v-table-users">
    <div class="table-header">
      <h1>Пользователи</h1>
 <router-link :to="{name:'editUser',params: {createNewUser: true}}">
    <button class="btn">+ Добавить пользователя</button>
     </router-link>
    </div>
    <table>
    <tr>
      <td>Фамилия</td>
      <td>Имя</td>
      <td>Отчество</td>
      <td>Активный</td>
      <td>E-mail</td>
      <td>Должность</td>
      <td>Телефон</td>
      <td>Дата рождения</td>
      <td>Изменить/удалить</td>
    </tr>
    <tr v-for="(user,index) in USERS" :key="user.username.id">
        <td>{{ user.userprofile.last_name }}</td>
        <td>{{ user.userprofile.first_name }}</td>
        <td>{{ user.userprofile.thirdname }}</td>
        <td>{{ user.is_active ? 'да' : 'нет' }}</td>
        <td>{{ user.userprofile.email }}</td>
        <td>{{ user.userprofile.position }}</td>
        <td><a href="$user.telephone">{{ user.telephone }}</a></td>
        <td>{{ user.userprofile.birthday }}</td>
        <td>
          <router-link :to="{name:'editUser',params: {userPos: index, editUser: true}}">
            <button 
            :disabled="user.username == 'bexram'" 
            class="edit_btn"
            >Редактировать
            </button>
          </router-link>
            <button 
            @click="deleteUser(user.id)" 
            :disabled="user.username == 'bexram'"
            class="delete_btn"
            >Удалить
            </button>
        </td>
      </tr>
    </table>
  </div>
</template>

<script>
import {mapActions, mapGetters} from 'vuex'

export default {
  name: 'v-table-users',
  components: {

  },
  data() {
    return {
      users:{},
      needId:'',
    }
  },

created(){
  this.GET_USERS_FROM_API();
},

methods: {
    ...mapActions([
      'GET_USERS_FROM_API',
      'DELETE_USER_FROM_API',
      'GET_REFRESH'
    ]),    
    deleteUser(needId){
      this.userId = needId;
      console.log('user id is ',this.userId);
      this.DELETE_USER_FROM_API(this.userId)
      .then((response) => {
        console.log('User with id '+needId+ ' was deleted');
        this.GET_USERS_FROM_API();
      console.log(response,'Table got users from API');
    })
    },
    
    checkAuth(error){
      if(error){
        console.log('have error',error);
      }
    }
  },
  
  // mounted() {
  //   // this.AUTHORIZATION()
  //   // .then((response) => {
  //   //   if (response.response.status == 401){
  //   //   //метод получения рефреша из апи
  //   //   this.GET_REFRESH()
  //   //   .then((response) => {
  //   //      if (response.status == 200){
  //   //        console.log('ZAEBIS')
  //   //     }
  //       // if (response.respose.status == 401){
  //       //  this.$router.push('/');
  //       // }
  //     //})
  //     }
  //     if (response.status !== 200 && 201){
  //     console.log('you have 401 error');
  //     this.$router.push('/');
  //     }
  //   })
  // },

  computed: {
    ...mapGetters([
      'USERS'
    ]),
  },

  beforeRouteUpdate() {
    console.log('GOT IT!');
    this.GET_USERS_FROM_API();
  }

}
</script>

<style lang="css" scoped>
.v-table-users{
width: 100%;  
}


table{
border-spacing: 0px;
max-width: 100%;
width: 100%; 
font-weight: bold;
background: rgba(255,255,255,0.8);
border: 1px solid #9f752b;  
}

tr,td{
  border:1px solid #9f752b;
}

.table-header{
display: flex;
flex-direction: row;
align-self: flex-start;
background: rgba(255,255,255,0.8);
}

.table-header a{
display: flex;
justify-content: center;
align-items: center;  
}

.table-header a button{
margin: 10px;  
}

.component_heading{
display: block;
height: 35px;  
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
font-size: 15px;
font-weight: bold;
font-family: inherit ;
}

.edit_btn{
border: none;
background: wheat;
font-weight: bold;
color: #9f752b;
padding: 5px;
margin: 5px 5px;
border-radius: 5px;
}

.delete_btn{
border: none;
background: #9f752b;
font-weight: bold;
color: #fdf4e3;
padding: 5px;
margin: 5px 5px;  
border-radius: 5px;
}
</style>
