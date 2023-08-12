import Icon from "../assets/images/t-icon.svg"

const Header = () => {
    return(
        <>
            <div className="sticky top-0 bg-white z-10 h-[60px] border-b-2 py-4 px-10 flex items-center gap-4">
                <img alt="logo" className="max-w-[30px] w-[10%]" src={Icon} />
                <h2 className="text-xl font-bold">
                    Todo App
                </h2>
            </div>
        </>
    )
}

export default Header;