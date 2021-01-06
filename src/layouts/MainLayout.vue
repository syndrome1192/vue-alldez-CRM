<template>
  <div class="wrapper d-flex align-items-stretch">
    
    <Navbar v-if="flag" />
    <Adminbar v-else />

    <!-- Page Content  -->
    <div id="content" class="p-4 p-md-5 pt-5">
      <div class="container">
        <router-view />
      </div>      
    </div>    
    {{date}}
    <Toasts
      :show-progress="true"
      :rtl="false"
      :max-messages="5"
      :time-out="3000"
      :closeable="true"
    ></Toasts>
  </div>
</template>

<script>
import Navbar from '@/components/app/Navbar.vue'
import Adminbar from '@/components/app/Adminbar.vue'
import Moment from 'moment'


export default {
  name: 'main-layout',
  components: {
    Navbar, Adminbar
  },
  data: () => ({
    date: '',
    flag: true
    
  }), 
  mounted(){
    this.success 
    this.isAdmin  

    if(localStorage.getItem('lifecycle') != null){
      var res = localStorage.getItem('lifecycle').split(',')

      let total_date = []

      let minute_date = String(Number(res[4]))
      let hour_date = String(Number(res[3]) + 1)
      if (hour_date == '24'){
        hour_date = '23'
        minute_date = '59'
      }
      let day_date =  String(Number(res[2]))
      let month_date = String(Number(res[1]))
      let year_date = String(Number(res[0]))
      
      total_date.push(year_date)
      total_date.push(month_date)
      total_date.push(day_date)
      total_date.push(hour_date)
      total_date.push(minute_date) 
      total_date.join()    
      console.log(total_date)
      
      
      setInterval(() => {
        this.date = Moment(total_date, "YYYYMMDDHHmm").fromNow()
        let list_date = this.date.split(" ")
        let without_digit = list_date.slice(1).join(" ")        
        if(this.date == 'a few seconds ago' || without_digit == 'hours ago' || this.date == 'an hour ago' || without_digit == 'minutes ago' || without_digit == 'a day ago'){

            this.$store.dispatch("logout")

        }
      }, 1000)
      
      
    }
  
  },
  computed: {
    success() {
      const fullname = localStorage.getItem('fullname')
      this.$toast.success("Добро пожаловть " + fullname) 
        
      
    },
    isAdmin(){
      if(localStorage.getItem("isAdmin") === "1"){
        this.flag = false
      }
  
    }
  }
  
}
</script>