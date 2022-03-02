import React, { useState } from 'react';
import * as yup from 'yup';
import axios from 'axios';
import { useFormik } from 'formik';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';

import { FieldError, FormSuccess } from '../../styles/Auth';

const validationSchema = yup.object({
	email: yup.string().email('Please enter you real name').required('Email is required'),
	password: yup.string().required('Password is required')
});

function Login() {
	const [success, setSuccess] = useState(null);

	const onSubmit = async (values) => {
		// eslint-disable-next-line no-unused-vars
		const { password, ...data } = values;

		const response = await axios.post('http://localhost:3000/login', values).catch((err) => {
			if (err & err.response) console.log('Error: ', err);
		});

		if (response && response.data) {
			setSuccess(response.data.message);
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
		<div className="form-demo">
			<div className="flex justify-content-center">
				<div className="card-auth">
					<FormSuccess>{success ? success : ''}</FormSuccess>
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

export default Login;
