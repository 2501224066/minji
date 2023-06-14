import {
    ImagePreview
} from 'vant';

import wx from 'weixin-js-sdk'
export function editorImgs(imaArr) {
    var imgList = imaArr
    let arr = [];
    for (let i = 0; i < imgList.length; i++) {
        arr.push(imgList[i].src);
        imgList[i].setAttribute("class", "preview-img");
        imgList[i].addEventListener("click", e => {
            console.log(arr);
            // console.log(that);
            // this.show(arr, i);
            // ImagePreview({
            //     images: arr,
            //     startPosition: i
            // });

            wx.previewImage({
                current: arr[i],
                urls: arr
            })
        });
    }
}