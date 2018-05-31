/**
 * Authentication controller
 */
import appUtil from '../utility/appUtil';

 const authController = {
  validateUser: function validateUser (userOptions) {
    return (request, response) => {
      const {name, password} = request.body;
      console.log(request.body)
      if (name === 'neeraj' && password === 'dixit') {
        const token = appUtil.generateToken({name});
        return response.status(200).send({token});
      } 

      response.status(400).send({
        error: 'Invalid User'
      })
    }
  }
 };

 export default authController;