import PhoneInput from 'react-phone-input-2';
import Button from '@mui/material/Button';

import './UserDetailForm.css'

export default function UserForm({number, userName, setUserName, address, setAddress, second_Number, setSecond_Number, errors, setErrors, updateUserDetails }) {

    const formatedNumber = (number) => {
        if (!number) return '';

        let str = number.toString();

        if (str.startsWith("91")) {
            return str.replace(/^91/, "+91 - ");
        }

        return str;
    };

    return (
        <div className="edit-user-from">
            <div className="user-detail-cont">
                <h2>Update User Details</h2>
                <div className="user-detail-form">
                    <form action="">
                        <div className="user-detail-form-div">
                            <label htmlFor="phone_no">Phone Number :</label>
                            <input type="tel" value={formatedNumber(number)} id='phone_no' readOnly className='input-field' />
                        </div>
                        <div className="user-detail-form-div">
                            <label htmlFor="phone_no">Name :</label>
                            <input type="text" value={userName} id='phone_no' className='input-field' onChange={(e) => {
                                setUserName(e.target.value);
                                setErrors(prev => ({ ...prev, name: "" }))
                            }} />
                            {errors.name &&
                                <div className="error-line"></div>
                            }
                        </div>
                        <div className="user-detail-form-div">
                            <label htmlFor="phone_no">Address :</label>
                            <input type="text" value={address} id='phone_no' className='input-field' onChange={(e) => {
                                setAddress(e.target.value);
                                setErrors(prev => ({ ...prev, address: "" }))
                            }} />
                            {errors.address &&
                                <div className="error-line"></div>
                            }
                        </div>
                        <div className="user-detail-form-div">
                            <label>Second Number : </label>
                            <PhoneInput
                                className='input-field'
                                id='alt_phone_no'
                                country={'in'}
                                onlyCountries={['in']}
                                value={second_Number }
                                onChange={(phone) => {
                                    setSecond_Number(phone);
                                    setErrors(prev => ({ ...prev, alt_no: "" }))
                                }}
                                countryCodeEditable={false}
                                disableDropdown={true}
                                containerStyle={{ width: '100%' }}
                            />
                            {errors.alt_no &&
                                <div className="error-line"></div>
                            }
                        </div>
                    </form>
                    <Button
                        type='submit'
                        variant="contained"
                        color="success"
                        onClick={updateUserDetails}
                        size="large">
                        Update
                    </Button>
                </div>
            </div>
        </div>
    )
}