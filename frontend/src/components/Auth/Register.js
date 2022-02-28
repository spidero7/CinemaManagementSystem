import { InputText } from 'primereact/inputtext';
import { Password } from 'primereact/password';

function Register() {
	return (
		<div className="form-demo">
			<div className="flex justify-content-center">
				<div className="card">
					<form className="p-fluid">
						<h2 className="text-center">Register</h2>
						<div className="field">
							<span className="p-float-label">
								<InputText id="in" />
								<label htmlFor="in">Name</label>
							</span>
						</div>
						<div className="field">
							<span className="p-float-label">
								<InputText id="in" />
								<label htmlFor="in">Email</label>
							</span>
						</div>
						<div className="field">
							<Password placeholder="Password" />
						</div>
					</form>
				</div>
			</div>
		</div>
	);
}

export default Register;
