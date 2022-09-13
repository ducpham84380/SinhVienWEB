const Admin = require("../Models/Admin");

var bcrypt = require('bcryptjs');


module.exports = function(app){
    app.get("/Admin/Login", function(req, res){
        res.render('login.ejs');
    });

    app.post("/Admin/register", function(req, res){
        console.log("Post register");
        console.log( req.body );
        // Check avaible Username/Email
        Admin.find({
            "$or": [{"NameUser":req.body.NameUser}]
        }, function(err, data){
            if(data.length==0){

                //Ma hoa password voi Bcryptjs
                bcrypt.genSalt(10, function(err, salt) {
                    bcrypt.hash(req.body.Password, salt, function(err, hash) {
                        if(err){
                            res.json({kq:false, errMsg:"Password encode error!"});
                        }else{

                            // Save user to Mongo Server
                            var newAdmin = Admin({
                                NameUser:   req.body.NameUser,
                                Password:   hash,
                                Active: true,
                                
                            });

                            newAdmin.save(function(err){
                                if(err){
                                    res.json({kq:false, errMsg:"Mongo save user error"});
                                }else{
                                    res.json({kq:true, errMsg:"Admin register successfully."});
                                }
                            });

                        }
                    });
                });

            }else{
                res.json({kq:false,errMsg:"User name is not availble."});
            }
        });
    });

    app.post("/Admin/login",function(req,res){
        if(!req.body.NameUser|| !req.body.Password)
        {
            res.json({"kq":false, "errMsg":"Tên đăng nhập hoặc mật khẩu không đúng"});
        }else{
            Admin.findOne({NameUser:req.body.NameUser},function(err,admin){
                if(admin==null){
                    res.json({kq:false, errMsg:"Tên đăng nhập không đúng"});
                }else{
                    bcrypt.compare(req.body.Password,admin.Password,function(err2,resAdmin){
                        if(err2){
                            res.json({kq:false, errMsg:"loi: "+err});
                        }else{
                            if(resAdmin === true){
                                //Login thanh cong
                                res.json({kq:true, errMsg:"Login successfully."});
                                console.log("ok")
                             }else{
                                return res.json({kq:false, errMsg:" Password không đúng"});
                             }
                        }
                    });
                }
            });   
        }   
    });

}