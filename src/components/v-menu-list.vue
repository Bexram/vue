<template>
    <div class="v-menu-list">
      <ul class="left-menu">
        <li
        v-for="(menu,index) in MENU"
        @click="goLink(menu.dacobjects.modulehref)"
        :key="index">
        {{menu.dacobjects.dacobjects}}
        </li>
      </ul>
    </div>
</template>

<script>
import {mapActions, mapGetters} from 'vuex';

export default {
name: "v-menu-list",
methods: {
  ...mapActions([
    'GET_MENU',
    'GET_REFRESH'
  ]),
    goLink(link){
      if (link == '/admin/') {
      window.location = 'http://25.50.155.62:8000/admin/';
      }
      this.$router.push(link);
    }
  
  },

created(){
this.GET_MENU()
.then((response)=> {
  if (response.response.status == 401){ //если ошибка
      this.GET_REFRESH() //метод получения рефреша из апи
      .then((response) => {
         if (response.status == 200){
           console.log('ZAEBIS')
           this.GET_MENU()
        }
       if (response.respose.status == 401){
          this.$router.push('/');
         }
      })
      }
      }

)
},
computed: {
    ...mapGetters([
      'MENU'
    ]),
},

}
</script>

<style scoped>
.v-menu-list{
  width: 100%;
}

.menu{
display: flex;
flex-basis: 20%;
flex-direction: column;
align-items: flex-start;
background:#fdf4e3;
border: 1px solid #9f752b;
height: calc(100vh);
}

.left-menu{
margin-top: 0px;
list-style: none;
width: 100%;
padding: 0px;
}

.left-menu li{
width: 100%;
display: block;
border-bottom: 1px solid #9f752b;
padding: 5px 0;
}

.menu a{
 width: 100%;
}

.left-menu li:hover{
background: #9f752b;
color:#f5deb3;
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
</style>