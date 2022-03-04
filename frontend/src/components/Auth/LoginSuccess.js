import { Button } from 'primereact/button';
import { Link } from 'react-router-dom';

function LoginSuccess() {
	return (
		<>
			<div className="login-success-container">
				<div className="login-success-div">
					<h2>You have logged in successfully</h2>
					<Link to="/my-account" className="links">
						<Button type="submit" className="sub-btn">
							Go to My Account
						</Button>
					</Link>
				</div>
			</div>
		</>
	);
}

export default LoginSuccess;
