let phone=$('#phone').val()
let password=$('#password').val()
let data={"phone":phone,"password":password}
$.ajax({
    url:'/login',
    type:'post',
    dataType:'json',
    data:data
})