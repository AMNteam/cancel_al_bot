import React from "react";

const Question = (props) => {
    return (
        <div className="bg-slate-300 rounded-md px-3 py-2 w-max ml-auto mb-1 mr-1 max-w-[120vh]">
            {props.text}
        </div>
    );
};

export default Question;
