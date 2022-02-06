export const CloudService = {
    uploadImg
  };

 function uploadImg(ev) {
    const CLOUD_NAME = 'dos6ziyeq'
    const UPLOAD_URL = `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`
    const formData = new FormData();
    formData.append('file', ev.target.files[0])
    formData.append('upload_preset', 'egd7wfqx');
    return fetch(UPLOAD_URL, {
        method: 'POST',
        body: formData
    })
        .then(res => res.json())
        .then(res =>  res.url)
        .catch(err => console.error(err))
}
