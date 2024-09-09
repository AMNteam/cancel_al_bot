import React, { useContext } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import languageContext from "../context/language/languageContext";

const SessionTimeoutPopup = () => {
    const { sessionTimeout, setSessionTimeout } = useContext(languageContext);
    const navigate = useNavigate();
    const location = useLocation();

    const Close = () => {
        setSessionTimeout(false);
        setTimeout(() => {
            navigate("/login");
        }, 1000);
    };
    
    // Do not show the popup on login or signup pages
    if (location.pathname === "/login" || location.pathname === "/signup") {
        return null;
    }

    return (
        <>
            {sessionTimeout && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
                    <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full">
                        <h2 className="text-xl font-bold mb-4">Session Timeout</h2>
                        <p>You have been snoozed as you went missing. This is for your safety and security. Please login with your mobile number again</p>
                        <div className="mt-6 flex justify-end">
                            <button
                                className="bg-bluebtn text-white py-2 px-4 rounded-lg"
                                onClick={Close}
                            >
                                Close
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default SessionTimeoutPopup;
