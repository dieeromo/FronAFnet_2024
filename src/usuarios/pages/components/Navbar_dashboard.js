
export default function Navbar_dashboard() {

  const userDatos = JSON.parse(localStorage.getItem('userDatos') || "{}")

 

  return (
    <nav className="border p-4">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <div className="flex-shrink-0">
            {userDatos.id ?
              <a href="/dashboard" className="flex items-center text-white font-bold text-xl">
                <img src="https://scontent.fuio32-1.fna.fbcdn.net/v/t39.30808-6/302603707_746644549757525_2311646535148075619_n.png?_nc_cat=102&ccb=1-7&_nc_sid=6ee11a&_nc_ohc=_EPnD34GL8gQ7kNvgGKgMO7&_nc_ht=scontent.fuio32-1.fna&oh=00_AYB-Vbu9EEN9vay8dxkq3rpfPPJPSP9c9OR271YEGTPYRQ&oe=66C7241F"
                  alt="Logo"
                  className="w-20" 
                />
              </a>
              :
              <a href="/landing" className="flex items-center text-white font-bold text-xl">
                <img src="https://scontent.fuio32-1.fna.fbcdn.net/v/t39.30808-6/302603707_746644549757525_2311646535148075619_n.png?_nc_cat=102&ccb=1-7&_nc_sid=6ee11a&_nc_ohc=_EPnD34GL8gQ7kNvgGKgMO7&_nc_ht=scontent.fuio32-1.fna&oh=00_AYB-Vbu9EEN9vay8dxkq3rpfPPJPSP9c9OR271YEGTPYRQ&oe=66C7241F"
                  alt="Logo"
                  className="w-20" />
              </a>
            }

          </div>
          {/* Links de la navegación */}
          <div className="hidden md:block">
            <ul className="flex space-x-4">
         
            <li><a href="/mikrotik/routers/" className=" hover:text-gray-300">Nodos</a></li>
              <li><a href="/instalados" className=" hover:text-gray-300">Clientes</a></li>
              <li><a href="/contabilidad" className=" hover:text-gray-300">Contabilidad</a></li>
              <li><a href="/inventario" className=" hover:text-gray-300">Inventario</a></li>
              <li><a href="/infraestruturafo/mufasnap/" className=" hover:text-gray-300">Infraestrutura FO</a></li>
              
              
              {userDatos.first_name ?
                < >
                  <li><a className=" text-white pl-2 pr-2 py-1 bg-neutral-600 rounded hover:text-neutral-300">{userDatos.first_name} </a></li>
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