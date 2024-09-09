import React, { useState } from 'react';
import languageContext from "./languageContext"

const LanguageState = (props) => {
    const [lang,setLang]=useState(0);
    const [sessionTimeout,setSessionTimeout]=useState(false);
    const [phone,setPhone]=useState('');
    const [chats,setChats]=useState([{heading:'Untitled doc',desc:'Ask anything',id:'0'}])
    return (
        <languageContext.Provider value={{lang,setLang,sessionTimeout,setSessionTimeout,phone,setPhone,chats,setChats}}>
            {props.children}
        </languageContext.Provider>
    );
};

export default LanguageState;
