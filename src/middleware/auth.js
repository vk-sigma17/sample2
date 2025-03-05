const adminAuth = (req, res, next) => {
    console.log("Admin Auth is getting checked!!")
    const token = "xyz";
    const isAuthTokenValid = token === "xyz";
    if(!isAuthTokenValid){
        res.status(401).send("Authentication Request Failed!!");
    }
    next()
}

module.exports = {adminAuth};