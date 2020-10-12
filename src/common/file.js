/**
 * 图片文件压缩
 * @param {*} file
 * @return Promise
 */
export const imgCompress = file => {
  return new Promise((resolve, reject) => {
    // 判断支不支持FileReader，支持ie10以上
    if (!file || !window.FileReader) {
      return reject();
    }
    if (!/^image/.test(file.type)) {
      return reject();
    }
    const compress = img => {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      const initSize = img.src.length;
      let { width, height } = img;
      // 如果图片大于一百万像素，计算压缩比并将大小压至100万以下
      let ratio = (width * height) / 1000000;
      if (ratio > 1) {
        ratio = Math.sqrt(ratio);
        width /= ratio;
        height /= ratio;
      }
      canvas.width = width;
      canvas.height = height;
      // 铺底色
      ctx.fillStyle = '#fff';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(img, 0, 0, width, height);

      // 进行压缩
      const ndata = canvas.toDataURL('image/jpeg', 0.7);
      console.log('******压缩前的图片大小******', initSize);
      console.log('******压缩后的图片大小******', ndata.length);
      console.log('******压缩后的图片base64地址******', ndata);
      return ndata;
    };
    // base64转成File对象
    const dataURItoFile = dataurl => {
      const arr = dataurl.split(',');
      const mime = arr[0].match(/:(.*?);/)[1];
      const bstr = window.atob(arr[1]);
      let n = bstr.length;
      const u8arr = new Uint8Array(n);
      while (n--) {
        u8arr[n] = bstr.charCodeAt(n);
      }
      const blob = new window.Blob([u8arr], {
        type: mime,
      });
      return new window.File([blob], file.name, {
        type: mime,
        lastModified: dayjs().valueOf(),
      });
    };
    // 创建一个reader
    const reader = new window.FileReader();

    // 将图片转成base64格式
    reader.readAsDataURL(file);
    // 读取成功后的回调
    reader.onloadend = function () {
      const img = new window.Image();
      img.src = this.result;
      img.onload = () => {
        const data = compress(img);
        return resolve(dataURItoFile(data));
      };
    };
  });
};
