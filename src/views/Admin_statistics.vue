<template>
  <div>
    <form>
      <div class="row">
        <div class="col">
          <div class="form-group">
            <label for="social">Фильтр по операторам</label>
            <select v-model="operator" class="form-control" id="type_object">
              <option>Все</option>
              <option v-for="operator in getOper" :key="operator.operator">{{operator.operator}}</option>              
            </select>
          </div>
        </div>
        <div class="col">
          <div class="form-group">
            <label for="social">Фильтр по дезинфекторам</label>
            <select v-model="dez" class="form-control" id="type_object">
              <option>Все</option>
              <option v-for="dez in getDez" :key="dez.fullname">{{dez.fullname}}</option>              
            </select>
          </div>
        </div>
      </div>      
      <div class="row">
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
    getOper: [],
    getDez: [],
    operator: 'Все',
    dez: 'Все'
  }),
  async mounted(){
    await this.$store.dispatch('getData')
    await this.$store.dispatch("getOperators")
    await this.$store.dispatch("getDez")
    this.getOper = this.$store.getters.getOperators    
    this.getDez = this.$store.getters.getDezData.filter(d => d.status === 1)
    this.data = this.$store.getters.getDataSet.data
    this.minDate = this.getMinDate()
    this.maxDate = this.getMaxDate() 
    
    
  },
  computed:{
        filteredDate: function() {
            let filtered = this.data.filter(date => {
                    return Moment(date.datetimedez, 'YYYY-MM-DD HH:mm:ss').unix() >= Moment(this.minDate, 'YYYY-MM-DD HH:mm:ss').unix() && Moment(date.datetimedez, 'YYYY-MM-DD HH:mm:ss').unix() <= Moment(this.maxDate, 'YYYY-MM-DD HH:mm:ss').unix()
                }).filter(operator => {
                    return this.operator === 'Все' ||  operator.operator === this.operator
                }).filter(dez => {
                    return this.dez === 'Все' || dez.dez === this.dez
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