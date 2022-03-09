import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import useAxiosPrivate from '../../hooks/useAxiosPrivate';

const User = () => {
	const [user, setUser] = useState();
	const axiosPrivate = useAxiosPrivate();
	const navigate = useNavigate();
	const location = useLocation();

	useEffect(() => {
		let isMounted = true;
		const controller = new AbortController();

		const getUsers = async () => {
			try {
				const response = await axiosPrivate.get('/my-account', {
					signal: controller.signal
				});
				console.log(response.data);
				isMounted && setUser(response.data);
			} catch (err) {
				console.error(err);
				navigate('/login', { state: { from: location }, replace: true });
			}
		};

		getUsers();

		return () => {
			isMounted = false;
			controller.abort();
		};
	}, []);

	return (
		<div>
			<h1>Private Page</h1>
			{user}
		</div>
	);
};

export default User;
