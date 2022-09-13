module.exports = function(app){
    app.get("/manageClassroom", function(req, res){
        res.render("admin_master", {content:"./manageClassroom/manageClassroom.ejs"});
    });
}