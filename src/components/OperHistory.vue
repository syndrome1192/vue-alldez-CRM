<template>
    <div>
        
        <div class="row">
            <div class="col">
                <div class="form-group">
                    <label for="date">С</label>
                    <input 
                    type="date" 
                    id="date" 
                    class="form-control date"
                    v-model="minDate" 
                    />
                </div>
            </div>
            <div class="col">
                <div class="form-group">
                    <label for="date">По</label>
                    <input 
                    type="date" 
                    id="date" 
                    class="form-control date"
                    v-model="maxDate" 
                    />
                </div>
            </div>            
        </div> 
        <div class="row">
            <div class="col">
                <div class="form-group">                    
                    <label for="date">Поиск по № Гарантии</label>
                    <div class="input-group mb-2 mr-sm-2">
                        <div class="input-group-prepend">
                            <div class="input-group-text"><i class="fa fa-search" aria-hidden="true"></i></div>
                        </div>
                        <input 
                        type="text" 
                        id="date" 
                        class="form-control date"
                        v-model.trim="inputSearch" 
                        />
                    </div>
                </div>
            </div>
            <div class="col">
            </div>
        </div>
        <div class="table-responsive mrgn">
        <form @submit.prevent="statusCheck"> 
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
                    <th scope="col">Дата обработки</th>
                    <th scope="col">Статус</th>
                    <th scope="col">Изменить статус</th>
                    <th scope="col">Тип объекта</th>
                    <th scope="col">Количества комнат</th>
                    <th scope="col">Площадь</th>
                    <th scope="col">Цена</th>
                </tr>
                </thead>
                
                <tbody>
                <tr  v-for="(d, idx) in items"  :key="idx">
                    <th scope="row">{{ idx + 1}}</th>
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
                    <td class="yellow" v-if="d.status == 'Ожидается'">{{ d.status }}</td>
                    <td class="red" v-else-if="d.status == 'Отказано'">{{ d.status }}</td>
                    <td class="green" v-else>{{ d.status }}</td>
                    <td style="text-align: center">
                    <div class="form-check">
                        <input
                        class="form-check-input"
                        type="radio"
                        name="gridRadios"
                        v-model="typeRadio"
                        id="gridRadios1"
                        :value="d.id"
                        />
                    </div>
                    </td>
                    <td>{{ d.objecttype }}</td>
                    <td>{{ d.roomcount }}</td>
                    <td>{{ d.square }}</td>
                    <td>{{ d.price }}</td>
                </tr>                     
                </tbody>            
            </table>        
                <div class="form-row">
                    <div class="col">
                    <div class="form-group">
                        <select 
                        class="form-control"
                        :class="{ 'is-invalid': $v.status.$dirty && !$v.status.required }" 
                        id="interval"
                        v-model="status"
                        >
                            <option>Ожидается</option>
                            <option>Обработано</option>
                            <option>Отказано</option>
                        </select>
                        <div
                            class="invalid-feedback"
                            v-if="$v.status.$dirty && !$v.status.required"
                        >
                            Поле статус не должно быть пустым.
                        </div>
                    </div>
                    </div>
                    <div class="col">
                    <button type="submit" class="btn btn-primary">Изменить</button>
                    </div>
                </div> 
        </form>
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
import _ from 'lodash'
import Moment from 'moment'
import PaginationMixin from '@/mixins/pagination.mixin'
import swal from "sweetalert"
import { required } from "vuelidate/lib/validators"

export default {
    name: 'OperHistory',
    mixins: [PaginationMixin],
    props: ["data", "operator"],
    data: () => ({
        dataProps: [],
        minDate: '',
        maxDate: '',
        inputSearch: '',
        total: 0,
        status: '',
        typeRadio: 0
             
    }),
    validations:{
        status: {required}
    },
    computed:{
        filteredDate: function() {
            let filtered = this.dataProps.filter(date => {
                    return Moment(date.datetimedez, 'YYYY-MM-DD HH:mm:ss').unix() >= Moment(this.minDate, 'YYYY-MM-DD HH:mm:ss').unix() && Moment(date.datetimedez, 'YYYY-MM-DD HH:mm:ss').unix() <= Moment(this.maxDate, 'YYYY-MM-DD HH:mm:ss').unix()
                }).filter(g => {
                    return this.inputSearch == '' || g.numberguaranty.toLowerCase().indexOf(this.inputSearch.toLowerCase()) !== -1
                }).filter(o => {
                    return o.operator === this.operator
                })
                       
            return filtered.reverse()
        }       

    },
    watch: {
        filteredDate: function(arr){
            this.setupPagination(arr)
            this.totalPrice(arr)
        }
    },
    mounted() {
        this.dataProps = this.data                     
        this.minDate = this.getMinDate()
        this.maxDate = this.getMaxDate() 
        
        
    },
    methods: {
        getMinDate: function() {
            return _.minBy(this.dataProps, 'datetimedez').datetimedez
        },
        getMaxDate: function() {
            return _.maxBy(this.dataProps, 'datetimedez').datetimedez
        },
        totalPrice: function(arr){
            let totalSum = 0
            for(let i in arr){
                totalSum += arr[i].price
            }
            this.total = totalSum
        },
        async statusCheck(){
            if (this.$v.$invalid) {
                    this.$v.$touch();
                    return;
            }

            if(this.typeRadio != 0){
                const data = {
                    status: this.status,
                    id: this.typeRadio
                }
                await this.$store.dispatch('updateStatus', data)                

                if(this.$store.getters.getStatusCheck == 'success'){
                     swal({
                        title: "Успех",
                        text: "Статус успешно обновлен",
                        icon: "success",
                        button: "ОК",
                    })
                    await this.$store.dispatch('getData')
                    this.dataProps = this.$store.getters.getDataSet.data
                   
                }else{
                    swal({
                        title: "Ошибка",
                        text: "Пожалуйста обратитесь к администратору",
                        icon: "error",
                        button: "ОК",
                    })
                }

            }else{
                swal({
                        title: "Предупреждение",
                        text: "Вы не выбрали статус",
                        icon: "warning",
                        button: "ОК",
                    })
            }
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
