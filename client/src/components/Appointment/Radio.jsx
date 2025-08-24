import { useState } from "react";
import './Radio.css';
import Button from '@mui/material/Button';


export default function RadioBtn({sendRadioData}) {
    const [selectedOption, setSelectedOption] = useState('Diagnostic Center'); // Default selected: Diagnostic Center

    const handleRadioChange = (e) => {
        setSelectedOption(e.target.value);
    }

const submitRadio =(e) =>{
    e.preventDefault();
    sendRadioData(selectedOption);
}

    return (
        <div className="cart-check-box">
            <form>
                <div className="option-1">
                    <input
                        type="radio"
                        name="radio-btn"
                        id="option1"
                        value="Diagnostic Center"
                        checked={selectedOption === 'Diagnostic Center'}
                        onChange={handleRadioChange}
                    />
                    <label htmlFor="option1">Diagnostic Center</label>
                </div>
                <div className="option-2">
                    <input
                        type="radio"
                        name="radio-btn"
                        id="option2"
                        value="Home Address"
                        checked={selectedOption === 'Home Address'}
                        onChange={handleRadioChange}
                    />
                    <label htmlFor="option2">Home Address</label>
                </div>
            </form>
            <div className="next-btn">
                <Button
                    type='submit'
                    variant="contained"
                    color="success"
                    size="large"
                    onClick={submitRadio}
                >
                    Next
                </Button>
            </div>
        </div>
    )
}