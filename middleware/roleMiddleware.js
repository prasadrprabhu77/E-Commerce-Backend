const roleMiddleware = (allowedRole) =>{
    return (req,res,next) =>{
        try {
        if(!req.user){
            return res.status(401).send({
                message:"Not authorized, User not found"
            })
        }

        if(allowedRole !== req.user.role){
            return res.status(403).send({
                message: "Access denied. You do not have permission"
            })
        }

        next()
    } catch (error) {
        res.status(500).json({
        message: "Server error",
        error: error.message,
      });
    }
  }
}

export default roleMiddleware;