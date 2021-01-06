<template>
  <div>
    <form>
      <div class="row bottom">
            <div class="col">
                <div class="form-group">
                    <label for="date">С</label>
                    <input 
                    v-model="minDate"
                    type="date" 
                    id="date" 
                    class="form-control date"                    
                    />
                </div>
            </div>
            <div class="col">
                <div class="form-group">
                    <label for="date">По</label>
                    <input 
                    v-model="maxDate"
                    type="date" 
                    id="date" 
                    class="form-control date"                    
                    />
                </div>
            </div>            
      </div> 
      <div class="row bottom">
        <div class="col">
          <div class="DoughnutChart">
            <h2 style="color: #fff; padding-bottom: 10px;"><ins>Социальные сети</ins></h2>
            <DoughnutChart :chartData="filteredDate" v-if="minDate" :width="300" />
          </div>
        </div>
        <div class="col">
          <h2 style="color: #fff; padding-bottom: 10px;"><ins>По классификации</ins></h2>
          <PieChart :chartData="filteredDate" v-if="minDate" :width="300" />
        </div>
      </div>
      <div class="row bottom">
        <div class="col BarChart">          
            <h2 style="color: #fff; padding-bottom: 10px;"><ins>По количеству комнат</ins></h2>
            <BarChart :chartData="filteredDate" v-if="minDate" :height="300"  />             
        </div>
      </div>
      <div class="row">
        <div class="col">

        </div>
      </div>
    </form>    
  </div>
</template>
<script>
import DoughnutChart from '@/components/charts/DoughnutChart'
import PieChart from '@/components/charts/PieChart'
import BarChart from '@/components/charts/BarChart'
import _ from 'lodash'
import Moment from 'moment'

export default {
  data: () => ({
    data: [],        
    minDate: '',
    maxDate: '',
    operator: localStorage.getItem("fullname"),
    localdata: []
    
  }),
  async mounted(){
    await this.$store.dispatch('getData')
    this.data = this.$store.getters.getDataSet.data
    this.minDate = this.getMinDate()
    this.maxDate = this.getMaxDate() 
    
  },
  computed:{
        filteredDate: function() {
            let filtered = this.data.filter(date => {
                    return Moment(date.datetimedez, 'YYYY-MM-DD HH:mm:ss').unix() >= Moment(this.minDate, 'YYYY-MM-DD HH:mm:ss').unix() && Moment(date.datetimedez, 'YYYY-MM-DD HH:mm:ss').unix() <= Moment(this.maxDate, 'YYYY-MM-DD HH:mm:ss').unix()
                }).filter(o => {
                    return o.operator === this.operator
                })
                       
            return filtered
        }       

  },
  methods:{
    getMinDate: function() {
            return _.minBy(this.data, 'datetimedez').datetimedez
        },
    getMaxDate: function() {
            return _.maxBy(this.data, 'datetimedez').datetimedez
        }
  },
  components: {
    DoughnutChart, PieChart, BarChart
  }
}
</script>
<style scoped>
  .DoughnutChart{            
    width: 100%;
  }  
  .bottom {
    margin-bottom: 20px;
  }
</style>

