import React from 'react';
import { useForm } from 'react-hook-form';
import useAuth from '../../hooks/useAuth';
import { Link, useNavigate } from 'react-router';
import axios from 'axios';

const Register = () => {

    const { register, handleSubmit, formState: { errors } } = useForm();
    const { registerUser, signInGoogle, updateUserProfile } = useAuth();
    const navigate = useNavigate();

    const handleRegistration = (data) => {
        console.log('After Register', data.photo[0]);
        const profileImg = data.photo[0];


        registerUser(data.email, data.password)
            .then(result => {
                console.log(result.user);

                // 1. store the image in form data
                const formData = new FormData();
                formData.append('image', profileImg);

                // 2. send the photo to store and get the url
                const image_API_URL = `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_image_host_key}`

                axios.post(image_API_URL, formData)
                    .then(res => {
                        console.log('after image upload', res.data.data.url)
                        // update user profile to firebase
                        const userProfile = {
                            displayName: data.name,
                            photoURL: res.data.data.url
                        }
                        updateUserProfile(userProfile)
                            .then(() => {
                                console.log('user profile updated done')
                                const userInfo = {
                                    name: data.name,
                                    email: data.email,
                                    role: 'user',
                                    joined: new Date().toISOString().split('T')[0]
                                }
                                axios.post("https://boushahri-clinic.vercel.app/api/users", userInfo)
                                    .then(res => {
                                        if (res.data.insertedId) {
                                            console.log('User added to database');
                                        }
                                        navigate('/');
                                    })
                            })
                            .catch(error => {
                                console.log(error);
                            })

                    })
                    .catch(error => {
                        console.log(error)
                    })
            })
    }


    const handleGoogleSignIn = () => {
        signInGoogle()
            .then(result => {
                console.log(result.user)
                const userInfo = {
                    name: result.user.displayName,
                    email: result.user.email,
                    role: 'user',
                    joined: new Date().toISOString().split('T')[0]
                }
                axios.post("https://boushahri-clinic.vercel.app/api/users", userInfo)
                    .then(res => {
                        navigate('/');
                    })
            })
            .catch(error => {
                console.log(error)
            })
    }

    return (
        <div className="card bg-base-100 w-full mx-auto max-w-sm shrink-0 shadow-2xl">
            <h3 className="text-2xl text-center">Welcome to Boushari Clinic</h3>
            <p className='text-center'>Please Register</p>
            <form className="card-body" onSubmit={handleSubmit(handleRegistration)}>
                <fieldset className="fieldset">

                    {/* name */}
                    <label className="label">Name</label>
                    <input type="text" {...register('name', { required: true })} className="input" placeholder="Your Name" />
                    {errors.name?.type === 'required' && <p className='text-red-500'>Name is required</p>}

                    {/* photo */}
                    <label className="label">Photo</label>
                    <input type="file" {...register('photo', { required: true })} className="file-input" placeholder="Your Photo" />
                    {errors.photo?.type === 'required' && <p className='text-red-500'>Photo is required</p>}

                    {/* email */}
                    <label className="label">Email</label>
                    <input type="email" {...register('email', { required: true })} className="input" placeholder="Email" />
                    {errors.email?.type === 'required' && <p className='text-red-500'>Email is required</p>}

                    {/* password */}
                    <label className="label">Password</label>
                    <input type="password" {...register('password', { required: true, minLength: 6 })} className="input" placeholder="Password" />
                    <div><a className="link link-hover">Forgot password?</a></div>
                    <button className="btn btn-neutral mt-4">Register</button>
                    <button type='button' onClick={handleGoogleSignIn} className="btn bg-white text-black border-[#e5e5e5]">
                        <svg aria-label="Google logo" width="16" height="16" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><g><path d="m0 0H512V512H0" fill="#fff"></path><path fill="#34a853" d="M153 292c30 82 118 95 171 60h62v48A192 192 0 0190 341"></path><path fill="#4285f4" d="m386 400a140 175 0 0053-179H260v74h102q-7 37-38 57"></path><path fill="#fbbc02" d="m90 341a208 200 0 010-171l63 49q-12 37 0 73"></path><path fill="#ea4335" d="m153 219c22-69 116-109 179-50l55-54c-78-75-230-72-297 55"></path></g></svg>
                        Login with Google
                    </button>
                </fieldset>
                <p>Already have an Account <Link className='text-blue-400' to='/login'>Login</Link></p>
            </form>
        </div>
    );
};

export default Register;