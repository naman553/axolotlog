import jwt from "jsonwebtoken"

const authMiddleware = async (req,res, next)=>{
    try{
        const token = req.cookies?.token
         if (!token) {
      return res.status(401).json({ message: 'Authorization token missing' })
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET)
    req.user = { id: decoded.id }

    next()

    }catch(err){
        return res.status(401).json({ message: 'Invalid or expired token' })
    }
}

export default authMiddleware