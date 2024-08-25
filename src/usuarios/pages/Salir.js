import { useDispatch } from "react-redux"
import { logout } from "../features/authSlice"
import { useNavigate } from "react-router-dom"
import Navbar_dashboard from './components/Navbar_dashboard'



export default function Salir() {

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const logoutHandler = () => {
        dispatch(logout())
        navigate('/')
    }

    return (
        <>
            <Navbar_dashboard />
            <div className="fixed inset-0 flex items-center justify-center ">
                <div>
                    <p>Esta seguro de salir de la App?</p>

                </div>
                <div>
                    <button onClick={logoutHandler} className="bg-gray-200 p-2 rounded-sm m-3"> Salir</button>
                    <button className="bg-gray-200 p-2 rounded-sm m-3"> <a href="/dashboard"> Cancelar</a></button>

                </div>




            </div>


        </>
    )
} 