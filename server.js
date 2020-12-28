//模块加载
let fs=require('fs')
let open=require('open')
let mysql=require('mysql')
let express=require('express')
let session=require('express-session')
let bodyParser=require('body-parser')
let formidable=require('formidable')

//数据库连接
let mysqlConnection=mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'123456',
    database:'多多阅读'
})
mysqlConnection.connect()

//服务器设置
let server=express()
server.listen(3000)
server.set('views',__dirname)
server.set('view engine','html')
server.engine('.html',require('ejs').__express)
server.use(bodyParser.json())
server.use(bodyParser.urlencoded())
server.use('/image',express.static('./image'))
server.use(session({
    secret:'read',
    resave:true,
    saveUninitialized:false,
}))
let count=0;
let online=0;
open('http://localhost:3000/login')

//打开界面
server.get('/',function (req,res)
{
    res.redirect('/login')
})
server.get('/login',function (req,res)
{
    req.session.phone=null
    res.render('login')
})
server.get('/register',function (req,res)
{
    req.session.phone=null
    res.render('register')
})
server.get('/main',function (req,res)
{
    if (req.session.phone)
    {
        let sql='select * from 小说信息'
        mysqlConnection.query(sql,function (error,result)
        {
            if (error) console.log(error)
            else
            {
                let number=[]
                let bookName=[]
                for (let i=0;i<result.length;i++)
                {
                    number[i]=result[i]['编号']
                    bookName[i]=result[i]['书名']
                }
                res.render('main',{phone:req.session.phone,number:number,bookName:bookName})
            }
        })
    }
    else res.send('<script>alert("未登录时无法访问该页面");location.href="/login"</script>')
})
server.get('/novel/:location',function (req,res)
{
    if (req.session.phone)
    {
        let sql='select * from 小说信息 where 编号='+req.params.location
        mysqlConnection.query(sql,function (error,result)
        {
            if (error) console.log(error)
            else
            {
                let url='.'+result[0]['地址']
                res.download(url)
                //以下是在线阅读扩展，目前暂时停用
                //let bookName=result[0]['书名']
                //let data=fs.readFileSync(url).toString()
                //res.render('novel',{phone:req.session.phone,data:data,bookName:bookName})
            }
        })
    }
    else res.send('<script>alert("未登录时无法访问该页面");location.href="/login"</script>')
})
server.get('/upload',function (req,res)
{
    if (req.session.phone) res.render('upload',{phone:req.session.phone})
    else res.send('<script>alert("未登录时无法访问该页面");location.href="/login"</script>')
})
server.get('/search/:searchBook',function (req,res)
{
    if (req.session.phone)
    {
        let searchBook=req.params.searchBook
        let sql='select * from 小说信息 where 书名 like'+"'%"+searchBook+"%'"
        mysqlConnection.query(sql,function (error,result)
        {
            if (error) console.log(error)
            else
            {
                let number=[]
                let bookName=[]
                for (let i=0;i<result.length;i++)
                {
                    number[i]=result[i]['编号']
                    bookName[i]=result[i]['书名']
                }
                res.render('search',{phone:req.session.phone,number:number,bookName:bookName})
            }
        })
    }
    else res.send('<script>alert("未登录时无法访问该页面");location.href="/login"</script>')
})
server.get('/logout',function (req,res)
{
    req.session.phone=null
    online--;
    console.log('访问量：'+count)
    console.log('在线人数：'+online)
    console.log()
    res.send('<script>alert("退出成功");location.href="/login"</script>')
})

//登录事件
server.post('/login',function (req,res)
{
    let phone=req.body.phone
    let password=req.body.password
    if (phone.length===0) res.send('<script>alert("手机号输入框不能为空");location.href="/login"</script>')
    else
    {
        let sql='select 手机号 from 用户信息 where 手机号='+phone+' and 密码='+'"'+password+'"'
        mysqlConnection.query(sql,function (error,result)
        {
            if (error) console.log(error)
            else if (result.length!==0)
            {
                count++;
                online++;
                console.log('访问量：'+count)
                console.log('在线人数：'+online)
                console.log()
                req.session.phone=phone
                res.send('<script>alert("登录成功");location.href="/main"</script>')
            }
            else res.send('<script>alert("手机号或密码错误");location.href="/login"</script>')
        })
    }
})

//注册事件
server.post('/register',function (req,res)
{
    let phone=req.body.phone
    let password=req.body.password
    let rePassword=req.body.rePassword
    if (phone.length!==11) res.send('<script>alert("手机号应为11位整数");location.href="/register"</script>')
    else if (password.length<6) res.send('<script>alert("密码应由6-20位字母和数字组成");location.href="/register"</script>')
    else if (password!==rePassword) res.send('<script>alert("两次输入密码不一致");location.href="/register"</script>')
    else
    {
        let findSql='select 手机号 from 用户信息 where 手机号='+phone
        mysqlConnection.query(findSql,function (error,result)
        {
            if (result.length!==0) res.send('<script>alert("该手机号已注册");location.href="/register"</script>')
            else
            {
                let insertSql='insert into 用户信息 values('+phone+','+password+')'
                mysqlConnection.query(insertSql,function (error,result)
                {
                    if (error) console.log(error)
                    else res.send('<script>alert("注册成功，返回登录界面");location.href="/login"</script>')
                })
            }
        })
    }
})

//上传事件
server.post('/upload',function (req,res)
{
    let form=new formidable.IncomingForm()
    form.encoding='utf-8'
    form.uploadDir='./novel'
    form.multiples=true
    form.keepExtensions=true
    form.parse(req,function (error,fields,files)
    {
        if (error)
        {
            console.log(error)
            res.send('<script>alert("上传失败");location.href="/upload"</script>')
        }
        else
        {
            let temp=false
            for (let i in files['file'])
            {
                if (i.length!==1)
                {
                    temp=true
                    break
                }
                else break
            }
            if (temp===true)
            {
                let name=files['file'].name
                let path=files['file'].path
                fs.renameSync(path,'novel/'+name)
                path='/novel/'+name
                name=name.substring(0,name.lastIndexOf('.'))
                let findSql='select 书名 from 小说信息 where 书名='+"'"+name+"'"
                mysqlConnection.query(findSql,function (error,result)
                {
                    if (error) console.log(error)
                    else if (result.length===0)
                    {
                        let insertSql='insert into 小说信息 (书名,地址) values('+"'"+name+"'"+','+"'"+path+"'"+')'
                        mysqlConnection.query(insertSql)
                    }
                })
            }
            else
            {
                for (let i in files['file'])
                {
                    let name=files['file'][i].name
                    let path=files['file'][i].path
                    fs.renameSync(path,'novel/'+name)
                    path='/novel/'+name
                    name=name.substring(0,name.lastIndexOf('.'))
                    let findSql='select 书名 from 小说信息 where 书名='+"'"+name+"'"
                    mysqlConnection.query(findSql,function (error,result)
                    {
                        if (error) console.log(error)
                        else if (result.length===0)
                        {
                            let insertSql='insert into 小说信息 (书名,地址) values('+"'"+name+"'"+','+"'"+path+"'"+')'
                            mysqlConnection.query(insertSql)
                        }
                    })
                }
            }
            res.send('<script>alert("上传成功");location.href="/main"</script>')
        }
    })
})