/**
 * Created by piyush on 7/11/18.
 */
const signinConstraints = {
    username: {
        presence: true,
        email: true
    },

    password:{
        presence:true
    }
}
export default signinConstraints;
// export const passwordValidations = {
//     password:{
//         presence:true
//     }
// }