<template>
  <form @submit.prevent="submitData">
    <div class="form-row">
      <div class="col">
        <div class="form-group">
          <label for="exampleFormControlSelect1">Наименование заказа</label>
          <select
            v-model="orderName"
            class="form-control"
            id="exampleFormControlSelect1"
            :class="{
              'is-invalid': $v.orderName.$dirty && !$v.orderName.required,
            }"
          >
            <option>Дезинфекция</option>
            <option>Дезинсекция</option>
            <option>Дератизация</option>
          </select>
          <div
            class="invalid-feedback"
            v-if="$v.orderName.$dirty && !$v.orderName.required"
          >
            Поле Наименование заказа не должно быть пустым.
          </div>
        </div>
      </div>
      <div class="col">
        <div class="form-group">
          <label for="address">Адрес</label>
          <input
            v-model="address"
            type="text"
            class="form-control"
            id="address"
            :class="{ 'is-invalid': $v.address.$dirty && !$v.address.required }"
          />
          <div
            class="invalid-feedback"
            v-if="$v.address.$dirty && !$v.address.required"
          >
            Поле Адрес не должно быть пустым.
          </div>
        </div>
      </div>
    </div>
    <div class="form-row">
      <div class="col">
        <div class="form-group">
          <label for="price">Цена</label>
          <input
            type="text"
            class="form-control"
            id="price"
            v-model="price"
            :class="{ 'is-invalid': $v.price.$dirty && !$v.price.required }"
          />
          <div
            class="invalid-feedback"
            v-if="$v.price.$dirty && !$v.price.required"
          >
            Поле Цена не должно быть пустым.
          </div>
        </div>
      </div>
      <div class="col">
        <div class="form-group">
          <label for="client">Имя заказчика</label>
          <input
            type="text"
            class="form-control"
            id="client"
            v-model="orderNick"
            :class="{
              'is-invalid': $v.orderNick.$dirty && !$v.orderNick.required,
            }"
          />
          <div
            class="invalid-feedback"
            v-if="$v.orderNick.$dirty && !$v.orderNick.required"
          >
            Поле Имя заказчика не должно быть пустым.
          </div>
        </div>
      </div>
    </div>
    <div class="form-row">
      <div class="col">
        <div class="form-group">
          <label for="telephone">Телефон</label>
          <masked-input
            type="text"
            mask="\+\7 (111) 111-11-11"
            class="form-control"
            id="telephone"
            v-model="phone"
            :class="{ 'is-invalid': $v.phone.$dirty && !$v.phone.required }"
          />
          <div
            class="invalid-feedback"
            v-if="$v.phone.$dirty && !$v.phone.required"
          >
            Поле Телефон не должно быть пустым.
          </div>
        </div>
      </div>
      <div class="col">
        <div class="form-group">
          <label for="type_object">Тип объекта</label>
          <select
            class="form-control"
            id="type_object"
            v-model="typeObject"
            :class="{
              'is-invalid': $v.typeObject.$dirty && !$v.typeObject.required,
            }"
          >
            <option>Квартира</option>
            <option>Дом</option>
            <option>Офис</option>
            <option>Производственный здание</option>
            <option>Территроия</option>
          </select>
          <div
            class="invalid-feedback"
            v-if="$v.typeObject.$dirty && !$v.typeObject.required"
          >
            Поле Тип объекта не должно быть пустым.
          </div>
        </div>
      </div>
    </div>

    <div class="form-row">
      <div class="col">
        <div class="form-group">
          <label for="room_count">Количество комнат</label>
          <input
            type="text"
            class="form-control"
            id="room_count"
            v-model="roomCount"
            :class="{
              'is-invalid': $v.roomCount.$dirty && !$v.roomCount.required,
            }"
          />
          <div
            class="invalid-feedback"
            v-if="$v.roomCount.$dirty && !$v.roomCount.required"
          >
            Поле Количество комнат не должно быть пустым.
          </div>
        </div>
      </div>
      <div class="col">
        <div class="form-group">
          <label for="square">Площадь м&sup2;</label>
          <input
            type="text"
            class="form-control"
            id="square"
            v-model="square"
            :class="{ 'is-invalid': $v.square.$dirty && !$v.square.required }"
          />
          <div
            class="invalid-feedback"
            v-if="$v.square.$dirty && !$v.square.required"
          >
            Поле Площадь не должно быть пустым.
          </div>
        </div>
      </div>
    </div>
    <div class="form-row">
      <div class="col">
        <div class="form-group">
          <label for="interval">Кратность</label>
          <select
            class="form-control"
            v-model="selectedOption"
            id="interval"
            :class="{
              'is-invalid':
                $v.selectedOption.$dirty && !$v.selectedOption.required,
            }"
          >
            <option
              v-for="(option, index) in options"
              :key="index"
              :value="option.value"
            >
              {{ option.content }}
            </option>
          </select>
          <div
            class="invalid-feedback"
            v-if="$v.selectedOption.$dirty && !$v.selectedOption.required"
          >
            Поле Кратность не должно быть пустым.
          </div>
        </div>
      </div>
      <div class="col">
        <div class="form-group">
          <label for="interval">Дезинфектор</label>
          <select
            class="form-control"
            id="interval"
            v-model="dez"
            :class="{ 'is-invalid': $v.dez.$dirty && !$v.dez.required }"
          >
            <option
            v-for="(dez, idx) in dezList"
            :key="idx"
            :value="dez.fullname"
            >
            {{dez.fullname}}
            </option>
            
          </select>
          <div
            class="invalid-feedback"
            v-if="$v.dez.$dirty && !$v.dez.required"
          >
            Поле Дезинфектор не должно быть пустым.
          </div>
        </div>
      </div>
    </div>
    <div class="form-row">
      <div class="col">
        <div class="form-group">
          <label for="garanty">№ Гарантии</label>
          <input
            :disabled="inputDisabled"
            required
            type="text"
            v-model="numguaranty"
            class="form-control"
            id="garanty"
          />
        </div>
      </div>
      <div class="col">
        <div class="form-group">
          <label for="garanty">Гарантия</label>
          <input
            type="text"
            :disabled="inputDisabled"
            v-model="guaranty"
            class="form-control"
            id="garanty"
            required
          />
        </div>
      </div>
    </div>
    <div class="form-row">
      <div class="col">
        <div class="form-group">
          <label for="social">Сервис заказа</label>
          <select
            class="form-control"
            id="social"
            v-model="social"
            :class="{ 'is-invalid': $v.social.$dirty && !$v.social.required }"
          >
            <option>Нет</option>
            <option>Instagram</option>
            <option>Facebook</option>
            <option>Google</option>
            <option>Yandex</option>
            <option>Mail.ru</option>
          </select>
          <div
            class="invalid-feedback"
            v-if="$v.social.$dirty && !$v.social.required"
          >
            Поле Сервис заказа не должно быть пустым.
          </div>
        </div>
      </div>
      <div class="col">
        <div class="form-group">
          <label for="location">Локация</label>
          <select
            class="form-control"
            id="location"
            v-model="location"
            :class="{
              'is-invalid': $v.location.$dirty && !$v.location.required,
            }"
          >
            <option>Алматы</option>
            <option>Туркестан</option>
            <option>Тараз</option>
            <option>Талдыкурган</option>
          </select>
          <div
            class="invalid-feedback"
            v-if="$v.location.$dirty && !$v.location.required"
          >
            Поле Локация не должно быть пустым.
          </div>
        </div>
      </div>
    </div>
    <div class="form-row">
      <div class="col">
        <div class="form-group">
          <label for="garanty">Дата и время обработки</label>
          <input
            v-model="time"
            type="datetime-local"
            class="form-control"
            id="garanty"
            :class="{ 'is-invalid': $v.time.$dirty && !$v.time.required }"
          />
          <div
            class="invalid-feedback"
            v-if="$v.time.$dirty && !$v.time.required"
          >
            Поле Дата и время обработки не должно быть пустым.
          </div>
        </div>
      </div>
      <div class="col"></div>
    </div>
    <button type="submit" class="btn btn-info">Отправить</button>
  </form>
