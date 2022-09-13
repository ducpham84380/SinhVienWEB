const Subjects = require("../Models/Subjects");

module.exports = function(app){
    app.get("/manageSubjects", function(req, res){
        res.render("admin_master", {content:"./manageSubjects/manageSubjects.ejs"});
    });
    app.post("/manageSubjects/register", function(req, res){
        // Check Subjects
        Subjects.find({
            "$or": [{"MaMH":req.body.MaMH}, {"NameMH":req.body.NameMH}]
        }, function(err, data){
            if(data.length==0){

                var newSubjects = Subjects({
                    MaMH:       req.body.MaMH,
                    NameMH:     req.body.NameMH,
                    ChinhChi:   req.body.ChinhChi,
                    Tuition:    req.body.Tuition,
                });
                newSubjects.save(function(err){
                    if(err){
                        res.json({kq:0, errMsg:err});
                    }else{
                        res.json({kq:1, errMsg:"Add successfully."});
                    }
                });

            }else{
                res.json({kq:0,errMsg:"This Subjects and NameMH is had"});
            }
        });
    });
    app.post("/manageSubjects", function(req, res){
        Subjects.find(function(err, data){
            if(err){
                res.json({kq:0, errMsg:err});
            }else{
                res.json({kq:1, SubjectsList:data });
            }
        });
    });
    
    // update
    app.post("/manageSubjects/update", function(req, res){
        Subjects.findByIdAndUpdate(req.body.id, {
            MaMH:       req.body.MaMH,
            NameMH:     req.body.NameMH,
            ChinhChi:   req.body.ChinhChi,
            Tuition:    req.body.Tuition
        }, function(err){
            if(err){
                res.json({kq:0, errMsg:err});
            }else{
                res.json({kq:1, errMsg:"Upload successfully."});
            }
        });
    });
    //xoa
    app.post("/manageSubjects/delete", function(req, res){
        Subjects.findOneAndDelete({_id:req.body.id}, function(err){
            if(err){
                res.json({kq:0, errMsg:err});
            }else{
                res.json({kq:1, errMsg:"Delete successfully."});
            }
        });
    });
}
