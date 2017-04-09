module.exports = function (req,res,next) {
    var deviceAgent,flag= true;
    if(typeof req.session.isPC == 'undefined'||deviceAgent!=req.headers['user-agent']){
        deviceAgent = req.headers['user-agent'];
        var Agents = ["Android", "iPhone",
                    "SymbianOS", "Windows Phone",
                    "iPad", "iPod"];
        for (var v = 0; v < Agents.length; v++) {
            if (deviceAgent.indexOf(Agents[v]) > 0) {
                flag = false;
                break;
            }
        }
        req.session.isPC=flag;
    }
    next()
}