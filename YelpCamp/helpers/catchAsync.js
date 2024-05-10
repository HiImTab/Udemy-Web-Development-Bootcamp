module.exports = func => {
    return(req,res,next)=>{
        //executes passed function and catches any error then passes to next if err
        func(req, res, next).catch(next);
    }
}