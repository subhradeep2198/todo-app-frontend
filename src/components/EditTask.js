import { useEffect, useState } from "react";
import axios from "axios";
import {AiFillCloseCircle} from "react-icons/ai";

const EditTask = ({id, handleClose, socket}) => {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [status, setStatus] = useState("");
    const [dueDate, setDueDate] = useState("");
    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState({});

    const save = async (e) => {
        e.preventDefault();
        if(id === 0){
            setLoading(true);
            await axios.post('http://localhost:8000/api/create-task', {
                title,
                description,
                status,
                due_date: dueDate
            })
            .then((res) => {
                handleClose(false)
                socket.current.emit('task')
            })
            .catch((err) => {
                errorParser(err.response.data.data)
                setLoading(false);
            })
        }else{
            setLoading(true)
            await axios.put(`http://localhost:8000/api/update-task/${id}`, {
                title,
                description,
                status,
                due_date: dueDate
            })
            .then((res) => {
                if(res.status === 200){
                    handleClose(false)
                    socket.current.emit('task')
                }
            })
            .catch((err) => {
                errorParser(err.response.data.data)
                setLoading(false);
            })
        }
    }

    const errorParser = (val_errors) => {
        let e = {}
        Object.keys(val_errors).forEach((key) => {
            e[key] = val_errors[key].join(", ")
        })

        setErrors(e)
    }

    useEffect(() => {
        if(id > 0) {
            axios.get(`http://localhost:8000/api/task/${id}`)
                    .then(res => {
                        setTitle(res.data.title);
                        setDescription(res.data.description);
                        setStatus(res.data.status);
                        setDueDate(res.data.due_date);
                    })
        }else{
            setStatus('todo')
        }
    }, [])
    
    return(
        <div className="absolute w-full lg:w-1/2 h-[70vh] p-10 flex flex-col justify-center shadow-xl gap-4
                        bg-white border-2 rounded-xl 
                        top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">

            
            <AiFillCloseCircle onClick={() => handleClose(false)} className="cursor-pointer ml-auto" size={40}/>
            <div>
                <input className="w-full p-4 duration-200 border-2 focus:border-[#719BD9] outline-none rounded-lg text-black" type="text" placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)} />
                <div className="text-sm text-[#FF0000] italic ml-1 mt-1">{errors.title}</div>
            </div>

            <textarea className="w-full mb-1 p-4 duration-200 border-2 focus:border-[#719BD9] outline-none rounded-lg text-black" 
                rows="6" placeholder="Type a description..." value={description} onChange={(e) => setDescription(e.target.value)}
            >
            </textarea>

            <div className="flex flex-col lg:flex-row gap-4">
                <div className="lg:w-1/2">
                    <select className="w-full p-4 duration-200 border-2 focus:border-[#719BD9] outline-none rounded-lg text-black"
                        value={status} onChange={(e) => setStatus(e.target.value)}
                    >
                        <option value="">Select a status</option>
                        <option value="todo">Todo</option>
                        {
                            id > 0 &&
                            <>
                                <option value="in_progress">In Progress</option>
                                <option value="completed">Completed</option>
                            </>
                        }
                    </select>
                    <div className="text-sm text-[#FF0000] italic ml-1 mt-1">{errors.status}</div>
                </div>
                
                <div className="lg:w-1/2">
                    <input className="w-full p-4 duration-200 border-2 focus:border-[#719BD9] outline-none rounded-lg text-black"  placeholder="Due Date" type="datetime-local" value={dueDate} onChange={(e) => setDueDate(e.target.value)}/>
                    <div className="text-sm text-[#FF0000] italic ml-1">{errors.due_date}</div>
                </div>
            </div>

            <button disabled={loading} onClick={save} className={`${loading ? 'cursor-not-allowed' : 'cursor-pointer'} p-4 ml-auto max-w-fit bg-blue-500 hover:bg-blue-600 rounded-lg font-bold text-white`}>
                {id > 0 ? (loading ? 'Saving...' : 'Save') : (loading ? 'Creating...' :'Create Task')}
            </button>
        </div>
    )
}

export default EditTask;