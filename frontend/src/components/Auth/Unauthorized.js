import { useNavigate } from 'react-router-dom';
import { Button } from 'primereact/button';

function Unauthorized() {
	const navigate = useNavigate();

	const goBack = () => navigate(-1);

	return (
		<>
			<div className="outer-container">
				<div className="inner-container">
					<h1>You are unauthorized</h1>
					<h4>You do not have access to the requested page</h4>
					<Button className="sub-btn" onClick={goBack}>
						Go Back
					</Button>
				</div>
			</div>
		</>
	);
}

export default Unauthorized;
