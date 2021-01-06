<template>
  <div>
    <form @submit.prevent="submitHandler">
      <div class="row">
        <div class="col">
          <div class="form-group">
            <label for="formGroupExampleInput">Ф.И.О</label>
            <input 
            v-model="fullname" 
            type="text" 
            class="form-control"
            :class="{ 'is-invalid': $v.fullname.$dirty && !$v.fullname.required }" 
            />
            <div
                class="invalid-feedback"
                v-if="$v.fullname.$dirty && !$v.fullname.required"
            >
                Поле Ф.И.О не должно быть пустым.
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
            id="telephone" 
            :class="{ 'is-invalid': $v.phone.$dirty && !$v.phone.required }" 
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
            <label for="formGroupExampleInput">Логин</label>
            <input 
            v-model="login" 
            type="text" 
            class="form-control" 
            :class="{ 'is-invalid': $v.login.$dirty && !$v.login.required }"
            />
            <div
                class="invalid-feedback"
                v-if="$v.login.$dirty && !$v.login.required"
              >
                Поле Логин не должно быть пустым.
            </div>
          </div>
        </div>
        <div class="col">
          <div class="form-group">
            <label for="formGroupExampleInput">Пароль</label>
            <input 
            v-model.trim="password" 
            type="password" 
            class="form-control"
            :class="{
                  'is-invalid':
                    ($v.password.$dirty && !$v.password.required) ||
                    ($v.password.$dirty && !$v.password.minLength),
                }" 
            />
            <div
                class="invalid-feedback"
                v-if="$v.password.$dirty && !$v.password.required"
              >
                Поле Пароль не должно быть пустым.
            </div>
            <div
                class="invalid-feedback"
                v-else-if="$v.password.$dirty && !$v.password.minLength"
              >
                Пароль должен быть не менее
                {{ $v.password.$params.minLength.min }} символов. Сейчас он
                {{ password.length }}
              </div>
          </div>
        </div>
      </div>
      <div class="row">
        <div class="col">
          <div class="form-group">
            <label for="formGroupExampleInput">Повторите пароль</label>
            <input 
            v-model.trim="repeatPassword" 
            type="password" 
            class="form-control"
            :class="{ 'is-invalid': $v.repeatPassword.$dirty && !$v.repeatPassword.required }" 
            />
            <div
                class="invalid-feedback"
                v-if="$v.repeatPassword.$dirty && !$v.repeatPassword.required"
              >
                Поле Повторите  пароль не должно быть пустым.
            </div>
            
          </div>
        </div>
        <div class="col">
          <div class="form-group">
            
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
            <th scope="col">Логин</th>
            <th scope="col">Телефон</th>
            <th scope="col">Статус</th>
            <th scope="col">Редактировать</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(d, idx) in items"  :key="idx">
            <th scope="row">{{ idx + 1 }}</th>
            <td>{{ d.operator }}</td>
            <td>{{ d.username }}</td>
            <td>{{ d.phone }}</td>
            <td style="background: rgba(74, 212, 74, 0.5);" v-if="d.status == 1">Активный</td>
            <td style="background: rgba(212, 74, 74, 0.5);" v-else>Уволен</td>
            <td style="text-align: center">
              <button type="submit" @click="addId(d.id)" class="btn btn-primary" data-toggle="modal" data-target="#exampleModal" data-whatever="@mdo">
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
    <div class="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">Редактирование</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <form @submit.prevent="addUpdateHundler">
              <div class="form-group">
                <label for="recipient-name" class="col-form-label modal-text">Логин:</label>
                <input type="text" v-model="modalLogin" class="form-control" id="recipient-name">
              </div>
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
                <label for="message-text" class="col-form-label modal-text">Ф.И.О:</label>
                <masked-input 
                  v-model="modalPhone" 
                  type="text" 
                  mask="\+\7 (111) 111-11-11"
                  class="form-control" 
                  id="telephone"
                />
              </div>
              <div class="form-group">
                <label for="message-text" class="col-form-label modal-text">Пароль:</label>
                <input 
                type="password" 
                v-model="modalPassword"
                class="form-control"                 
                id="recipient-name"
                >
                
              </div>
              <div class="form-group">
                <label for="message-text" class="col-form-label modal-text">Повторите пароль:</label>
                <input 
                  type="password" 
                  v-model="modalRepeatPassword" 
                  class="form-control" 
                  id="recipient-name"
                >
              </div>
              <div class="modal-footer">            
                <button type="submit" class="btn btn-primary">Изменить</button>
              </div>
            </form>
          </div>
          
        </div>
      </div>
    </div>
  </div>
  
