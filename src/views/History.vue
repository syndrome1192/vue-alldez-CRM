<template>
  <div>    
    <Loader v-if="loading" />
    <section v-else>
      <OperHistory      
      :data="currency.data"
      :operator="operator"
      />      
    </section>
    
  </div>
</template>
<script>
import OperHistory from '@/components/OperHistory'

export default {

  data: () => ({
      loading: true,
      currency: null,
      operator: ''
  }),
  async mounted() {
    await this.$store.dispatch("getOperators")
    let oper = ''
    for (var o in this.$store.getters.getOperators) {
      if (localStorage.getItem("fullname") == this.$store.getters.getOperators[o].operator){
        oper = this.$store.getters.getOperators[o].operator
      }      
    }

    if (localStorage.getItem("fullname") == oper){
        await this.$store.dispatch("getData")
        this.currency = this.$store.getters.getDataSet
        this.operator = localStorage.getItem("fullname")
        this.loading = false
      }else{
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
  },
  components: {
    OperHistory
  }
  
}
</script>

