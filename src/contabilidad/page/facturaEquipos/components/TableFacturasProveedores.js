import React from 'react'
import { useMemo } from "react";
import { useTable, useSortBy, useGlobalFilter, useAsyncDebounce } from "react-table";
import ModalPagoFacturaEquipo from './ModalPagoFacturaEquipo'
import { useState, } from 'react';


function useColumns() {
    const columns = useMemo(
        () => [
            {
                Header: "id",
                accessor: "id"
            },
            {
                Header: "Proveedor",
                accessor: "proveedorName"
            },
            {
                Header: "Emisión",
                accessor: "fecha_emision"
            },
            {
                Header: "# factura",
                accessor: "numeroFactura",
                Cell:({row})=>(
                    <a href={`/fp/facturasdetalles/${row.original.id}`}>{row.original.numeroFactura}</a>
                )
            },

            {
                Header: "Descripción",
                accessor: "descripcion"
            },
            {
                Header: "Valor",
                accessor: "valor",
                Cell:({row})=>(
                    <span className={row.original.abono >= row.original.valor ? "text-green-400 font-bold" : "text-red-400 font-bold"}> 
                    {row.original.valor}</span>
                )
            },
            {
                Header: "Abono",
                accessor: "abono"
            },
            {
                Header: "Modo C",
                accessor: "modoCompraName"
            },
            {
                Header: "Invent",
                accessor: "inventarioName"
            },
            {
                Header: "Inv. ingresado",
                accessor: "equiposIngresadosName"
            },
     
            {
                Header: "Acciones",
                Cell:({row})=>(
                    <div>
                        <div>
                            { parseFloat(row.original.abono) < parseFloat(row.original.valor) ?
                                <ModalPagoFacturaEquipo
                                facturaID={row.original.id}
                                />
                                :<> </>
                            
                            }
                        </div>
                        <div>
                            {row.original.inventarioName === 'si' && row.original.equiposIngresadosName ==='no' &&(<a href={`/inventario/equipos_factura/${row.original.id}/`}>Ingresar</a>) 
                            }
                        </div>
                    </div>
                    
                )
            },
     

        ],
        []
    );

    return columns;
}


function CarsFilter({ preGlobalFilteredRows, globalFilter, setGlobalFilter }) {

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
                placeholder={`palabra clave`}
            />
        </span>
    );
}


export default function TableFacturasProveedores({ datafacturas }) {

    const columns = useColumns();
    const data = datafacturas;
    const table = useTable({ columns, data }, useGlobalFilter, useSortBy);
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
        <div>
            <table {...getTableProps()}>


                <thead>
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
                        headerGroups.map((headerGroup,index1) => (
                            // Añadimos las propiedades al conjunto de columnas
                            <tr key={index1} {...headerGroup.getHeaderGroupProps()} colSpan="2" >
                                {
                                    // Recorremos cada columna del conjunto para acceder a su información
                                    headerGroup.headers.map((column,index2) => (
                                        // Añadimos las propiedades a cada celda de la cabecera
                                        <th key={index2} {...column.getHeaderProps(column.getSortByToggleProps())}
                                            className={column.isSorted ? column.isSortedDesc ? "bg-green-500" : "bg-red-200" : "na"}>
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
                        rows.map((row, index) => {
                            // Llamamos a la función que prepara la fila previo renderizado
                            prepareRow(row);
                            return (
                                // Añadimos las propiedades a la fila
                                <tr key={(index)} {...row.getRowProps()} className="hover:bg-gray-100">
                                    {
                                        // Recorremos cada celda de la fila
                                        row.cells.map((cell,index) => {
                                            // Añadimos las propiedades a cada celda de la fila
                                            return (
                                                <td key={index} {...cell.getCellProps()} className="border px-4 py-2">
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
