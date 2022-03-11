import React, { useState } from 'react';
import * as yup from 'yup';
import { useFormik } from 'formik';
import { InputText } from 'primereact/inputtext';
import { Password } from 'primereact/password';
import { Button } from 'primereact/button';
import { Divider } from 'primereact/divider';

import { FieldError, FormSuccess, FormError } from '../../styles/Auth';

import axios from '../../api/axios';
import { useNavigate } from 'react-router-dom';
const REGISTER_URL = '/register';

const PASSWORD_REGEX = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{6,}$/;

const validationSchema = yup.object({
	name: yup.string().min(3, 'Please enter your first name').required('Name is required'),
	email: yup.string().email('Please enter you real email').required('Email is required'),
	password: yup
		.string()
		.matches(PASSWORD_REGEX, 'Please enter a stron password')
		.required('Password is required')
});

function Register() {
	const [success, setSuccess] = useState(null);
	const [error, setError] = useState(null);

	const navigate = useNavigate();

	const onSubmit = async (values) => {
		// eslint-disable-next-line no-unused-vars
		const { password, ...data } = values;

		const response = await axios.post(REGISTER_URL, values).catch((err) => {
			if (err && err.response) setError(err.response.data.message);
			setSuccess(null);
		});

		if (response && response.data) {
			setError(null);
			setSuccess(response.data.message);
			formik.resetForm();
		}
	};

	const formik = useFormik({
		initialValues: {
			name: '',
			email: '',
			password: ''
		},
		validateOnBlur: true,
		onSubmit,
		validationSchema: validationSchema
	});

	console.log('Error: ', formik.errors);
	console.log(error);

	const passwordFooter = (
		<React.Fragment>
			<Divider />
			<p className="mt-2">Suggestions</p>
			<ul className="pl-2 ml-2 mt-0" style={{ lineHeight: '1.5' }}>
				<li>At least one lowercase</li>
				<li>At least one uppercase</li>
				<li>At least one numeric</li>
				<li>Minimum 6 characters</li>
				<li>Inclusion of at least one special character, e.g., ! @ # ? ]</li>
			</ul>
		</React.Fragment>
	);

	if (success) {
		setTimeout(() => {
			navigate('/login');
		}, 1000);
	}

	return (
		<div className="form-demo">
			<div className="flex justify-content-center">
				<div className="card-auth">
					{!error && <FormSuccess>{success ? success : ''}</FormSuccess>}
					{!success && <FormError>{error ? error : ''}</FormError>}
					<form onSubmit={formik.handleSubmit} className="p-fluid">
						<h2 className="text-center">Register</h2>
						<div className="field">
							<span className="p-float-label">
								<InputText
									name="name"
									type="text"
									id="name"
									required
									value={formik.values.name}
									onChange={formik.handleChange}
									onBlur={formik.handleBlur}
								/>
								<label htmlFor="name">Name</label>
								<FieldError>
									{formik.touched.name && formik.errors.name ? formik.errors.name : ''}
								</FieldError>
							</span>
						</div>
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
								<Password
									name="password"
									type="password"
									id="password"
									required
									value={formik.values.password}
									onChange={formik.handleChange}
									onBlur={formik.handleBlur}
									toggleMask
									footer={passwordFooter}
								/>
								<label htmlFor="password">Password</label>
								<FieldError>
									{formik.touched.password && formik.errors.password ? formik.errors.password : ''}
								</FieldError>
							</span>
						</div>
						<Button type="submit" label="Submit" className="sub-btn" />
					</form>
				</div>
			</div>
		</div>
	);
}

export default Register;
