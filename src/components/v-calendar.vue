<template>
  <div  class="v-calendar">
  <FullCalendar 
  :options="calendarOptions"
  ref="fullCalendar"
  :selectable="true"
  />
  </div>
</template>


<script>
import FullCalendar from '@fullcalendar/vue'
import dayGridPlugin from '@fullcalendar/daygrid'
import interactionPlugin from '@fullcalendar/interaction'
import ruLocale from '@fullcalendar/core/locales/ru'
import timeGridPlugin from '@fullcalendar/timegrid'
import {mapActions, mapGetters} from 'vuex';
export default {
  name: 'fullCalendar',
  components: {
    FullCalendar // make the <FullCalendar> tag available
  },
  data() {
    return {
      calendarOptions: {
        //
        height: '100vh', //высота каледаря (по высоте окна)
        //это стили
        selectable: true, // возможность выделения дат
        plugins: [ dayGridPlugin, timeGridPlugin,interactionPlugin ],
        initialView: 'dayGridMonth',
        locale: ruLocale,
        events: [],
        dateClick: this.handleDateClick,
        eventClick: this.handleEventClick,
        headerToolbar: {
          left: 'prev,next today',
          center: 'title',
          right: 'dayGridMonth,timeGridWeek,timeGridDay'
        },
      }
    }
  },
  methods: {
    ...mapActions([
    'GET_EVENTS',
    'GET_REFRESH'
  ]),
  //событие при клике на дату
    handleDateClick: function(arg) { 
      //alert('date click! ' + arg.dateStr)
      this.$refs.fullCalendar.getApi().changeView('timeGridDay',arg.date)
    },
    //событие при клике на таск в дате
    handleEventClick: function(arg) {
      alert('Event click! ' + arg.event.title)
    },
  },

  created() {
  this.GET_EVENTS()
  .then((response)=> {
    this.calendarOptions.events = this.EVENTS;
  if (response.response.status == 401){
      this.GET_REFRESH() //метод получения рефреша из апи
      .then((response) => {
         if (response.status == 200){
           this.GET_EVENTS()
           .then((response)=> {
             console.log('Got events to Calendar',this.EVENTS,response)   
             this.calendarOptions.events = this.EVENTS;
           })
         }
       if (response.respose.status == 401){
          this.$router.push('/');
         }
      })
      }
      })
  },

  mounted(){
  },
  
  computed: {
    ...mapGetters([
      'EVENTS'
    ]),
  },
}
</script>

<style>
.v-calendar{
width: 100%;  
background: white;
};

.fc-media-screen{
height: 100vh;  
}

</style>
