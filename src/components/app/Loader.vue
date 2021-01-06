<template>
    <div class="d-flex justify-content-center">
        <div class="spinner-border" :class="color" style="width: 3rem; height: 3rem" role="status">
            <span class="sr-only">Загрузка...</span>
        </div>
    </div>
</template>

<script>
export default {
    computed: {
        color() {
            const colors = ["text-primary", "text-secondary", "text-success", "text-danger", "text-warning", "text-info", "text-light", "text-dark"]
            return colors[Math.floor(Math.random() * 8)]
        }
    }
}
</script>
<style scoped>
    .justify-content-center{
        margin-top: 2.5rem;
    }
</style>