</template>
<script>
import { required } from "vuelidate/lib/validators";
import MaskedInput from "vue-masked-input";
import messages from "@/utils/messages";
import swal from "sweetalert";


export default {
  name: "addData",

  data: () => ({
    options: [
      { content: "Ежедневная", value: "Ежедневная" },
      { content: "Еженедельная", value: "Еженедельная" },
      { content: "Ежемесячная", value: "Ежемесячная" },
      { content: "Ежеквартальная", value: "Ежеквартальная" },
      { content: "Ежегодная", value: "Ежегодная" },
      { content: "Нет", value: "Нет" },
    ],
    selectedOption: "",
    orderName: "",
    address: "",
    price: "",
    orderNick: "",
    phone: "",
    typeObject: "",
    roomCount: "",
    square: "",
    dez: "",
    social: "",
    location: "",
    guaranty: "",
    numguaranty: "",
    time: "",
    dezList: []
  }),
  validations: {
    orderName: { required },
    address: { required },
    price: { required },
    orderNick: { required },
    phone: { required },
    typeObject: { required },
    roomCount: { required },
    square: { required },
    selectedOption: { required },
    dez: { required },
    social: { required },
    location: { required },
    time: { required },
  },
  components: {
    MaskedInput,
  },
  async mounted() {
    if (messages[this.$route.query.message]) {
      this.$toast.warning(messages[this.$route.query.message]);
    }
    await this.$store.dispatch("getDez")
    this.dezList = this.$store.getters.getDezData.filter(d => d.status === 1)
  },
  methods: {
    async submitData() {
      if (this.$v.$invalid) {
        this.$v.$touch();
        return;
      }
      const formData = {
        interval: this.selectedOption,
        orderName: this.orderName,
        address: this.address,
        price: this.price,
        orderNick: this.orderNick,
        phone: this.phone,
        typeObject: this.typeObject,
        roomCount: this.roomCount,
        square: this.square,
        dez: this.dez,
        social: this.social,
        location: this.location,
        guaranty: this.guaranty,
        numguaranty: this.numguaranty,
        time: this.time,
        operatorname: localStorage.getItem("fullname")
      };

      await this.$store.dispatch("getOperators");

      let oper = ''
      for (var o in this.$store.getters.getOperators) {
        if (localStorage.getItem("fullname") == this.$store.getters.getOperators[o].operator){
          oper = this.$store.getters.getOperators[o].operator
        }      
      }

      if (localStorage.getItem("fullname") == oper){
        swal({
            title: "Успех",
            text: "Данные успешно сохранены",
            icon: "success",
            button: "ОК",
          });
          await this.$store
            .dispatch("addData", formData)
            .then(() => {
              swal({
                title: "Успех",
                text: "Данные успешно сохранены",
                icon: "success",
                button: "ОК",
              })
              this.selectedOption = ""
              this.orderName =  ""
              this.address = ""
              this.price = ""
              this.orderNick = ""
              this.phone = ""
              this.typeObject = ""
              this.roomCount = ""
              this.square = ""
              this.dez = ""
              this.social = ""
              this.location = ""
              this.time = ""
              this.guaranty = ""
              this.numguaranty = ""
            })
            .catch((err) => {
              swal({
                    title: "Ошибка",
                    text: "Не удалось сохранить данные в бд, пожалуйста обратитесь к Администратору",
                    icon: "error",
                    button: "ОК",
                  })
            })
      }else {
          swal({
            title: "Ошибка",
            text: "Конфигурация была изменена",
            icon: "error",
            button: "ОК",
          }).then((v) => {
              this.$store.dispatch("logout")
              this.$router.push('/login?message=configure')

          })
      } 
    }
  },
  computed: {
    inputDisabled() {
      if (this.selectedOption != "Нет") {
        this.guaranty = "Нет";
        this.numguaranty = "Нет";
      } else {
        this.guaranty = "";
        this.numguaranty = "";
      }
      return this.selectedOption != "Нет";
    },
  },
};
</script>