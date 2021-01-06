<template>  
    <nav id="sidebar" :class="{ active: isActive }">
      <div class="custom-menu">
        <button type="button" id="sidebarCollapse" @click="isActive = !isActive" class="btn btn-primary">
          <i class="fa fa-bars"></i>
          <span class="sr-only">Toggle Menu</span>
        </button>
      </div>
      <div class="p-4">
        <div class="logo_img">
          <h1>
            <a href="#" class="logo"
              ><img src="@/assets/images/as-logo.png" width="100" height="100"
            /></a>
          </h1>
        </div>
        <ul class="list-unstyled components mb-5">
          <router-link 
            v-for="link in links"
            :key="link.url"
            tag="li"
            active-class="active"
            :to="link.url"            
          >
            <a href="#"><span :class="link.icon"></span>{{ link.title }}</a>
          </router-link>
          
          <li>
            <a href="#" @click.prevent="logout"><span class="fa fa-sign-out mr-3"></span>Выйти</a>
          </li>
        </ul>

        <div class="footer">
          <p>
            <!-- Link back to Colorlib can't be removed. Template is licensed under CC BY 3.0. -->
            Авторские права &copy;2020 Все права защищены
            <!-- Link back to Colorlib can't be removed. Template is licensed under CC BY 3.0. -->
          </p>
        </div>
      </div>
    </nav> 
</template>

<script>
export default {
    data: () => ({
        links: [
            {"title": 'Ввести заказ', "url": '/main', "icon": 'fa fa-bug mr-3'},
            {"title": 'История записи', "url": '/history', "icon": 'fa fa-history mr-3'},
            {"title": 'Статистика', "url": '/statistics', "icon": 'fa fa-align-left mr-3'}

        ],
        isActive: false
    }),
    methods: {
      logout: function () {
        this.$store.dispatch('logout')
        .then(() => {
          this.$router.push('/login?message=logout')
        })
      }
    }
}
</script>