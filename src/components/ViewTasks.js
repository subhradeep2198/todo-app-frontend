import { useEffect, useState, useRef } from "react"
import axios from "axios"
import { AiFillDelete, AiFillEdit, AiOutlinePlus } from "react-icons/ai";
import EditTask from "./EditTask";
import { io } from "socket.io-client"

const ViewTasks = () => {

    const [tasks, setTasks] = useState([]);
    const [selectedId, setSelectedId] = useState(0);
    const [show, setShow] = useState(false);
    const socket = useRef();

    const openModal = (id) => {
        setSelectedId(id);
        setShow(true)
    }

    const handleClose = (val) => {
        setShow(val);
    }

    const deleteTask = async (id) => {
        if(window.confirm("Are you sure you want to delete the task?")){
            await axios.delete(`http://localhost:8000/api/delete-task/${id}`)
            .then((res) => {
                socket.current.emit('task')
            })
            .catch((err) => {
                console.log(err)
            })
        }
    }

    const fetchTasks = () => {
        axios.get('http://localhost:8000/api/tasks')
        .then(res => {
            setTasks(res.data)
        })
    }

    useEffect(() => {
        socket.current = io('http://localhost:5000/')
        fetchTasks();

        socket.current.on('task', () =>{
            fetchTasks();
        })

        return () => {
            socket.current.off('task')
        }
    },  [])


    return(
        <>
            <div className="flex justify-center py-4 lg:px-10" style={{height: 'calc(100vh - 60px)'}}>
                <div className="w-full lg:w-1/2 py-4 px-6">
                    <div className="flex gap-4 justify-between items-center">
                        <h2 className="font-bold text-xl text-left">
                            Tasks
                        </h2>
                        <button onClick={() => openModal(0)} className="py-2 px-4 bg-white hover:bg-slate-100 border-2 rounded-lg flex gap-2 justify-center items-center font-bold text-base">
                            <AiOutlinePlus color="black" size={18}/>
                            Create
                        </button>
                    </div>
                    
                    <div className="mt-4 flex flex-col gap-4">
                        {
                            tasks.map((task) => (
                                <div className={`w-full p-4 duration-200 flex gap-4 rounded-xl ${task.status === 'todo' ? 'bg-gray-400' : task.status === 'in_progress' ? 'bg-blue-400' : 'bg-green-400'}`} key={task.id}>
                                    <div className="w-full flex flex-col gap-2">
                                        <h2 className="text-white font-bold text-base">
                                            { task.title }
                                        </h2>
                                        <p className="text-white text-sm">
                                            { task.description }
                                        </p>
                                        <h2 className="text-white text-sm">
                                            Status : { task.status === 'todo' ? 'Todo' : task.status === 'in_progress' ? 'In Progress' : 'Completed'}
                                        </h2>
                                        <h2 className="text-white text-sm">
                                            Due Date : { task.due_date }
                                        </h2>
                                    </div>
                                    <div className="cursor-pointer flex items-center gap-2 justify-center">
                                        <div onClick={() => openModal(task.id)}>
                                            <AiFillEdit color="white" size={30} />
                                        </div>
                                        <div>
                                            <AiFillDelete onClick={() => deleteTask(task.id)} color="white" size={30} /> 
                                        </div>
                                    </div>
                                </div>
                            ))
                        }
                    </div>
                </div>

                {
                    show && <EditTask socket={socket} handleClose={handleClose} id={selectedId} />
                }
            </div>
        </>
    )
}

export default ViewTasks;