</template>
<script>
import { required, minLength } from "vuelidate/lib/validators"
import swal from "sweetalert"
import MaskedInput from "vue-masked-input";
import PaginationMixin from '@/mixins/pagination.mixin'
export default {
  name: 'admin_add_operators',
  mixins: [PaginationMixin],
  data: () => ({
    fullname: '',
    phone: '',
    login: '',
    password: '',
    repeatPassword: '',
    filteredStatus: 'Все',
    filteredSearch: '',
    data: [],
    modalFullName: '',
    modalPhone: '',
    modalLogin: '',
    modalStatus: 0,
    modalPassword: '',
    modalRepeatPassword: '',
    modalIdUser: 0

  }),
  validations: {
    login: { required },
    fullname: {required},
    phone: {required},    
    password: { required, minLength: minLength(8) },
    repeatPassword: {required}    
  },
  components: {
    MaskedInput,
  },
  async mounted(){
    await this.$store.dispatch("getUserOperators")
    this.data = this.$store.getters.getUserOperator
  },
  computed:{
        filteredDate: function() {
            let filtered = this.data.filter(d => {
                    return this.filteredSearch == '' || d.operator.toLowerCase().indexOf(this.filteredSearch.toLowerCase()) !== -1;
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
  methods: {
    async submitHandler(){
      if (this.$v.$invalid) {
        this.$v.$touch()
        return
      }
      if(this.password !== this.repeatPassword){
        swal({
            title: "Пароли не совпадают",            
            icon: "warning",
            button: "ОК",
          })
          this.login = ''
          this.password = ''
          this.repeatPassword = ''
          this.phone = ''
          this.fullname = ''
      }else{

          const formData = {
          login: this.login,
          password: this.password,
          fullname: this.fullname,
          phone: this.phone,        
        }
        await this.$store.dispatch("addOperators", formData)
                        .then(() => {
                            swal({
                              title: "Успех", 
                              text: 'Данные успешно сохранены',           
                              icon: "success",
                              button: "ОК",
                            })
                            this.login = ''
                            this.password = ''
                            this.repeatPassword = ''
                            this.phone = ''
                            this.fullname = ''                          
                          })
                          .catch((err) => { 
                              swal({
                              title: "Ошибка", 
                              text: 'Логин и Ф.И.О должны быть уникальными',           
                              icon: "error",
                              button: "ОК",
                            })
                            this.login = ''
                            this.password = ''
                            this.repeatPassword = ''
                            this.phone = ''
                            this.fullname = ''
                          })
        await this.$store.dispatch("getUserOperators")
        this.data = this.$store.getters.getUserOperator
      }
      

    },
    addId(id){          
          for(let key in this.data){
            console.log(this.data[key])
            if(this.data[key].id === id){
              
              this.modalLogin = this.data[key].username
              this.modalFullName = this.data[key].operator
              this.modalPhone = this.data[key].phone
              this.modalStatus = this.data[key].status
              this.modalIdUser = id
            }
          }
    },
    async addUpdateHundler(){
      if(this.modalPassword){
        if(this.modalPassword.length < 8){
           swal({
            title: "Пароль не должен быть менее 8 символов",                        
            icon: "warning",
            button: "ОК",
          })
          this.modalPassword = ''
          this.modalRepeatPassword = ''
        }
        else if(this.modalPassword !== this.modalRepeatPassword){
          swal({
            title: "Пароли не совпадают",                        
            icon: "warning",
            button: "ОК",
          })
          this.modalPassword = ''
          this.modalRepeatPassword = ''
        }else{
          if(this.modalIdUser === 0){
              swal({
              title: "Ошибка", 
              text: "Нет активных пользователей",                       
              icon: "error",
              button: "ОК",
            })
          }else{
            const formData = {
              fullname: this.modalFullName,
              phone: this.modalPhone,
              login: this.modalLogin,
              status: this.modalStatus,
              password: this.modalPassword,
              id: this.modalIdUser
            }
            await this.$store.dispatch("getUpdateUser", formData)
            await this.$store.dispatch("getUserOperators")
            this.data = this.$store.getters.getUserOperator
            swal({
              title: "Успех", 
              text: "Данные успешно изменены",                       
              icon: "success",
              button: "ОК",
            })
          }
        }
      }else{
        const formData = {
            fullname: this.modalFullName,
            phone: this.modalPhone,
            login: this.modalLogin,
            status: this.modalStatus,
            id: this.modalIdUser            
          }
        await this.$store.dispatch("getUpdateUser", formData)
        await this.$store.dispatch("getUserOperators")
        this.data = this.$store.getters.getUserOperator
          swal({
            title: "Успех", 
            text: "Данные успешно изменены",                       
            icon: "success",
            button: "ОК",
          })
      }
    }
    
  },
}
</script>
<style scoped>
   .pag{
        background: rgb(230, 230, 230);
        padding-bottom: 1rem;
        padding-top: 1rem;
    }
</style>