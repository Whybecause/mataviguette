import React, { useState } from "react";
import { useParams } from 'react-router-dom';
import { useForm } from "react-hook-form";
import { useToast, Button, Spinner, Box, Center, Input, FormControl, FormLabel, FormErrorMessage} from '@chakra-ui/react';
import authService from "../../services/auth.service";

const RegisterConfirm = () => {
    const { token } = useParams();
    const { register, handleSubmit, formState: { errors }, } = useForm()
    const toast = useToast()
    const [ loading, setLoading ] = useState(false);

    async function handleConfirmAccount(data) {
        setLoading(true);
        try {
            const res = await authService.confirmAccount(token, data.email)
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
            <Box className="small-container small-page-height" p='5'>
                <form onSubmit={handleSubmit(handleConfirmAccount)}>
                    <Center><h3>Confirmez votre compte</h3></Center>
                    <FormControl id="email" mt='10'>
                        <FormLabel htmlFor="email"></FormLabel>
                        <Input
                            {...register("email", { required: true})}
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
                    <Button variant="outline" w='100%' type="submit" disabled={loading} mt='5'>
                        {loading && (
                        <Spinner size='xs' />
                        )}
                        Confirmer
                    </Button>
                </form>
            </Box>

        </>
    )
}

export default RegisterConfirm;
// export default class RegisterConfirm extends Component {
//     constructor(props) {
//         super(props);
//         this.onChangeEmail = this.onChangeEmail.bind(this);
//         this.handleConfirmAccount = this.handleConfirmAccount.bind(this);
//         this.state = {
//             message: '',
//             loading: false,
//             successful: false,
//             email: ''
//         }
//     }

//     onChangeEmail(e) {
//         this.setState({
//             email: e.target.value
//         })
//     }

//     handleConfirmAccount(e) {
//         const {token} = this.props.match.params;
//         e.preventDefault();
//         this.setState({
//             message: '',
//             loading: true,
//             successful: false
//         });
//         AuthService.confirmAccount(token, this.state.email)
//         .then(res => {
//             this.setState({
//                 message: res.data.message,
//                 loading: false,
//                 successful: true
//             })
//         }, error => {
//         const resMessage = error.response.data.message
//         this.setState({
//                 message: resMessage,
//                 loading: false,
//                 successful: false
//             })
//         })
//     }

//     render() {
//         const {token} = this.props.match.params
//         return (
//         <div className="container card">
//             <form
//                 id="confirmAccount-form"
//                 onSubmit={this.handleConfirmAccount}
//                 methode="POST"
//             >
//                 <div className="form-group">
//                     <label htmlFor="email">Confirm your Email</label>
//                     <input
//                         type="email"
//                         className="form-control"
//                         name="email"
//                         value={this.state.email}
//                         onChange={this.onChangeEmail}
//                     />
//                 </div>
//                 <div>
//                     <input
//                         type="hidden"
//                         name="token"
//                         value={token}
//                     />
//                 </div>
//                 <button className="btn btn-primary" type="submit" onClick={this.handleConfirmAccount} disabled={this.state.loading}>
//                     {this.state.loading && (
//                         <span className="spinner-border spinner-border-sm"></span>
//                     )}
//                     <span>Confirm</span>
//                 </button>
//                 <div className="m-top-1">
//                     {this.state.message && (
//                         <div className={this.state.successful ? "alert alert-success": "alert alert-danger"} role="alert">
//                             {this.state.message}
//                         </div>
//                     )}
//                 </div>

//             </form>
//         </div>
//         )
//     }
// }