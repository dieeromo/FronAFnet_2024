import Navbar_dashboard from '../../pages/components/Navbar_visitantes'

const DashboardVisitante= ({children}) => {



    return (
        <div>
            <Navbar_dashboard />
            <div className="flex  bg-gray-100">
                {/* Sidebar */}
                <div className="bg-gray-800 text-white w-30 flex-shrink-0">
                    <div className="p-3">
                        <h1 className=" font-bold"><a href='/acreditacion/landing'>Servicios </a></h1>
                    </div>
                    <ul>
                        <li className="p-4 hover:bg-gray-700 cursor-pointer  text-sm"><a href="/biblioteca/filtro/obras" >Biblioteca</a></li>
                        <li className="p-4 hover:bg-gray-700 cursor-pointer text-sm"><a href="" >Bienestar institucional </a></li>
                        <li className="p-4 hover:bg-gray-700 cursor-pointer text-sm"><a href="/general/public/bolsa" >Bolsa de empleo</a></li>
                        <li className="p-4 hover:bg-gray-700 cursor-pointer text-sm"><a href="" >Espacios institucionales</a></li>
                        
                        {/* Agrega más elementos de menú según sea necesario */}
                    </ul>
                </div>
                {/* Main Content */}
                <div className="flex-1">
                    <div className="p-4">
                        {children}
                    </div>
                </div>
            </div>
        </div>
    )
}
export default DashboardVisitante