import { Button } from 'primereact/button';
import { Link } from 'react-router-dom';

const AdminPanel = () => {
    return (
        <div className="outer-container">
            <div className="inner-container">
                <h1>ADMIN PANEL</h1>
                <Link to="/movies">
                    <Button label="Movies collection" />
                </Link>
            </div>
        </div>
    );
};

export default AdminPanel;