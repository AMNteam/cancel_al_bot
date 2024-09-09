import Navbar from "../components/Navbar";
import data from "../language.json";
import React, { useContext, useState } from "react";
import languageContext from "../context/language/languageContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Profile = () => {
    const { lang } = useContext(languageContext);
    const navigate = useNavigate();
    const [details, setDetails] = useState({
        patient_name: '',
        abha_id: '',
        doctor_name: '',
        doctor_number: '',
        hospital_name: '',
        hospital_number: '',
        caregiver_number: '',
        caregiver_name: '',
        relation_of_patient: '',
    });

    // Update state with new values
    const handleChange = (e, field) => {
        setDetails(prevDetails => ({
            ...prevDetails,
            [field]: e.target.value
        }));
    }

    const submitProfile = async () => {
        try {
            const headerList = {
                "Accept": "*/*",
                "Content-Type": "application/json",
                "Authorization": `Bearer ${localStorage.getItem('token')}`
            };
            const response = await axios.post(
                "https://www.careplus.gopillz.com/sigup_details",
                { data: details }, // Set payload with `data` key
                { headers: headerList }
            );
            // console.log(response.data.msg);
            navigate("/ask"); // Navigate after successful submission
        } catch (error) {
            console.error("Error saving the details. Error: ", error);
            alert("Could not save your data, please try again later");
        }
    }

    return (
        <div>
            <Navbar />
            
            {/* Profile Section */}
            <div className='mt-8'>
                <div className="grid grid-cols-[300px_auto] mx-5 gap-4">
                    {data[lang]["profile"].map((item, index) => (
                        <React.Fragment key={index}>
                            <div className='text-[17px] my-auto'>
                                {item.name}
                            </div>
                            <input 
                                type="text" 
                                required={true}
                                className="flex justify-center text-center px-8 py-1 rounded-lg bg-bginput my-4"
                                value={details[item.value]} // Bind input value
                                onChange={(e) => handleChange(e, item.value)} // Pass value name
                            />
                        </React.Fragment>
                    ))}
                </div>
            </div>

            {/* Emergency Contact Section */}
            <div className='mt-8'>
                {data[lang]["Emergency"].map((emergency, index) => (
                    <div key={index}>
                        <div className='text-[20px] font-bold my-4 mx-5'>{emergency.name}</div>
                        <div className="grid grid-cols-[300px_auto] mx-5 gap-4">
                            {emergency.fields.map((field, idx) => (
                                <React.Fragment key={idx}>
                                    <div className='text-[17px] my-auto'>
                                        {field.name}
                                    </div>
                                    <input 
                                        type="text" 
                                        required={true}
                                        className="flex justify-center text-center px-8 py-1 rounded-lg bg-bginput my-4"
                                        value={details[field.value]} // Bind input value for emergency fields
                                        onChange={(e) => handleChange(e, field.value)} // Pass value name for emergency fields
                                    />
                                </React.Fragment>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
            
            {/* Submit Button */}
            <div className="text-center">
                <button 
                    type='button' // Changed to 'button' to avoid form submission issues
                    className='bg-bluebtn rounded-lg px-8 py-2 my-4 text-white font-[100]' 
                    onClick={submitProfile}
                >
                    Proceed
                </button>
            </div>
        </div>
    );
}

export default Profile;
