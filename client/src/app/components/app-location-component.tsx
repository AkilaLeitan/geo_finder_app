import { JSX } from "react";
import previewIcon from '../../assets/qr.png';
import editIcon from '../../assets/edit.png';

interface AppLocationComponentProps {
    title: string;
    description?: string;
    distance: string;
    isAdmin: boolean;
}

const AppLocationComponent = ({ title, description, distance, isAdmin }: AppLocationComponentProps): JSX.Element => {
    return (
        <div className="location-item">
            <div>
                <div className="location-title">{title}</div>
                {description && <div className="location-description">{description}</div>}
                <div className="location-distance">{distance}</div>
            </div>
            <div className="flex space-x-3">
                <img src={previewIcon} alt="Preview" className="icon-btn" />
                {isAdmin && <img src={editIcon} alt="Edit" className="icon-btn" />}
            </div>
        </div>
    );
};

export default AppLocationComponent;