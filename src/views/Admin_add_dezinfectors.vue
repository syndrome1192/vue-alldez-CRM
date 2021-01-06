<template>
  <div>
    <form @submit.prevent="submitHandler">
      <div class="row">
        <div class="col">
          <div class="form-group">
            <label for="formGroupExampleInput">Ф.И.О</label>
            <input 
            type="text" 
            class="form-control"
            v-model="fullname" 
            :class="{ 'is-invalid': $v.fullname.$dirty && !$v.fullname.required }"
            />
            <div
                class="invalid-feedback"
                v-if="$v.fullname.$dirty && !$v.fullname.required"
            >
                Поле Ф.И.О  не должно быть пустым.
            </div>
          </div>
        </div>
        <div class="col">
          <div class="form-group">
            <label for="formGroupExampleInput">Номер телефона</label>
            <masked-input 
                  v-model="phone" 
                  type="text" 
                  mask="\+\7 (111) 111-11-11"
                  class="form-control"
                  :class="{ 'is-invalid': $v.phone.$dirty && !$v.phone.required }" 
                  id="telephone"
            />
            <div
                class="invalid-feedback"
                v-if="$v.phone.$dirty && !$v.phone.required"
            >
                Поле Номер телефона не должно быть пустым.
            </div>
          </div>
        </div>
      </div>
      <div class="row">
        <div class="col">
          <div class="form-group">
            <label for="social">Статус</label>
            <select v-model="status" class="form-control" id="social">              
              <option value="1">Активный</option>
              <option value="0">Уволен</option>
            </select>
          </div>
        </div>
      </div>
      <button type="submit" class="btn btn-info">Отправить</button>
    </form>
    <hr />
    <form>
      <div class="row">
        <div class="col">
          <div class="form-group">
            <label for="exampleFormControlSelect1">Фильтры по сатусам</label>
            <select v-model="filteredStatus" class="form-control" id="exampleFormControlSelect1">
              <option value="Все">Все</option>
              <option value="1">Активный</option>
              <option value="0">Уволен</option>
            </select>
          </div>
        </div>
        <div class="col">
          <div class="form-group">
            <label for="formGroupExampleInput2">Поиск по Ф.И.О</label>
            <input
              type="text"
              class="form-control"
              id="formGroupExampleInput2"
              v-model="filteredSearch"
            />
          </div>
        </div>
      </div>
    </form>

    <hr />
    <div class="table-responsive">
      <table class="table">
        <thead class="thead-dark">
          <tr>
            <th scope="col">№</th>
            <th scope="col">Ф.И.О</th>
            <th scope="col">Телефон</th>
            <th scope="col">Статус</th>
            <th scope="col">Редактировать</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(d, idx) in items"  :key="idx">
            <th scope="row">{{ idx + 1}}</th>
            <td>{{d.fullname}}</td>
            <td>{{d.phone}}</td>
            <td style="background: rgba(74, 212, 74, 0.5);" v-if="d.status == 1">Активный</td>
            <td style="background: rgba(212, 74, 74, 0.5);" v-else>Уволен</td>
            <td style="text-align: center">
              <button type="submit" class="btn btn-primary" @click="addId(d.id)" data-toggle="modal" data-target="#editModal">
                <i class="fa fa-pencil-square-o" aria-hidden="true"></i>
              </button>
            </td>
          </tr>          
        </tbody>
      </table>
    </div>
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
    <!-- Modal -->
    <div class="modal fade" id="editModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">Редактировать</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <form @submit.prevent="addUpdateHundler">
                <div class="form-group">
                  <label for="message-text" class="col-form-label modal-text">Ф.И.О:</label>
                  <input type="text" v-model="modalFullName" class="form-control" id="recipient-name">
                </div>
                <div class="form-group">
                  <label for="message-text" class="col-form-label modal-text">Статус:</label>
                  <select v-model="modalStatus" class="form-control" id="exampleFormControlSelect1">                  
                    <option value="1">Активный</option>
                    <option value="0">Уволен</option>
                  </select>
                </div>
                <div class="form-group">
                  <label for="message-text" class="col-form-label modal-text">Телефон:</label>
                  <masked-input 
                    v-model="modalPhone" 
                    type="text" 
                    mask="\+\7 (111) 111-11-11"
                    class="form-control" 
                    id="telephone"
                  />
                </div>
                <div class="modal-footer">            
                  <button type="submit" class="btn btn-success">Изменить</button>
                </div>
            </form>
          </div>          
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import MaskedInput from "vue-masked-input";
import { required } from "vuelidate/lib/validators"
import PaginationMixin from '@/mixins/pagination.mixin'
import swal from "sweetalert"

export default {
  name: "dezinfectors",
  mixins: [PaginationMixin],
  data: () => ({
    fullname: '',
    phone: '',
    status: 1,
    data: [],
    filteredSearch: '',
    filteredStatus: 'Все',
    modalFullName: '',
    modalStatus: 0,
    modalIdUser: 0,
    modalPhone: '',

  }),
  validations: {
    fullname: {required},
    phone: {required}
  },
  computed:{
        filteredDate: function() {
            let filtered = this.data.filter(d => {
                    return this.filteredSearch == '' || d.fullname.toLowerCase().indexOf(this.filteredSearch.toLowerCase()) !== -1;
                }).filter(d => {
                    return this.filteredStatus == 'Все' || d.status == this.filteredStatus;
                })
                       
            return filtered.reverse()
        },
        
  },
  watch: {
        filteredDate: function(arr){
            this.setupPagination(arr)                        
        }
  },
  async mounted(){
    await this.$store.dispatch("getDez")
    this.data = this.$store.getters.getDezData
  },
  methods: {
   async addUpdateHundler(){
      const formData = {
              fullname: this.modalFullName,
              phone: this.modalPhone,              
              status: this.modalStatus,              
              id: this.modalIdUser
            }
      await this.$store.dispatch("updateDez", formData)
                       .then(() => {
                         swal({
                                title: "Успех", 
                                text: 'Данные успешно изменены',           
                                icon: "success",
                                button: "ОК",
                              })
                       }).catch(() => {
                         swal({
                              title: "Ошибка", 
                              text: 'Обратитесь к администратору',           
                              icon: "error",
                              button: "ОК",
                            })
                       })
      await this.$store.dispatch("getDez")
      this.data = this.$store.getters.getDezData
   },
   addId(id){          
          for(let key in this.data){            
            if(this.data[key].id === id){              
              this.modalFullName = this.data[key].fullname
              this.modalPhone = this.data[key].phone
              this.modalStatus = this.data[key].status
              this.modalIdUser = id
            }
          }
   },
   async submitHandler(){
      if (this.$v.$invalid) {
        this.$v.$touch()
        return
      }

      const formData = {
        fullname: this.fullname,
        phone: this.phone,
        status: this.status
      }

      await this.$store.dispatch("addDez", formData)
                       .then(() => {
                          swal({
                                title: "Успех", 
                                text: 'Данные успешно сохранены',           
                                icon: "success",
                                button: "ОК",
                              })
                            this.fullname = ''
                            this.phone = ''
                       }).catch(() => {
                          swal({
                              title: "Ошибка", 
                              text: 'Обратитесь к администратору',           
                              icon: "error",
                              button: "ОК",
                            })
                            this.fullname = ''
                            this.phone = ''
                       })
      
    }
  },
  components: {
    MaskedInput,
  }
}
</script>
<style scoped>
   .pag{
        background: rgb(230, 230, 230);
        padding-bottom: 1rem;
        padding-top: 1rem;
    }
</style>
