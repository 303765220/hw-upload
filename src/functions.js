/**
 * Created by hw on 2017/6/5.
 */

/**
 * 压缩主方法
 * @param sourceImg
 * @param maxWidth
 * @param quality
 * @returns {string}
 */
export function compress(sourceImg,maxWidth,quality){
    var area = sourceImg.width * sourceImg.height
    if(sourceImg.width > maxWidth){
        var width = maxWidth
        var height = sourceImg.height/(sourceImg.width/maxWidth)
    }else{
        var height = sourceImg.height
        var width = sourceImg.width
    }
    var compressCvs = document.createElement('canvas')//压缩的图片画布
    //压缩的图片配置宽高
    compressCvs.width = width
    compressCvs.height = height
    var compressCtx = compressCvs.getContext('2d')
    //解决ios 图片大于2000000像素无法用drawImage的bug
    if(area > 2000000 && navigator.userAgent.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/)){
        //瓦片绘制
        var smallCvs = document.createElement('canvas'),
            smallCtx = smallCvs.getContext('2d'),
            count = Math.ceil(area / 1000000),//分割的数量
            cvsWidth = width/count,//每个小canvas的宽度
            picWidth = sourceImg.width/count//分割成小图片的宽度
        smallCvs.height = compressCvs.height
        smallCvs.width =  width/count
        //拼凑成大的canvas
        for(var i = 0;i < count;i++){
            smallCtx.drawImage(sourceImg,i*picWidth,0,picWidth,sourceImg.height,0,0,cvsWidth,height)
            compressCtx.drawImage(smallCvs,i*cvsWidth,0,cvsWidth,height)
        }
    }else{
        compressCtx.drawImage(sourceImg,0,0,sourceImg.width,sourceImg.height,0,0,width,height)
    }
    var newUrl = compressCvs.toDataURL('image/jpeg',quality/100)
    return newUrl
}