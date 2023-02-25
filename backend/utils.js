import Jwt from "jsonwebtoken";
export const grnerateToken = (user) => {
    
    return Jwt.sign(user,process.env.JWT_SECRET,{
        expiresIn:'5h'
    })
}