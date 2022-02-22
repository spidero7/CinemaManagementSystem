import { Link } from 'react-router-dom';

import { Card } from 'primereact/card';
import { Button } from 'primereact/button';

import ohNo from './../../assets/img/ohno.webp';

const NotFound = () => {
	return (
		<div className="flex p-3 justify-content-center text-center">
			<Card title="Oh no!" subTitle="Page not found...">
				<img src={ohNo} alt="sad shiba sticker" className="h-10rem" />
				<br />
				<Link to="/">
					<Button
						label="Redirect to home?"
						className="m-3"
						style={{
							backgroundColor: 'var(--pink-300)'
						}}
					/>
				</Link>
			</Card>
		</div>
	);
};

export default NotFound;
