<template>
    <div class="container">
        <HwUpload @upload="onUpload" :multiple="true" :maxWidth="300" :quality="90"></HwUpload>
    </div>
</template>

<script>
    import HwUpload from '../src/upload.vue'
    export default {
        components: {
            HwUpload,
        },
        data() {
            return {

            }
        },
        methods:{
            onUpload(result){
                console.log(result)
            }
        }
    }
</script>
