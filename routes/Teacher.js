const Teacher = require("../Models/Teacher");

var bcrypt = require('bcryptjs');

module.exports = function(app){
    app.get("/manageTeacher", function(req, res){
        res.render("admin_master", {content:"./manageTeacher/manageTeacher.ejs"});
    });

    app.post("/manageTeacher/register", function(req, res){
        console.log("Post register");
        console.log( req.body );
        // Check avaible MSSV
        Teacher.find({
            "$or": [{"Msgv":req.body.Msgv}]
        }, function(err, data){
            if(data.length==0){

                //Ma hoa password voi Bcryptjs
                bcrypt.genSalt(10, function(err, salt) {
                    bcrypt.hash(req.body.Msgv, salt, function(err, hash) {
                        if(err){
                            res.json({kq:0, errMsg:"Password encode error!"});
                        }else{

                            // Save user to Mongo Server
                            var newTeacher = Teacher({
                                Msgv:   req.body.Msgv,
                                Password:   hash,
                                Namegv    :   req.body.Namegv,
                                Avatar   :   req.body.Avatar,
                                Specialized   :   req.body.Specialized,
                                Address :   req.body.Address,
                                PhoneNumber:req.body.PhoneNumber,
                                Email:req.body.Email,
                                Active: true,
                                DateOfBirth: req.body.DateOfBirth
                            });

                            newTeacher.save(function(err){
                                if(err){
                                    res.json({kq:0, errMsg:"Mongo save user error"});
                                }else{
                                    res.json({kq:1, errMsg:"User register successfully."});
                                }
                            });

                        }
                    });
                });

            }else{
                res.json({kq:0,errMsg:"Email/ msgv is not availble."});
            }
        });
    });
    app.post("/manageTeacher", function(req, res){
        Teacher.find(function(err, data){
            if(err){
                res.json({kq:0, errMsg:err});
            }else{
                res.json({kq:1, TeacherList:data });
            }
        });
    });
    
    app.post("/manageTeacher/findgiangvien",function(req,res){
        Teacher.findOne({_id:req.body.id}, function (err,data) { 
            if(err){
                res.json({kq:0, errMsg:err});
            }else{
                res.json({kq:1, Nhom:data});
            }
         });
    });
    // update
    app.post("/manageTeacher/update", function(req, res){
        Teacher.findByIdAndUpdate(req.body.id, {
            Msgv:   req.body.Mssv,
            Namegv    :   req.body.NameSV,
            Avatar   :   req.body.Avatar,
            Specialized   :   req.body.Specialized,
            Address :   req.body.Address,
            PhoneNumber:req.body.PhoneNumber,
            Email:req.body.Email,
            DateOfBirth: req.body.DateOfBirth
        }, function(err){
            if(err){
                res.json({kq:0, errMsg:err});
            }else{
                res.json({kq:1, errMsg:"Upload successfully."});
            }
        });
    });
    //xoa
    app.post("/manageTeacher/delete", function(req, res){
        Teacher.findOneAndDelete({_id:req.body.id}, function(err){
            if(err){
                res.json({kq:0, errMsg:err});
            }else{
                res.json({kq:1, errMsg:"Delete successfully."});
            }
        });
    });
}