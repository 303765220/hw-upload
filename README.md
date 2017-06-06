# hw-upload

## Installation

```javascript
npm install hwupload --save
```

Or

```javascript
yarn add hwupload --save
```

## Usage

**Register component**

Registe global component:

```javascript
import HwUpload from 'hwupload'

Vue.component('hw-upload', HwUpload)
```

Registe component:

```javascript
import HwUpload from 'hwupload'

export default {
  components: { HwUpload }
}
```

**Simple usage**

```javascript
<template>
  <HwUpload @upload="onUpload" :multiple="true" :maxWidth="300" :quality="90"></HwUpload>
</template>

//multiple是否可多选
//maxWidth 图片最大宽度
//quality 图片压缩质量

<script>
import HwUpload from 'hwupload'

export default {
  components: { HwUpload },
  methods:{
    onUpload(result){
        console.log(result)//返回base64图片值
    }
  }
}
</script>
```
## License

The plugin is open-sourced software licensed under the [MIT license](http://opensource.org/licenses/MIT).
