import { Link } from "react-router-dom";

const HeroSection = () => {
    return (
        <>
            <div className="flex justify-center items-center py-4 px-10" style={{height: 'calc(100vh - 60px)'}}>
                <div className="p-10 w-full lg:w-auto flex flex-col justify-center items-center rounded-xl border-2">
                    <h2 className="text-xl lg:text-2xl xl:text-4xl font-bold">
                        Welcome to Todo App
                    </h2>
                    <Link className="mt-10 p-6 rounded-xl bg-red-400 hover:bg-red-500 text-white text-xl font-bold" 
                        to="/tasks">
                        Lets Get Started!
                    </Link>
                </div>
            </div>
        </>
    )
}

export default HeroSection;