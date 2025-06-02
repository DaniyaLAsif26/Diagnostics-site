import Popular from "./Popular"
import './PopularCont.css';
import ReadMoreIcon from '@mui/icons-material/ReadMore';

export default function PopularPackCont() {

    return (
        <div className="popular-cont" style={{backgroundColor: "pink"}}>
            <h2>Popular Packages</h2>
            <div className="popular-items">
            <Popular name="Specific Gravity Test" description={"Measures concentration of urine."} price={150} />
            <Popular name="Specific Gravity Test" description={"Measures concentration of urine."} price={150} />
            <Popular name="Specific Gravity Test" description={"Measures concentration of urine."} price={150} />
            <div className="more">
                <div className="more-text">See more </div>
                <ReadMoreIcon className="more-icon" style={{fontSize:'3rem'}} />
            </div>
            </div>
        </div>
    )
}