let formData=new FormData()
let file=$('#file').file
formData.append('file',file)
$.ajax({
    async:false,
    url:'/upload',
    type:'post',
    data:formData,
    processData:false,
    contentType:false
})