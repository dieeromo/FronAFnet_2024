

export default function NavbarClientes() {

    const userDatos = JSON.parse(localStorage.getItem('userDatos') || "{}")
  
   
  
    return (
      <nav className="border p-4">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex justify-between items-center">
            {/* Logo */}
            <div className="flex-shrink-0">
              {userDatos.id ?
                <a href="/dashboard" className="flex items-center text-white font-bold text-xl">
                  <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ4QrhfIcwy98TchKLoDh5E5ZJ3cr10l03r1Pg3f-_AlFlQC7qLYPl553KfS91hkuGV6BU&usqp=CAU"
                    alt="Logo"
                    className="w-30 h-10" />
                </a>
                :
                <a href="/landing" className="flex items-center text-white font-bold text-xl">
                  <img src="https://institutovicentefierro.edu.ec/wp-content/uploads/2024/01/cropped-Sin-titulo-1.png"
                    alt="Logo"
                    className="w-30 h-10" />
                </a>
              }
  
            </div>
            {/* Links de la navegación */}
            <div className="hidden md:block">
              <ul className="flex space-x-4"> 
              <li><a href="/instalados" className=" hover:text-gray-300">Clientes</a></li>
                <li><a href="/ciudades" className=" hover:text-gray-300">Ciudades</a></li>
                <li><a href="/clientes" className=" hover:text-gray-300">Ordenes instalación</a></li>
                
                {userDatos.first_name ?
                  < >
                    <li><a className=" text-white pl-2 pr-2 py-1 bg-gray-800 rounded hover:text-gray-300">{userDatos.first_name} </a></li>
                    <li><a href="/salir" className=" hover:text-gray-300">Salir </a></li>
                  </>
                  :
                  <li><a href="/auth" className=" text-white pl-2 pr-2 py-1 bg-gray-800 rounded hover:text-gray-300">Login </a></li>
  
                }
  
              </ul>
            </div>
          </div>
        </div>
      </nav>
  
    )
  } 