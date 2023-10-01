export const isAuth = (req,res,next) => {
    // console.log(req.session);
    // console.log(req.isAuthenticated());
    // console.log(req.cookie);
    if(req.isAuthenticated()) return next();
    //res.status(401).send({ msg: 'Unauthorized' })
    res.redirect('/login');
}