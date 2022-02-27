import { useRef } from 'react';
import { Link } from 'react-router-dom';

import { Button } from 'primereact/button';
import { Menu } from 'primereact/menu';

import navLogo from './../../assets/img/nav-logo.svg';

const Navbar = () => {
	const menu = useRef(null);
	const items = [
		{
			label: 'Account',
			items: [
				{
					label: 'Log in',
					icon: 'pi pi-users'
				},
				{
					label: 'Register',
					icon: 'pi pi-user-plus'
				}
			]
		}
	];

	return (
		<div className="flex bg-gray-900">
			<div className="flex-auto flex align-items-center justify-content-left">
				<Link to="/" className="block max-h-full p-1">
					<img className="max-h-full h-3rem" src={navLogo} alt="Monokino logo" />
				</Link>
			</div>
			<div className="flex-auto flex align-items-center justify-content-end p-2">
				<Menu model={items} popup ref={menu} id="popup_menu" />
				<Button
					icon="pi pi-user"
					className="p-button-rounded p-button-info p-button-outlined"
					aria-controls="popup_menu"
					onClick={(event) => menu.current.toggle(event)}
					aria-haspopup
					style={{
						color: 'var(--purple-300)'
					}}
				/>
			</div>
		</div>
	);
};

export default Navbar;
