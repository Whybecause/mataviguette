import React, { useState } from "react";
import { useForm } from "react-hook-form";
import {
  Stack,
  useToast,
  Box,
  Button,
  FormControl,
  FormLabel,
  FormErrorMessage,
  Input,
  Center,
  Divider,
  Spinner,
} from "@chakra-ui/react";

import authService from "../../services/auth.service";

const Register = () => {
  const { register, handleSubmit, reset, formState: { errors },} = useForm();
  const toast = useToast();
  const [loading, setLoading] = useState(false);
  const mailRegex = new RegExp(
    "[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?"
  );

  async function handleRegister(data) {
    setLoading(true)
    try {
      const res = await authService.register(data)
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
      <Box className="form-container small-page-height" mt="5" p="5">

        <form onSubmit={handleSubmit(handleRegister)}>

          <Center>
            <h3>Créer un compte</h3>
          </Center>

          <FormControl id="username">
            <FormLabel htmlFor="username"></FormLabel>
            <Input
              {...register("username", {
                required: true,
              })}
              type="text"
              id="username"
              name="username"
              placeholder="Nom d'utilisateur"
              required
            />
            <FormErrorMessage>
              {errors.email && errors.email.message}
            </FormErrorMessage>
          </FormControl>

          <FormControl id="email">
            <FormLabel htmlFor="email"></FormLabel>
            <Input
              {...register("email", {
                required: true,
                pattern: mailRegex,
              })}
              type="email"
              id="email"
              name="email"
              placeholder="Adresse email"
              required
            />
            <FormErrorMessage>
              {errors.email && errors.email.message}
            </FormErrorMessage>
          </FormControl>

          <FormControl id="password" mt={4}>
            <FormLabel htmlFor="password"></FormLabel>
            <Input
              {...register("password", { required: true, minLength: 5 })}
              type="password"
              id="password"
              name="password"
              autoComplete="current-password"
              required
              minLength={5}
              placeholder="Mot de passe"
            />
            <FormErrorMessage>
              {errors.password && errors.password.message}
            </FormErrorMessage>
          </FormControl>

          <FormControl id="password2" mt={4}>
            <FormLabel htmlFor="password2"></FormLabel>
            <Input
              {...register("password2", { required: true, minLength: 5 })}
              type="password"
              id="password2"
              name="password2"
              autoComplete="current-password"
              required
              minLength={5}
              placeholder="Confirmez votre mot de passe"
            />
            <FormErrorMessage>
              {errors.password && errors.password.message}
            </FormErrorMessage>
          </FormControl>
          <Button disabled={loading} mt="5" type="submit" width="100%">
            {loading && <Spinner size="xs" />}
            Valider
          </Button>
        </form>
        <Button variant="outline" mt='5'>
          <a href="login">Déjà inscris ? Se connecter</a>
        </Button>
      </Box>
    </>
  );
};

export default Register;
// const required = value => {
//   if (!value) {
//     return (
//       <div className="alert alert-danger" role="alert">
//         This field is required!
//       </div>
//     );
//   }
// };

// const email = value => {
//   if (!isEmail(value)) {
//     return (
//       <div className="alert alert-danger" role="alert">
//         This is not a valid email.
//       </div>
//     );
//   }
// };

// const vusername = value => {
//   if (value.length < 3 || value.length > 20) {
//     return (
//       <div className="alert alert-danger" role="alert">
//         The username must be between 3 and 20 characters.
//       </div>
//     );
//   }
// };

// const vpassword = value => {
//   if (value.length < 6 || value.length > 40) {
//     return (
//       <div className="alert alert-danger" role="alert">
//         The password must be between 6 and 40 characters.
//       </div>
//     );
//   }
// };

// export default class Register extends Component {
//   constructor(props) {
//     super(props);
//     this.handleRegister = this.handleRegister.bind(this);
//     this.onChangeUsername = this.onChangeUsername.bind(this);
//     this.onChangeEmail = this.onChangeEmail.bind(this);
//     this.onChangePassword = this.onChangePassword.bind(this);
//     this.onChangePassword2 = this.onChangePassword2.bind(this);

//     this.state = {
//       username: "",
//       email: "",
//       password: "",
//       password2: "",
//       successful: false,
//       message: ""
//     };
//   }

//   onChangeUsername(e) {
//     this.setState({
//       username: e.target.value
//     });
//   }

//   onChangeEmail(e) {
//     this.setState({
//       email: e.target.value
//     });
//   }

//   onChangePassword(e) {
//     this.setState({
//       password: e.target.value
//     });
//   }
//   onChangePassword2(e) {
//     this.setState({
//       password2: e.target.value
//     });
//   }

//   handleRegister(e) {
//     e.preventDefault();

//     this.setState({
//       message: "",
//       successful: false
//     });

//     this.form.validateAll();

//     if (this.checkBtn.context._errors.length === 0) {
//       AuthService.register(
//         this.state.username,
//         this.state.email,
//         this.state.password,
//         this.state.password2
//         )
//         .then(
//         response => {
//           this.setState({
//             message: response.data.message,
//             successful: true,
//           });
//         },
//         error => {
//           const resMessage =
//             (error.response &&
//               error.response.data &&
//               error.response.data.message) ||
//             error.message ||
//             error.toString();

//           this.setState({
//             successful: false,
//             message: resMessage
//           });
//         }
//       );
//     }
//   }

//   render() {
//     return (
//       <div className="col-md-12">
//         <div className="card card-container">
//           <img
//             src="//ssl.gstatic.com/accounts/ui/avatar_2x.png"
//             alt="profile-img"
//             className="profile-img-card"
//           />
//           <div className="d-flex align-items-center justify-content-center">
//           <h3>Register</h3>
//           </div>

//           <Form
//             onSubmit={this.handleRegister}
//             ref={c => {
//               this.form = c;
//             }}
//           >
//             {!this.state.successful && (
//               <div>
//                 <div className="form-group">
//                   <label htmlFor="username">Username</label>
//                   <Input
//                     type="text"
//                     className="form-control"
//                     name="username"
//                     value={this.state.username}
//                     onChange={this.onChangeUsername}
//                     validations={[required, vusername]}
//                   />
//                 </div>

//                 <div className="form-group">
//                   <label htmlFor="email">Email</label>
//                   <Input
//                     type="text"
//                     className="form-control"
//                     name="email"
//                     value={this.state.email}
//                     onChange={this.onChangeEmail}
//                     validations={[required, email]}
//                   />
//                 </div>

//                 <div className="form-group">
//                   <label htmlFor="password">Password</label>
//                   <Input
//                     type="password"
//                     className="form-control"
//                     name="password"
//                     value={this.state.password}
//                     onChange={this.onChangePassword}
//                     validations={[required, vpassword]}
//                   />
//                 </div>

//                 <div className="form-group">
//                   <label htmlFor="password2">Confirm Password</label>
//                   <Input
//                     type="password"
//                     className="form-control"
//                     name="password2"
//                     value={this.state.password2}
//                     onChange={this.onChangePassword2}
//                     validations={[required]}
//                   />
//                 </div>

//                 <div className="form-group">
//                   <button className="btn btn-primary btn-block">Sign Up</button>
//                   <p className="p-discret m-top-1">Déjà inscrit ?
//                   <Link to = "/login"> Connexion</Link>
//                   </p>
//                 </div>
//               </div>
//             )}

//             {this.state.message && (
//               <div className="form-group">
//                 <div
//                   className={
//                     this.state.successful
//                       ? "alert alert-success"
//                       : "alert alert-danger"
//                   }
//                   role="alert"
//                 >
//                   {this.state.message}
//                 </div>
//               </div>
//             )}
//             <CheckButton
//               style={{ display: "none" }}
//               ref={c => {
//                 this.checkBtn = c;
//               }}
//             />
//           </Form>
//         </div>
//       </div>
//     );
//   }
// }
