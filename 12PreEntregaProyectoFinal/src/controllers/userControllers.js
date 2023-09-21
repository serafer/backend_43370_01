import { getUserByEmail } from "../persistance/daos/mongodb/userDaoMongo.js";
import { mailOptionsGmailLoginOk, transporterGmail } from "../services/emailServices.js";
import { currentUserResDTOService, getAllService, loginUserServices } from "../services/userServices.js";
import { createResponse } from "../utils.js";

export const logoutUserC = (req, res) => {
  req.session.destroy();
  res.redirect("/login");
};



export const login = async (req,res) => {
  try {
     
     const token =await loginUserServices(req.body)
     
     const email = req.body.email

   
       const name = await getUserByEmail (email)
     
       const response = await transporterGmail.sendMail(mailOptionsGmailLoginOk(email, name))

      console.log(response.envelope);
       res.header('Authorization',token)
     
        createResponse(res,200,'token:  ' + token )

     //res.redirect('/products')
     
  } catch (error) {
      console.log(error);
  }
}


export const getAll = async (req,res,next) => {

  try {
      
      const data = await getAllService()
      createResponse(res,200,data)
      

  } catch (error) {
      next(error.message)
  
    }
  }




export const current = async (req, res, next) => {

  try {

    const{ id }=req.user
    console.log('id en req.user current: '+ id)

    const user = await currentUserResDTOService (id)

    console.log('user en UController: '+ user);

    if (user) {
      createResponse(res,200,user)
      
      //res.render("current", {user});
    }  else {
      //res.render("login");
      createResponse(res, 404 , "user not found")
    }  

  } catch (error) {
    next (error.message);
  }

}