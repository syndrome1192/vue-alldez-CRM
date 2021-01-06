<template>
  <div>
    <form>
      <div class="row">
        <div class="col">
          <div class="form-group">
            <label for="date">С</label>
            <input v-model="minDate" type="date" id="date" class="form-control date" />
          </div>
        </div>
        <div class="col">
          <div class="form-group">
            <label for="date">По</label>
            <input v-model="maxDate" type="date" id="date" class="form-control date" />
          </div>
        </div>
      </div>
      <div class="row">
        <div class="col">
          <div class="form-group">
            <label for="type_object">Фильтр по дезинфекторам</label>
            <select class="form-control" v-model="filterDez" id="type_object">
              <option>Все</option>
              <option>Шайхисламов Нуржан</option>
              <option>Русланов Руслан Русланович</option>
              <option>Иванов Иван Иванович</option>
              <option>Кожемякин Никита Иванович</option>
              <option>Александров Александр Александрович</option>
            </select>
          </div>
        </div>
        <div class="col">
          <div class="form-group">
            <label for="type_object">Фильтр по социальным сетям</label>
            <select v-model="filterSocial" class="form-control" id="type_object">
              <option>Все</option>
              <option>Instagram</option>
              <option>Facebook</option>
              <option>Google</option>
              <option>Yandex</option>
              <option>Mail.ru</option>              
            </select>
          </div>
        </div>
      </div>
      <div class="row">
        <div class="col">
          <div class="form-group">
            <label for="type_object">Фильтр по статусам</label>
            <select v-model="filterStatus" class="form-control" id="type_object">
              <option>Все</option>
              <option>Обработано</option>
              <option>Отказано</option>
              <option>Ожидается</option>
            </select>
          </div>
        </div>
        <div class="col">
          <div class="form-group">
            <label for="type_object">Фильтр по операторам</label>
            <select v-model="filterOperator" class="form-control" id="type_object">
              <option>Все</option>
              <option v-for="operator in operators" :key="operator.operator">{{operator.operator}}</option>              
            </select>
          </div>
        </div>
      </div>
    </form>
    <Loader v-if="loading" />
    <div v-else class="table-responsive">
      <table class="table w_table">
        <thead class="thead-dark">
          <tr>
            <th scope="col">№</th>
            <th scope="col">Наименование заказа</th>
            <th scope="col">Адрес</th>
            <th scope="col">Имя заказчика</th>
            <th scope="col">Телефон</th>
            <th scope="col">Кратность</th>
            <th scope="col">Дезинфектор</th>
            <th scope="col">Гарантия</th>
            <th scope="col">№ Гарантии</th>
            <th scope="col">Сервис заказа</th>
            <th scope="col">Локация</th>
            <th scope="col">Дата добавления</th>
            <th scope="col">Тип объекта</th>
            <th scope="col">Количества комнат</th>
            <th scope="col">Площадь</th>
            <th scope="col">Статус</th>
            <th scope="col">Оператор</th>
            <th scope="col">Цена</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(d, idx) in items"  :key="idx">
            <th scope="row">{{ idx + 1 }}</th>
            <td>{{ d.ordername }}</td>
            <td>{{ d.address}}</td>
            <td>{{ d.clientname }}</td>
            <td>{{ d.phone }}</td>
            <td>{{ d.intervalguaranty }}</td>
            <td>{{ d.dez }}</td>
            <td>{{ d.guaranty }}</td>
            <td>{{ d.numberguaranty }}</td>
            <td>{{ d.social }}</td>
            <td>{{ d.location }}</td>
            <td>{{ d.datetimedez }}</td>
            <td>{{ d.objecttype }}</td>
            <td>{{ d.roomcount }}</td>
            <td>{{ d.square }}</td>
            <td class="yellow" v-if="d.status == 'Ожидается'">{{ d.status }}</td>
            <td class="red" v-else-if="d.status == 'Отказано'">{{ d.status }}</td>
            <td class="green" v-else>{{ d.status }}</td>
            <td>{{ d.operator }}</td>
            <td>{{ d.price }}</td>
          </tr>          
        </tbody>
      </table>
    </div>
    <div class="total">На дату с {{ minDate }} по {{ maxDate  }} Всего: {{total}} </div>
    <div class="pag">
        <Paginate 
            v-model="page"
            :pageCount="pageCount"
            :clickHandler="pageChangeHandler"
            :prevText="'Назад'"
            :nextText="'Вперед'"
            :containerClass="'pagination justify-content-center'"
            :pageClass="'page-item'"
            :pageLinkClass="'page-link'"
            :prevLinkClass="'page-link'"
            :nextLinkClass="'page-link'"
            
        />
    </div>
  </div>
</template>
<script>
import messages from "@/utils/messages";
import PaginationMixin from '@/mixins/pagination.mixin'
import _ from 'lodash'
import Moment from 'moment'
import swal from "sweetalert"
import { required } from "vuelidate/lib/validators"

export default {
  name: 'admin_history',
  mixins: [PaginationMixin],
  data: () => ({
    data: [],
    minDate: '',
    maxDate: '',
    filterDez: 'Все',
    filterSocial: 'Все',
    filterStatus: 'Все',
    filterOperator: 'Все',
    total: 0,
    operators: [],
    loading: true

  }),
  async mounted() {    
    await this.$store.dispatch("getData")
    await this.$store.dispatch("getOperators")
    this.operators = this.$store.getters.getOperators
    this.data = this.$store.getters.getDataSet.data
    if (messages[this.$route.query.message]) {
      this.$toast.warning(messages[this.$route.query.message]);
    }
    this.minDate = this.getMinDate()
    this.maxDate = this.getMaxDate()
    this.loading = false
  },
    computed:{
        filteredDate: function() {
            let filtered = this.data.filter(date => {
                    return Moment(date.datetimedez, 'YYYY-MM-DD HH:mm:ss').unix() >= Moment(this.minDate, 'YYYY-MM-DD HH:mm:ss').unix() && Moment(date.datetimedez, 'YYYY-MM-DD HH:mm:ss').unix() <= Moment(this.maxDate, 'YYYY-MM-DD HH:mm:ss').unix()
                }).filter(dez => {
                    return this.filterDez == 'Все' || dez.dez == this.filterDez;
                }).filter(social => {
                    return this.filterSocial == 'Все' || social.social == this.filterSocial;
                }).filter(status => {
                    return this.filterStatus == 'Все' || status.status == this.filterStatus;
                }).filter(oper => {
                    return this.filterOperator == 'Все' || oper.operator == this.filterOperator;
                })
                       
            return filtered.reverse()
        },
    },
    watch: {
        filteredDate: function(arr){
            this.setupPagination(arr)
            this.totalPrice(arr)            
        }
    },
    methods: {
      getMinDate: function() {
            return _.minBy(this.data, 'datetimedez').datetimedez
        },
      getMaxDate: function() {
            return _.maxBy(this.data, 'datetimedez').datetimedez
        },
      totalPrice: function(arr){
            let totalSum = 0
            for(let i in arr){
                totalSum += arr[i].price
            }
            this.total = totalSum
        }
    }
}
</script>
<style scoped>
  .pag{
        background: rgb(230, 230, 230);
        padding-bottom: 1rem;
        padding-top: 1rem;
    }
  .yellow {
        background: lightyellow;
    }
    .red {
        background: rgba(212, 74, 74, 0.5);
        
    }
    
    .green {
        background:rgba(74, 212, 74, 0.5);
       
    }
</style>