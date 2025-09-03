import jwt from "jsonwebtoken";

//token genarate------------------------------------------------

export const generateToken = (payload)=>{
    const token = jwt.sign(payload,process.env.JWT_SECRET,{expiresIn:'1m'})
    return token;
}

//token decode------------------------------------------------

export const decodeToken = (token)=>{
    const payload = jwt.decode(token);
    return payload;

}

//token verify------------------------------------------------

export const verifyToken = (token)=>{
    try {
        const payload = jwt.verify(token,"myscretekey");
        return payload;
    } catch (error) {
        console.log(error);
        return null;
        
    }
}