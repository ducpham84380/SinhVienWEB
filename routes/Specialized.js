const Specialized = require("../Models/Specialized");

module.exports = function(app){

    app.get("/manageSpecialized", function(req, res){
        res.render("admin_master", {content:"./manageSpecialized/manageSpecialized.ejs"});
    });

    app.post("/manageSpecialized/AddNew", function(req, res){
        var newSpecialized = Specialized({
            NameSpecialized: req.body.NameSpecialized,
        });
        newSpecialized.save(function(err){
            if(err){
                res.json({kq:0, errMsg:err});
            }else{
                res.json({kq:1, errMsg:"Add successfully."});
            }
        });
    });
    app.post("/manageSpecialized/findnhom",function(req,res){
        Specialized.findOne({_id:req.body.id}, function (err,data) { 
            if(err){
                res.json({kq:0, errMsg:err});
            }else{
                res.json({kq:1, Nhom:data.NameSpecialized});
            }
         });
    });
    app.post("/manageSpecialized", function(req, res){
        Specialized.find(function(err, data){
            if(err){
                res.json({kq:0, errMsg:err});
            }else{
                res.json({kq:1, SpecializedList:data});
            }
        });
    });
    
    app.post("/manageSpecialized/update", function(req, res){
        Specialized.findByIdAndUpdate(req.body.id, { NameSpecialized: req.body.NameSpecialized }, function(err){
            if(err){
                res.json({kq:0, errMsg:err});
            }else{
                res.json({kq:1,errMsg:"update successfully."});
            }
        });
    });

    app.post("/manageSpecialized/delete", function(req, res){
        Specialized.findOneAndDelete({_id:req.body.id}, function(err){
            if(err){
                res.json({kq:0, errMsg:err});
            }else{
                res.json({kq:1, errMsg:"Delete successfully."});
            }
        });
    });



}