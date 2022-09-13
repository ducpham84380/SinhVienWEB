module.exports = function(app){
    app.get("/manageNews", function(req, res){
        res.render("admin_master", {content:"./manageNews/manageNews.ejs"});
    });
}