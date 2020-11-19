import Vue from 'vue';
import Router from 'vue-router';
import vMenuList from '../v-menu-list';
import vTableUsers from '../v-table-users';
import vChangePopup from '../v-change-popup';
import vAuthorisation from '../v-authorisation';
import vCampaignInfo from '../v-campaign-info';
import FullCalendar from '../v-calendar';
import vPersonalEvents from '../v-personal-events';
Vue.use(Router);

let router = new Router ({


    routes:[
    {
        path:'/',
        name: 'fullCalendar',
        component: FullCalendar
    },
    {
        path:'/login',
        name:'vAuthorisation',
        component: vAuthorisation,
        props:true,
    },
        {
        path:'/users',
        name:'vTableUsers',
        component: vTableUsers,
        props: true,
        },
        {
        path:'/edit_user',
        name:'editUser',
        component: vChangePopup,
        props:true
        },
        {
        path:'/campaign_info',
        name: 'vCampaignInfo',
        component: vCampaignInfo,
        },
        {
        path:'/menu',
        name: 'menu',
        component: vMenuList
        },
        {
        path:'/personalevents',
        name:'vPersonalEvents',
        component: vPersonalEvents
        }
]
});

export default router;