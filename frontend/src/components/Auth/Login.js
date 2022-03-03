import React, { useState, useContext } from 'react';
import AuthContext from '../../context/AuthProvider';
import * as yup from 'yup';
import { useFormik } from 'formik';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import LoginSuccess from './LoginSuccess';

import axios from '../../api/axios';
const LOGIN_URL = '/login';

import { FieldError, FormSuccess, FormError } from '../../styles/Auth';

const validationSchema = yup.object({
	email: yup.string().email('Please enter you real name').required('Email is required'),
	password: yup.string().required('Password is required')
});

function Login() {
	// eslint-disable-next-line no-unused-vars
	const { setAuth } = useContext(AuthContext);
	const [success, setSuccess] = useState(null);
	const [error, setError] = useState(null);
	const [loginSuccess, setLoginSuccess] = useState(false);

	const onSubmit = async (values) => {
		// eslint-disable-next-line no-unused-vars
		const { password, ...data } = values;

		const response = await axios.post(LOGIN_URL, values).catch((err) => {
			if (err && err.response) setError(err.response.data.message);
			setSuccess(null);
			setLoginSuccess(false);
		});

		if (response && response.data) {
			setError(null);
			setLoginSuccess(true);
			setSuccess(response.data.message);
			formik.resetForm();
			const accessToken = response.data.token;
			console.log(accessToken);
			localStorage.setItem('token', response.data.token);
		}
	};

	const formik = useFormik({
		initialValues: {
			email: '',
			password: ''
		},
		validateOnBlur: true,
		onSubmit,
		validationSchema: validationSchema
	});

	console.log('Error: ', formik.errors);

	return (
		<>
			{loginSuccess ? (
				<LoginSuccess />
			) : (
				<div className="form-demo">
					<div className="flex justify-content-center">
						<div className="card-auth">
							{!error && <FormSuccess>{success ? success : ''}</FormSuccess>}
							{!success && <FormError>{error ? error : ''}</FormError>}
							<form onSubmit={formik.handleSubmit} className="p-fluid">
								<h2 className="text-center">Login</h2>
								<div className="field">
									<span className="p-float-label">
										<InputText
											name="email"
											type="email"
											id="email"
											required
											value={formik.values.email}
											onChange={formik.handleChange}
											onBlur={formik.handleBlur}
										/>
										<label htmlFor="email">Email</label>
										<FieldError>
											{formik.touched.email && formik.errors.email ? formik.errors.email : ''}
										</FieldError>
									</span>
								</div>
								<div className="field">
									<span className="p-float-label">
										<InputText
											name="password"
											type="password"
											id="password"
											required
											value={formik.values.password}
											onChange={formik.handleChange}
											onBlur={formik.handleBlur}
										/>
										<label htmlFor="password">Password</label>
										<FieldError>
											{formik.touched.password && formik.errors.password
												? formik.errors.password
												: ''}
										</FieldError>
									</span>
								</div>
								<Button type="submit" label="Submit" className="sub-btn" />
							</form>
						</div>
					</div>
				</div>
			)}
		</>
	);
}

export default Login;
