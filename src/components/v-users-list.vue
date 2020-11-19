<template>
  <div class="v-users-list">
    <div class="menu">
    <v-menu-list/>
         <router-link :to="{name:'vAuthorisation'}">
     <button class="btn">👤 Авторизация</button>
     </router-link>
     <router-link :to="{name: 'vAuthorisation'}">
       <button @click="logOut" class="btn">⬅ Выйти</button>
     </router-link>
    </div>
    <router-view ></router-view>
    </div>
</template>

<script>
import vMenuList from './v-menu-list'
import {mapActions} from 'vuex'

export default {
  name: 'v-users-list',
  components: {
    vMenuList
  },
  props: {},
  data() {
    return {}
  },
  methods: {
    ...mapActions([
      'LOG_OUT'
    ]),

    goLink(index){
     if (index == 1){
      this.$router.push('campaign_info'); 
        }   
      },
      logOut() {
        this.LOG_OUT();
      }
    },

}


</script>

<style lang="css">
td,table,tr{
border: 1px solid black;  
}

td{
padding: 0 5px;  
}


.v-users-list{
display: flex;
flex-direction: row;
position: absolute;
left: 0px;
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

h1{
text-align: center;
width: 100%; 
font-size: 25px; 
}

router-view{
display: flex !important;
flex-direction: column;
flex-basis: 80%;
justify-content: center; 
margin: 0 auto; 
}


</style>
