import './Options-bar.css';
import Options from './Options';

export default function OptionsBar() {

    return (
        <div className="options-bar">
            <Options option="About Us" />
            <Options option="Book a Test" />
            <Options option="Home Sample Collection" />
            <Options option="Health Packages" />
            <Options option="Download Reports" />
            <Options option="Announcements" />
            <Options option="Gallery" />
        </div>
    )
}