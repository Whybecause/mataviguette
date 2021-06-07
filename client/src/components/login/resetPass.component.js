import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import {
  useToast,
  Button,
  Spinner,
  Box,
  Center,
  Input,
  FormControl,
  FormLabel,
  FormErrorMessage,
} from "@chakra-ui/react";

import authService from "../../services/auth.service";

const ResetPassForm = () => {
  const { token } = useParams();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const toast = useToast();
  const [loading, setLoading] = useState(false);

  async function handleResetPass(data) {
      setLoading(true);
      try {
        const res = await authService.resetPass(token, data.email, data.password, data.password2)
        setLoading(false);
        toast({
            position: 'top',
            title: res.data.message,
            status: "success",
            duration: 3000,
            isClosable: true,
        })  
      }
      catch(error) {
          setLoading(false);
          toast({
            position: 'top',
            title: error.response.data.message,
            status: "error",
            duration: 3000,
            isClosable: true,
        })
      }
  }

  return (
    <>
      <Box className="small-container small-page-height" p="5">
        <form onSubmit={handleSubmit(handleResetPass)}>
          <Center>
            <h3>Confirmez votre compte</h3>
          </Center>
          <FormControl id="email" mt="10">
            <FormLabel htmlFor="email"></FormLabel>
            <Input
              {...register("email", { required: true })}
              type="email"
              id="email"
              name="email"
              placeholder="Indiquez l'adresse email du compte à valider"
              required
            />
            <FormErrorMessage>
              {errors.email && errors.email.message}
            </FormErrorMessage>
          </FormControl>
          <FormControl id="password" mt="10">
            <FormLabel htmlFor="password"></FormLabel>
            <Input
              {...register("password", { required: true })}
              type="password"
              id="password"
              name="password"
              placeholder="Nouveau mot de passe"
              required
            />
            <FormErrorMessage>
              {errors.password && errors.password.message}
            </FormErrorMessage>
          </FormControl>
          <FormControl id="password2" mt="10">
            <FormLabel htmlFor="password2"></FormLabel>
            <Input
              {...register("password2", { required: true })}
              type="password"
              id="password2"
              name="password2"
              placeholder="Confirmez votre nouveau mot de passe"
              required
            />
            <FormErrorMessage>
              {errors.email && errors.email.message}
            </FormErrorMessage>
          </FormControl>
          <Button
            variant="outline"
            colorScheme="teal"
            w="100%"
            type="submit"
            disabled={loading}
            mt="5"
          >
            {loading && <Spinner size="xs" />}
            Confirmer
          </Button>
        </form>
      </Box>
    </>
  );
};

export default ResetPassForm;

// export default class ResetPassForm extends Component {
//     constructor(props) {
//         super(props);
//         this.onChangeEmail = this.onChangeEmail.bind(this);
//         this.onChangePassword = this.onChangePassword.bind(this);
//         this.onChangePassword2 = this.onChangePassword2.bind(this);
//         this.handleResetPass = this.handleResetPass.bind(this);
//         this.alert = 0;

//         this.state = {
//             email: '',
//             password: '',
//             password2: '',
//             loading: false,
//             successful: false,
//             alert: ''
//         }
//     }

//     onChangeEmail(e) {
//         this.setState({
//             email: e.target.value
//         })
//     }
//     onChangePassword(e) {
//         this.setState({
//             password: e.target.value
//         })
//     }
//     onChangePassword2(e) {
//         this.setState({
//             password2: e.target.value
//         })
//     }

//     resetForm() {
//         this.setState({email: '', password: '', password2: '', token: ''});
//     }
//     handleResetPass(e) {
//         const {token} = this.props.match.params
//         e.preventDefault();
//         this.setState({
//             alert :'',
//             loading: true,
//             successful: false
//         })
//         AuthService.resetPass(token, this.state.email, this.state.password, this.state.password2)
//         .then (res => {
//             this.setState({
//                 alert: res.data.message,
//                 loading: false,
//                 successful: true
//             });
//             this.resetForm();
//             this.alert = setTimeout( () => {
//               this.setState({alert:''});
//               this.alert= 0
//           }, 3000)
//         }, error => {
//             const resMessage = error.response.data.message
//             this.setState({
//                 alert: resMessage,
//                 loading: false,
//                 successful: false
//             });
//             this.alert = setTimeout( () => {
//                 this.setState({alert:''});
//                 this.alert= 0
//             }, 3000)
//         })
//     }
//     UNSAFE_componentWillUnmount() {
//         clearTimeout(this.alert);
//     }

//     render() {
//         const {token} = this.props.match.params
//         return (
//             <div className="container card">
//             <form
//                 id="resetPass-form"
//                 onSubmit={this.handleResetPass}
//                 methode="POST"
//             >
//                 <div className="form-group">
//                     <label htmlFor="email">Your email</label>
//                     <input
//                         type="email"
//                         className="form-control"
//                         name="email"
//                         value={this.state.email}
//                         onChange={this.onChangeEmail}
//                     />
//                 </div>
//                 <div className="form-group">
//                     <label htmlFor="password">New Password</label>
//                     <input
//                         type="password"
//                         className="form-control"
//                         name="password"
//                         value={this.state.password}
//                         onChange={this.onChangePassword}
//                     />
//                 </div>
//                 <div className="form-group">
//                     <label htmlFor="password">Confirm New Password</label>
//                     <input
//                         type="password"
//                         className="form-control"
//                         name="newPassword"
//                         value={this.state.password2}
//                         onChange={this.onChangePassword2}
//                     />
//                 </div>
//                 <div>
//                     <input
//                         type="hidden"
//                         name="token"
//                         value={token}
//                     />
//                 </div>
//                 <button className="btn btn-primary" type="submit" onClick={this.handleResetPass} disabled={this.state.loading}>
//                     {this.state.loading && (
//                         <span className="spinner-border spinner-border-sm"></span>
//                     )}
//                     <span>Confirm</span>
//                 </button>
//                 <div className="m-top-1">
//                     {this.state.alert && (
//                         <div className={this.state.successful ? "alert alert-success": "alert alert-danger"} role="alert">
//                             {this.state.alert}
//                         </div>
//                     )}
//                 </div>

//             </form>
//         </div>
//         )
//     }

// }
