export default {
    install(Vue, options){
        Vue.prototype.$message = function(text) {
            this.$toast.success(text, {
                rtl: true,
                timeOut: 5000, 
                closeable: false
            });
            
        }

        Vue.prototype.$error = function(error){
            this.$toast.error(error, {
                rtl: true,
                timeOut: 5000, 
                closeable: false
            });
        }
    }
}