const Student = require("../Models/Student");

var bcrypt = require('bcryptjs');

module.exports = function(app){

    app.get("/manageStudent", function(req, res){
        res.render("admin_master", {content:"./manageStudent/manageStudent.ejs"});
    });


    app.post("/manageStudent/register", function(req, res){
        console.log("Post register");
        console.log( req.body );
        // Check avaible MSSV
        Student.find({
            "$or": [{"Mssv":req.body.Mssv}]
        }, function(err, data){
            if(data.length==0){

                //Ma hoa password voi Bcryptjs
                bcrypt.genSalt(10, function(err, salt) {
                    bcrypt.hash(req.body.Mssv, salt, function(err, hash) {
                        if(err){
                            res.json({kq:0, errMsg:"Password encode error!"});
                        }else{

                            // Save user to Mongo Server
                            var newStudent = Student({
                                Mssv:   req.body.Mssv,
                                Password:   hash,
                                NameSV    :   req.body.NameSV,
                                Avatar   :   req.body.Avatar,
                                Specialized   :   req.body.Specialized,
                                Address :   req.body.Address,
                                PhoneNumber:req.body.PhoneNumber,
                                Email:req.body.Email,
                                Class: req.body.Class,
                                Active: true,
                                DateOfBirth: req.body.DateOfBirth
                            });

                            newStudent.save(function(err){
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
                res.json({kq:0,errMsg:"Email/Username is not availble."});
            }
        });
    });
    app.post("/manageStudent", function(req, res){
        Student.find(function(err, data){
            if(err){
                res.json({kq:0, errMsg:err});
            }else{
                res.json({kq:1, StudentList:data });
            }
        });
    });
    
    app.post("/manageStudent/findsinhvien",function(req,res){
        Student.findOne({_id:req.body.id}, function (err,data) { 
            if(err){
                res.json({kq:0, errMsg:err});
            }else{
                res.json({kq:1, Nhom:data});
            }
         });
    });
    // update
    app.post("/manageStudent/update", function(req, res){
        Student.findByIdAndUpdate(req.body.id, {
            Mssv:   req.body.Mssv,
            NameSV    :   req.body.NameSV,
            Avatar   :   req.body.Avatar,
            Specialized   :   req.body.Specialized,
            Address :   req.body.Address,
            PhoneNumber:req.body.PhoneNumber,
            Email:req.body.Email,
            Class: req.body.Class,
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
    app.post("/manageStudent/delete", function(req, res){
        Student.findOneAndDelete({_id:req.body.id}, function(err){
            if(err){
                res.json({kq:0, errMsg:err});
            }else{
                res.json({kq:1, errMsg:"Delete successfully."});
            }
        });
    });
}