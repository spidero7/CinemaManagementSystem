import React, { useState } from 'react';
import useAuth from '../../hooks/useAuth';
import * as yup from 'yup';
import { useFormik } from 'formik';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { useNavigate, useLocation } from 'react-router-dom';

import axios from '../../api/axios';
const LOGIN_URL = '/login';

import { FieldError, FormSuccess, FormError } from '../../styles/Auth';

const validationSchema = yup.object({
	email: yup.string().email('Please enter you real name').required('Email is required'),
	password: yup.string().required('Password is required')
});

function Login() {
	// eslint-disable-next-line no-unused-vars
	const { setAuth } = useAuth();

	const navigate = useNavigate();
	const location = useLocation();
	const from = location.state?.from?.pathname || '/';

	const [success, setSuccess] = useState(null);
	const [error, setError] = useState(null);
	const [isActive, setActive] = useState(false);

	const handleToggle = () => {
		setActive(!isActive);
	};

	const onSubmit = async (values) => {
		const response = await axios
			.post(LOGIN_URL, values, {
				headers: { 'Content-Type': 'application/json' },
				withCredentials: true
			})
			.catch((err) => {
				if (err && err.response) setError(err.response.data.message);
				setSuccess(null);
			});

		if (response && response.data) {
			setError(null);
			setSuccess(response.data.message);
			formik.resetForm();

			console.log(JSON.stringify(response?.data));
			const accessToken = response?.data?.accessToken;
			const roles = response?.data?.roles;
			setAuth({ values, roles, accessToken });

			navigate(from, { replace: true });
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
										type={isActive ? 'text' : 'password'}
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
								<i
									className={isActive ? 'pi pi-eye-slash mask' : 'pi pi-eye mask'}
									onClick={handleToggle}></i>
							</div>
							<Button type="submit" label="Submit" className="sub-btn" />
						</form>
					</div>
				</div>
			</div>
		</>
	);
}

export default Login;
