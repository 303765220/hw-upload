<template>
    <div class="upimg">
        <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAIIAAACCCAYAAACKAxD9AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyZpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMDY3IDc5LjE1Nzc0NywgMjAxNS8wMy8zMC0yMzo0MDo0MiAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTUgKFdpbmRvd3MpIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOjYwRjQ2M0E2RjRFMzExRTZCMTZGQ0NFOUE1NUQwREVCIiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOjYwRjQ2M0E3RjRFMzExRTZCMTZGQ0NFOUE1NUQwREVCIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6NjBGNDYzQTRGNEUzMTFFNkIxNkZDQ0U5QTU1RDBERUIiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6NjBGNDYzQTVGNEUzMTFFNkIxNkZDQ0U5QTU1RDBERUIiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz66ekhyAAABwklEQVR42uzbW4rCQBAF0LS41ux/B1F8lRVK1B+JqXN+hoHAgFxuur3McZ7nZboat5/3318Zq989v4PnDxOcHT9I0PRl4jz/h89rBAQBQeCDMwK9LBqB1AjDx4BGQBAQBIogLNP776vRCHS5NdDb0Ah4NSAIOCNQsDWQG8HWgEZAEBAEqiDYGtAIxK2B3mwNeDUgCDgjULE1kBvB1oBGQBAQBKog2BrQCMStwT06dLxB2RrwakAQcEbg5RlJI/BoBFsDGgFBQBCogmBrQCMQtwZ6szXg1YAg4IxAxdZAbgRbAxoBQUAQqIJga0AjELcGerM18B+NsOz0b27yexuNgDMC0YJbDsL45Qex5dr+VSPYGnBGQBAQBKog2BrQCMStgd5sDXg1IAg4I1Dxfw3kRrA1oBEQBASBKgi2BjQCcWugN1sDXg0IAs4IVGwN5EbovjXYWjQCgoAgUAfB1oBGIG4NuDVpBLwaEAScEVizNZAbwXftaAQEAUGgCoKtAY1A3BrozdaAVwOCgDMCFVsDuRFsDWgEBAFBoAqCrQGNQNwa6M3WgFcDgoAzAhVbA7kRxnMy3p0u10ny/D6e1whcnAQYAKmBPH8ijl84AAAAAElFTkSuQmCC">
        <input type="file" id="file_input" @change="previewFile" :multiple="multiple">
    </div>
</template>

<script>
    import { compress } from './functions';
    export default{
        data(){
            return{

            }
        },
        components:{

        },
        props: {
            multiple: {
                type: Boolean,
                default: false
            },
            maxWidth: {
                type: Number,
                default: 400
            },
            quality: {
                type: Number,
                default: 50
            },
        },
        methods:{
            previewFile(e){//file的change事件
                var files = e.target.files || e.dataTransfer.files;
                if (!files.length)return;
                this.createImage(files)
            },
            createImage(file){//在线预览图片
                var that = this
                for(var i=0;i < file.length;i++){
                    var reader = new FileReader();
                    reader.readAsDataURL(file[i]);
                    reader.onload = function(e){
                        var minSrc = '';
                        var img = new Image();
                        img.src = this.result;
                        //大于100k图片进行压缩
                        img.onload = function(){
                            minSrc = compress(img,that.maxWidth,that.quality);
                            that.$emit('upload', minSrc)
                        }
                    }
                }
            },
        }
    }
</script>
<style scoped>
    .upimg {
        position: relative;
        height: 80px;
        width: 80px;
        float: left;
    }
    .upimg img {
        width: 80px;
        height: 80px;
        position: absolute;
        left: 2px;
    }
    .upimg input {
        width: 80px;
        height: 80px;
        position: absolute;
        left: 8px;
        opacity: 0;
    }
</style>
