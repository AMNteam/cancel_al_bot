import HistoryComp from "./History";
import languageContext from "../context/language/languageContext";
import { useContext } from "react";

const PrevQues = () => {
    // Accessing chats from languageContext
    const { chats } = useContext(languageContext);

    return (
        <div className="relative flex justify-between items-stretch h-full">
            <div className="w-11/12 relative py-1">
                {chats && chats.map((chat, index) => (
                    <HistoryComp
                        heading={chat.heading} 
                        desc={chat.desc}
                        id={chat.id}
                    />
                ))}
                

            
            </div>
        </div>
    );
}

export default PrevQues;
