import Header from "../components/Header"

const DefaultLayout = (props) => {
    return (
        <div>
            <Header />
            <div>
                { props.children }
            </div>
        </div>
    ) 
}

export default DefaultLayout;