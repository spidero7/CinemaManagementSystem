import { Button } from 'primereact/button';
import { Link } from 'react-router-dom';

const AdminPanel = () => {
    return (
        <div className="outer-container">
            <div className="inner-container">
                <h1>ADMIN PANEL</h1>
                <Link to="/movies" className="m-1">
                    <Button label="Movies collection" />
                </Link>
                <br />
                <Link to="/cinemas-management" className="m-1">
                    <Button label="Cinemas management" />
                </Link>
                <br />
                <Link to="/screening" className="m-1">
                    <Button label="Screening" />
                </Link>
            </div>
        </div>
    );
};

export default AdminPanel;