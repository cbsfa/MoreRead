let phone=$('#phone').val()
let password=$('#password').val()
let rePassword=$('#rePassword').val()
let data={"phone":phone,"password":password,"rePassword":rePassword}
$.ajax({
    url:'/register',
    type:'post',
    dataType:'json',
    data:data
})