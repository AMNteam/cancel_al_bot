import Ask from "../components/Ask";
import Navbar from "../components/Navbar";
import PrevQues from "../components/PrevQues";

const QuestionPage = () => {
    return (
        <div className="flex flex-col h-[100vh]"> {/* Ensure full screen height */}
            <Navbar />
            <div className="flex h-full" style={{ overflow: 'hidden' }}> {/* Ensure remaining space fills the screen */}
                <div className="w-3/12 overflow-y-auto"> {/* Make this section scrollable */}
                    <PrevQues />
                </div>
                <div className="w-full overflow-y-auto"> {/* Make this section scrollable */}
                    <Ask />
                </div>
            </div>
        </div>
    );
}

export default QuestionPage;
