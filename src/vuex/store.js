
import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';
import VueCookies from 'vue-cookies';

Vue.use(Vuex);
Vue.use(VueCookies);


let store = new Vuex.Store({
state: {
    users:[],
    token: null,
    menu:{},
    events:[]
},
mutations: {
    SET_PRODUCTS_TO_STATE: (state,users) =>{
        state.users = users;
        console.log(state.users,'state was updated');
    },
    ADD_USER_TO_STATE: (state) => {
        console.log('Updated state is',state.users);
    },
    SET_AUTH_TO_STATE: (state,login_data) => {
        state.token = login_data.access;
        console.log(state.token)
    },

    DELETE_AUTH: (state) =>{
      state.token = null;  
      state.menu = {};
    },

    SET_AUTHORIZED_MENU: (state,menu) => {
     state.menu = menu;    
    },

    SET_EVENTS: (state,events) => {
        let customEvents = [];
        for (let task of events){
        let customTask = {
            title: task.contract.clientobj.object_name,
            date: task.task_compl
        };
        customEvents.push(customTask)
        }
     state.events = customEvents;
     console.log('new Events is ',state.events);
},
},
actions:{
    GET_USERS_FROM_API({commit}){
        return axios.get ('http://25.50.155.62:8000/getusers/')
        .then((response) =>{
            commit('SET_PRODUCTS_TO_STATE',response.data);
            console.log(response);
            return response;
        })
        .catch((error) => {
            console.log(error);
            return error;
        });
    },

    DELETE_USER_FROM_API({commit},userId){
        return axios.delete ('http://25.50.155.62:8000/signin/'+userId+'/')
        .then((response) =>{
            commit('SET_PRODUCTS_TO_STATE');
            console.log(response,'user was deleted');
            return response;
    }) 
        .catch((error) => {
            console.log(error);
            return error;
    });
    },

    ADD_USER_TO_API({commit,dispatch},user){
        return axios({
            method: 'POST',
            url: 'http://25.50.155.62:8000/signin/',
            data: {
                username: user.username,
                password: user.password,
                status: user.status,
                is_active: user.is_active,
                is_staff: user.is_staff
            },
            headers: {
                "content-type": "application/json"
              },
        })
        .then((response) =>{
            console.log('---',response);
            axios({
             method: 'POST',
             url: 'http://25.50.155.62:8000/users/',
            data: {
                auth: response.data.id,
                first_name: user.first_name,
                last_name: user.last_name,
                thirdname: user.thirdname,
                position: user.position,
                telephone: user.telephone,
                passport: user.passport,
                birthday: user.birthday,
            },
            headers: {
                "content-type": "application/json"
            },
            })
            .then((response) => {
            commit('ADD_USER_TO_STATE',response.data);
            dispatch('GET_USERS_FROM_API');
            console.log(response.data,'user was added');
             })
            })
            .catch((error) => {
             console.log(error);
             return error;
             });  
    },

    CHANGE_USER_IN_API({commit,dispatch},changingParameters){
        return axios ({
            method: 'PUT',
            url: 'http://25.50.155.62:8000/users/'+changingParameters.id+'/',
            data: changingParameters,
            headers: {
                "content-type": "application/json"
              },
        })
        .then((response) =>{
            console.log('response is ',response);
            commit('ADD_USER_TO_STATE');
            dispatch ('GET_USERS_TO_STATE');
            return response;
        })
        .catch((error) => {
            console.log(error);
            return error;
        });  
    },
    GET_AUTH_FROM_API({commit},login_data){
            return axios ({
                method: "POST",
                url: 'http://25.50.155.62:8000/auth/',
                data: {
                    username: login_data.username,
                    password: login_data.password
                },
              })
              .then((response) => {
                commit('SET_AUTH_TO_STATE',response.data);
                Vue.$cookies.set("access",response.data.access);
                Vue.$cookies.set("refresh",response.data.refresh);
                return response;
              })
              .catch((error) => {
                console.log(error);
                console.log(login_data);
                return error;   
              })
        },          
    GET_MENU({commit}){
        return axios ({
            method: "GET",
            url: 'http://25.50.155.62:8000/menu/',
            data:{},
            headers: {
                "Authorization": 'Bearer ' + Vue.$cookies.get('access')
              },
          })
          .then ((response) => {
            commit ('SET_AUTHORIZED_MENU',response.data);
            return response;
          })    
          .catch((error) => {
            console.log(error);
            return error;
          });
        },

    GET_EVENTS({commit}){
        return axios ({
            method: "GET",
            url: 'http://25.50.155.62:8000/gettasks/',
            data:{},
            headers: {
                "Authorization": 'Bearer ' + Vue.$cookies.get('access')
              },
          })
          .then ((response) => {
              commit ('SET_EVENTS',response.data);
             return response;
          })
          .catch((error) => {
            console.log(error);
            return error;
          });
        },

    LOG_OUT({commit}){
            Vue.$cookies.remove('access');
            Vue.$cookies.remove('refresh');
            commit('DELETE_AUTH');
        },

    GET_REFRESH({commit}){
        return axios ({
            method: "POST",
            url: 'http://25.50.155.62:8000/auth/refresh/',
            data: {
                refresh: Vue.$cookies.get('refresh')
            }
        })
        .then((response) => {
            Vue.$cookies.set('access',response.data.access);
            console.log('Refresh-token GOT!');
            commit ('SET_AUTH_TO_STATE',response.data);
                    return response;
        })
        .catch((error) => {
            console.log(error);
        })
    }
    },
getters:{
    USERS(state){
        return state.users;
        },
    MENU(state){
        return state.menu;
        },
    EVENTS(state){
        return state.events;
        }
    },
});

export default store
