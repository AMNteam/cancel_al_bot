import React, { useContext, useState, useRef, useEffect } from 'react';
import data from "../language.json";
import languageContext from "../context/language/languageContext";
import { FaArrowCircleUp } from "react-icons/fa";
import Question from './Question';
import Answer from './Answer';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const Ask = () => {
    const { lang,setSessionTimeout } = useContext(languageContext);
    const [isRecording, setIsRecording] = useState(false);
    const [audioBlob, setAudioBlob] = useState(null);
    const [visible, setVisible] = useState(true);
    const [dataApi, setData] = useState([]);
    const [text, setText] = useState('');
    const [audioUrl, setAudioUrl] = useState('');
    const [audioDuration, setAudioDuration] = useState('0:00');
    const [audioCurrentTime, setAudioCurrentTime] = useState('0:00');

    const mediaRecorderRef = useRef(null);
    const audioRef = useRef(null);

    const handleText = (e) => {
        setText(e.target.value);
    };
    const gettingResponse = async (text) => {
        let headersList = {
            "Accept": "*/*",
            "Authorization": `Bearer ${localStorage.getItem('token')}`,
            "Content-Type": "application/json"
        };
        let bodyContent = JSON.stringify({ "question": text });
        try {
            let response = await axios.post(
                "https://www.careplus.gopillz.com/al_voice_chat_webside",
                bodyContent,
                { headers: headersList }
            );
            if(response.data.ans!='')
            setData(prevData=>[...prevData ,{type:'answer', text:response.data.ans}])
            setVisible(true);
        } catch (error) {
            if (error.response && error.response.data.detail === 'Token has expired') {
                setSessionTimeout(true)
            } else {
                console.error("Error Details:", error.message);
                alert('Please try again later, something went wrong');
            }
        }
    };

    const askQuestion = (text) => {
        if (text !== '') {
            setVisible(false);
            setData(prevData => [...prevData, { type: 'question', text: text }]);
            gettingResponse(text);
            setText('');  // Clears the input after asking the question
        }
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            askQuestion(text);
        }
    };

    const startRecording = async () => {
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        const mediaRecorder = new MediaRecorder(stream);
        mediaRecorderRef.current = mediaRecorder;

        mediaRecorder.start();
        setIsRecording(true);

        const audioChunks = [];
        mediaRecorder.addEventListener("dataavailable", event => {
            if (event.data.size > 0) {
                audioChunks.push(event.data);
            }
        });

        mediaRecorder.addEventListener("stop", () => {
            const audioBlob = new Blob(audioChunks, { type: 'audio/webm' });
            setAudioBlob(audioBlob);
            const audioUrl = URL.createObjectURL(audioBlob);
            setAudioUrl(audioUrl);
        });
    };

    const stopRecording = () => {
        mediaRecorderRef.current.stop();
        setIsRecording(false);
    };

    const sendAudio = async () => {
        if (audioBlob) {
            const formData = new FormData();
            formData.append("language_type", data[lang]["name"]);
            formData.append("file", audioBlob, 'audio.mp3');
            setVisible(false);
            try {
                const response = await axios.post(
                    "https://www.careplus.gopillz.com/voice_to_text",
                    formData,
                    { headers: { "Content-Type": "multipart/form-data" } }
                );
                console.log("Server Response: ", response.data);
                setData(prevData => [...prevData, { type: 'question', text: response.data.text.text }]);
                gettingResponse(response.data.text.text)
                setAudioBlob(null);
                setAudioUrl('');
            } catch (error) {
                console.error("Error sending audio:", error);
                alert("Failed to process the audio. Please try again.");
            }
            setVisible(true);
        }
    };

    const updateAudioTime = () => {
        if (audioRef.current) {
            const duration = audioRef.current.duration || 0;
            const currentTime = audioRef.current.currentTime || 0;
            setAudioDuration(formatTime(duration));
            setAudioCurrentTime(formatTime(currentTime));
        }
    };

    const formatTime = (time) => {
        const minutes = Math.floor(time / 60);
        const seconds = Math.floor(time % 60);
        return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
    };
    const {id} = useParams();
    useEffect(() => {
        if (!audioBlob) {
            setAudioUrl('');
            setAudioDuration('0:00');
            setAudioCurrentTime('0:00');
        }
    }, [audioBlob]);

    return (
        <>
            {/* Conditionally render the session expired popup */}

            <div className="pt-3 w-full flex h-[calc(100vh-100px)] relative"> {/* Set relative position */}
                <div className="w-full mx-2 relative">
                    <div className='overflow-y-scroll max-h-[91%]'>
                        {
                            dataApi.map((object, index) =>
                                object.type === "question" ? <Question key={index} text={object.text} /> : <Answer key={index} text={object.text} />
                            )
                        }

                        {visible && <div>
                            <div className="mx-2 mt-10">
                                {data[lang]["Instructions"]}
                            </div>
                            <div className="flex flex-col items-center mt-5">
                                <audio 
                                    ref={audioRef} 
                                    controls 
                                    className="w-6/12 mb-2" 
                                    onTimeUpdate={updateAudioTime}
                                    onLoadedMetadata={updateAudioTime} // Update on metadata load
                                >
                                    {audioUrl ? <source src={audioUrl} /> : null}
                                </audio>
                                <div className="flex justify-between w-6/12">
                                    {!isRecording ? (
                                        <button onClick={startRecording} className="bg-gray-200 px-4 py-2 rounded-lg">Start Recording</button>
                                    ) : (
                                        <button onClick={stopRecording} className="bg-gray-200 px-4 py-2 rounded-lg">Stop Recording</button>
                                    )}
                                    <button onClick={() => { 
                                        if (audioRef.current) {
                                            audioRef.current.currentTime = 0; // Reset playback time to 0
                                            audioRef.current.play(); 
                                        }
                                    }} className="bg-gray-200 px-4 py-2 rounded-lg" disabled={!audioBlob}>Replay</button>
                                    <button onClick={sendAudio} className="bg-gray-200 px-4 py-2 rounded-lg" disabled={!audioBlob}>Ask</button>
                                </div>
                            </div>
                        </div>}
                    </div>
                    
                    {/* Update to make the input section always at the bottom */}
                    <div className="bg-slate-200 absolute -bottom-3 left-0 right-0 px-4 py-3 flex justify-between items-center rounded-md"> 
                        <input
                            placeholder="Ask your question"
                            className="bg-slate-200 w-full focus:outline-none focus:ring-0"
                            onChange={handleText}
                            onKeyDown={handleKeyDown}
                            value={text}
                        />
                        <div className="flex items-center" onClick={() => askQuestion(text)}>
                            <FaArrowCircleUp size='1.5rem' />
                        </div>
                    </div>
                </div>

                {/* Symptoms section */}
                <div className="w-auto mr-3 overflow-y-scroll">
                    {
                        data[lang]["Symptoms"].map((text, index) => (
                            <div key={index} className='bg-bluebtn rounded-lg px-8 py-2 my-4 text-white font-[100] w-full text-center cursor-pointer' onClick={() => askQuestion(text)}>
                                {text}
                            </div>
                        ))
                    }
                </div>
            </div>
        </>
    );
};

export default Ask;
