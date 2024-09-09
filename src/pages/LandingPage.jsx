import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import logo from "../assets/aica.svg";
import data from "../language.json";
import languageContext from "../context/language/languageContext";

const FrontPage = () => {
    const { setLang } = useContext(languageContext);
    const currentPagePath = window.location.pathname; // Use pathname for just the path
    const capitalizeFirstLetter = (string) => {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }
    return (
        <div className='w-[100pvh] h-[100vh] flex flex-col justify-center items-center bg-bgcolor'>
            <div className="TranslateElement" id="google_translate_element"></div>

            <div className='flex flex-col justify-center items-center'>
                <img className='w-8/12 top-[142px] left-[362px]' src={logo} alt='frontPagePic' />
            </div>
            <div>
                <div className='font-bold text-white text-center text-[40px] mb-[10px] mt-5'>Hi! Welcome to Aica</div>
            </div>

            <div>
                <div className='mb-[20px] w-[550px] h-[54px] top-[743px] left-[445px] font-[500] text-[18px] leading-[27px] text-center text-white'>
                    Please choose a language
                </div>
            </div>

            <div className='flex z-10 w-7/12 justify-between'>
                {data.map((language) => (
                    <Link 
                        key={language.index} 
                        to={{
                            pathname: '/login',
                            state: { url: currentPagePath } // Pass only the path
                        }} 
                        className='bg-bluebtn w-3/12 h-[52px] top-[821px] left-[580px] rounded-[10px] text-white flex flex-col justify-center items-center' 
                        onClick={() => setLang(language.index)}>
                        {capitalizeFirstLetter(language.name)}
                    </Link>
                ))}
            </div>

            {/* Concentric circles */}
            <div className='bg-lightbg w-[567.61px] h-[558px] top-[400px] left-[1053px] fixed rounded-full -z-1'>
                <div className='bg-lightbg2 w-[367.61px] h-[358px] top-[500px] left-[1153px] fixed rounded-full'></div>
            </div>

        </div>
    );
}

export default FrontPage;
