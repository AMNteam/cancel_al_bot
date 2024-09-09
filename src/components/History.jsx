import { useNavigate } from "react-router-dom"

const HistoryComp=(props)=>{
    const navigate = useNavigate();
    const handleNavigation=(id)=>{
        navigate(`/ask/${id}`)
    }
    return(
        <div className="bg-slate-200 w-full mx-2 my-2 rounded-md px-2 py-1" onClick={()=>handleNavigation(props.id)}>
            <div className=" font-bold">{props.heading}</div>
            <div>{props.desc}</div>
        </div>
    )
}
export default HistoryComp