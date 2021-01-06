<template>
  <div class="container">
    <div id="login-row" class="row justify-content-center align-items-center">
      <div id="login-column" class="col-md-6">
        <div id="login-box" class="col-md-12">
          <form
            id="login-form"
            class="form"
            action=""
            @submit.prevent="submitHandler"
            method="post"
          >
            <h3 class="text-center text-info">Авторизация</h3>
            <div class="form-group">
              <label for="username" class="text-info">Логин:</label><br />
              <input
                type="text"
                name="username"
                id="username"
                placeholder="Введите логин"
                class="form-control"
                v-model.trim="login"
                :class="{ 'is-invalid': $v.login.$dirty && !$v.login.required }"
              />
              <div
                class="invalid-feedback"
                v-if="$v.login.$dirty && !$v.login.required"
              >
                Поле Логин не должно быть пустым.
              </div>
            </div>
            <div class="form-group">
              <label for="password" class="text-info">Пароль:</label><br />
              <input
                type="password"
                name="password"
                id="password"
                class="form-control"
                v-model.trim="password"
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
            <div class="form-group">
              <input
                type="submit"
                name="submit"
                class="btn btn-info btn-md"
                value="Отправить"
                id="start"
              />
            </div>
          </form>
        </div>
      </div>
    </div>
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
import { required, minLength } from "vuelidate/lib/validators";
import messages from "@/utils/messages";

export default {
  name: "login",
  data: () => ({
    login: "",
    password: "",
  }),
  validations: {
    login: { required },
    password: { required, minLength: minLength(8) },
  },
  mounted() {
    if (messages[this.$route.query.message]) {
      this.$toast.warning(messages[this.$route.query.message]);
    }
  },
  methods: {
    async submitHandler() {
      if (this.$v.$invalid) {
        this.$v.$touch()
        return
      }
      const formData = {
        login: this.login,
        password: this.password,
      }

      await this.$store.dispatch("login", formData)
        .then(() => {

            if(this.$store.getters.userData.isAdmin == 1){
              this.$router.push("/admin/history")
            }else{
              this.$router.push("/main")
            }
          })
        .catch((err) => { 
          if(this.$store.getters.authStatus == 'error'){
            this.$toast.error(messages['locked'])
          }         
          
        })
     
      
      this.$store.dispatch("lifecycle")
    },
  },
};
</script>

<style scoped>
#login .container #login-row #login-column #login-box {
  margin-top: 120px;
  max-width: 500px;
   
  background-color: #EAEAEA;
}
#login .container #login-row #login-column #login-box #login-form {
  padding: 20px;
  
}





#login
  .container
  #login-row
  #login-column
  #login-box
  #login-form
  #register-link {
  margin-top: -25px;
}
#start {
  margin-top: 10px;
  
}

.header-text{
  color: white;
}

.h-cont {
  background: #17a2b8;
  margin: 0;
  padding: 0;
}


</style>
