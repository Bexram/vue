<template>
  <div id="app">
    
<div class="header">
<div class="logo">
<img src="./assets/logo.png"/>
</div>
<div class="head_description">
<h1>ГРУППА КОМПАНИЙ<br> "СЕВЕРО-ЗАПАДНАЯ <br>СЛУЖБА БЕЗОПАСНОСТИ"</h1>
</div>
<div class="contacts">
<p>
	г.Санкт-Петербург, Профессора Качалова 7А<br>
	Тел.: <a href="88122004555">(812) 200-4555</a>
</p>	
<p>
	г.Москва, Ленинградский пр.72 к.4<br>
	Тел.: <a href="tel:84954812224">(495) 481-2224</a>
</p>
</div>
<div class="site_header">
<p><a href="http://службабезопасности.рф/">службабезопасности.рф</a></p>
<p><a href="sale@szsb.гu">sale@szsb.гu</a></p>
</div>
  </div>
    <v-users-list/>
  </div>
</template>

<script>
import vUsersList from './components/v-users-list'

export default {
  name: 'App',
  components: {
    vUsersList,
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  max-width: 100%;
  width: 100%;
}

body{
  margin: 0px;
  background:url('https://www.vippng.com/png/full/59-593098_technology-background-white-png-ferris-wheel.png') no-repeat;
  background-size: auto;
  background-size: cover;
}

h1{
font-size: 25px;  
}

a{
 color:#9f752b ;
 text-decoration: none;
}

a:hover{
 color:#361f12; 
}

.header{
display: flex;
flex-direction: row;
height: auto;
background-color: #fdf4e3;	
border-bottom: 1px solid #9f752b;
}

.header img{
width: 75px;
height: auto;	
margin-right: 10px;
}

.header div{
display: flex;
justify-content: center;
align-items:center;  
flex-direction: column;  
}

.header p{
  margin: 5px;  
}

.header .logo{
flex-basis: 10%;	
}

.header .head_description{
flex-basis: 32.5%;	
text-align: center;
}

.head_description h1{
text-align: left;
}


.header .contacts{
flex-basis: 37.5%;  
align-items:flex-start !important;
}

.header .contacts p{
width: 100%;;  
}

.header .site_header{
flex-basis: 20%;
justify-content: space-around !important;
}

.header .site_header a{
    border-radius: 10px;
    padding: 10px;
    background: wheat;    
}

.header .tel_header{
display: flex;
justify-content: center;
align-items: center;
}
</style>
