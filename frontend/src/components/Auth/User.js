import { useEffect, useState } from 'react';
// import { useNavigate, useLocation } from 'react-router-dom';
import useAxiosPrivate from '../../hooks/useAxiosPrivate';

const User = () => {
	const [user, setUser] = useState();
	const axiosPrivate = useAxiosPrivate();

	useEffect(() => {
		let isMounted = true;
		const controller = new AbortController();

		const getUser = async () => {
			try {
				const response = await axiosPrivate.get('/user-account', {
					signal: controller.signal
				});
				console.log(response.data);
				isMounted && setUser(response.data);
			} catch (err) {
				console.error(err);
			}
		};

		getUser();

		return () => {
			isMounted = false;
			controller.abort();
		};
	}, []);

	return (
		<>
			<article>
				{user ? (
					<div>
						<h1>Private Page</h1>
						{user}
					</div>
				) : (
					<p>No user to display</p>
				)}
			</article>
		</>
	);
};

export default User;
