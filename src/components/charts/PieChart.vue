<script>
import Chart from 'chart.js'
import { Pie, mixins } from 'vue-chartjs'
export default {
    extends: Pie,
    name: 'piechart',    
    props: {
    chartData: {
      type: Array,
      required: true,
      default: null
     }
    },
    data: () => ({
        labels: [],
        label: '',
        data: [],
        options: [],
        operator: localStorage.getItem("fullname"),
        legend: {
            legend: {
                    display: true,
                    labels: {
                        fontColor: '#fff'
                    }
                },
            maintainAspectRatio:false
        }
       
        
    }),
    mounted() {   
               
            this.setDataVal
    },   
    watch: {
        chartVal () {
            this.$data._chart.destroy()           
            this.setDataVal
        }
    },
    computed: {
        
        chartVal: function() {
            return this.chartData
        },
        
        setDataVal(){
            this.labels = Array.from(new Set(this.chartVal.map(d => d.ordername)))
            this.options = this.labels.map(l => {                
                return this.chartVal.reduce((total, d) => {
                                        if(d.ordername === l){
                                            total += 1
                                        }                                        
                                        return total
                                    }, 0)
            })
            
            this.renderChart({                
                labels: this.labels,                
                datasets: [
                    {
                        label: 'По количеству комнат',
                        backgroundColor: [
                            'rgba(255, 99, 132, 0.8)',
                            'rgba(186, 6, 180, 0.8)',
                            'rgba(93, 222, 102, 0.8)',
                            'rgba(75, 192, 192, 0.8)',
                            'rgba(153, 102, 255, 0.8)',
                            'rgba(255, 159, 64, 0.8)'
                        ],
                        data: this.options
                    }
                ]
            }, this.legend)
        }
    }
}
</script>