

import { useMemo } from "react";
import { useTable, useGlobalFilter, useAsyncDebounce } from "react-table";
import { useState, } from 'react';


function useColumns() {
  const columns = useMemo(
    () => [
      {
        Header: "Equipo",
        accessor: "homologadoName"
      },
      {
        Header: "Serie",
        accessor: "serie"
      },
      {
        Header: "Bodega",
        accessor: "bodegaName"
      },
      {
        Header: "Fecha ingreso",
        accessor: "fecha_ingreso"
      },
      {
        Header: "Precio",
        accessor: "precio_compra"
      },
      {
        Header: "Condición",
        accessor: "estado",
        Cell: ({ row }) => (
          <div>
            {row.original.estado === 1 && (<div className="bg-green-200">Nuevo</div>)}
            {row.original.estado === 2 && (<div className="bg-yellow-200">Usado</div>)}
            {row.original.estado === 3 && (<div className="bg-red-200">Dañado</div>)}
          </div>

        )
      },
      {
        Header: "Estado",
        accessor: "estado2",
        Cell: ({ row }) => (
          <div >
            {row.original.estado2 === 1 && (<div className="bg-green-200 py-1">No instalado</div>)}
            {row.original.estado2 === 2 && (<div className="bg-yellow-200 py-1">Instalado</div>)}
            {row.original.estado2 === 3 && (<div className="bg-gray-200 py-1">Vendido</div>)}
          </div>

        )
      },

    ],
    []
  );

  return columns;
}


function CarsFilter({ preGlobalFilteredRows, globalFilter, setGlobalFilter }) {
  const totalCarsAvailable = preGlobalFilteredRows.length;
  const [value, setValue] = useState(globalFilter);

  const onFilterChange = useAsyncDebounce(
    (value) => setGlobalFilter(value || undefined),
    200
  );

  const handleInputChange = (e) => {
    setValue(e.target.value);
    onFilterChange(e.target.value);
  };

  return (
    <span className="cars-filter">
      Filtro: 
      <input
        size={50}
        value={value || ""}
        onChange={handleInputChange}
        placeholder={ `${totalCarsAvailable} equipos ingresados`}
      />
    </span>
  );
}



export default function Equipostable({ equipos }) {
  const columns = useColumns();
  const data = equipos
  const table = useTable({ columns, data }, useGlobalFilter);

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow
  } = table;

  const {
    preGlobalFilteredRows,
    setGlobalFilter,
    state: { globalFilter }
  } = table;


  return (
    <div className="p-4">
      {/* Añadimos las propiedades a nuestra tabla nativa */}
      <table {...getTableProps()} className="min-w-full bg-white border border-gray-200">
        <thead >
          <tr>
            <th colSpan={4}>
              <CarsFilter
                preGlobalFilteredRows={preGlobalFilteredRows}
                globalFilter={globalFilter}
                setGlobalFilter={setGlobalFilter}
              />
            </th>
          </tr>
          {
            // Recorremos las columnas que previamente definimos
            headerGroups.map((headerGroup, index112) => (
              // Añadimos las propiedades al conjunto de columnas


              <tr key={index112} {...headerGroup.getHeaderGroupProps()} thead className="bg-gray-50">
                {
                  // Recorremos cada columna del conjunto para acceder a su información
                  headerGroup.headers.map((column, index113) => (
                    // Añadimos las propiedades a cada celda de la cabecera
                    <th key={index113} {...column.getHeaderProps()} className="py-2 px-4 border-b text-xs text-center">
                      {
                        // Pintamos el título de nuestra columna (propiedad "Header")
                        column.render("Header")
                      }
                    </th>
                  ))
                }
              </tr>
            ))
          }
        </thead>

        {/* Añadimos las propiedades al cuerpo de la tabla */}
        <tbody {...getTableBodyProps()}>
          {
            // Recorremos las filas
            rows.map((row,index111) => {
              // Llamamos a la función que prepara la fila previo renderizado
              prepareRow(row);
              return (
                // Añadimos las propiedades a la fila
                <tr key={index111} {...row.getRowProps()}>
                  {
                    // Recorremos cada celda de la fila
                    row.cells.map((cell, index114) => {
                      // Añadimos las propiedades a cada celda de la fila
                      return (
                        <td key={index114} {...cell.getCellProps()} className="py-2 px-4 border-b text-xs text-center">
                          {
                            // Pintamos el contenido de la celda
                            cell.render("Cell")
                          }
                        </td>
                      );
                    })
                  }
                </tr>
              );
            })
          }
        </tbody>
      </table>



    </div>
  )
}


