module.exports = function(app){
    app.get("/manageClass", function(req, res){
        res.render("admin_master", {content:"./manageClass/manageClass.ejs"});
    });
}