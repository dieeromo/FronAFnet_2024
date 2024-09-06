import React,{useState} from "react";
import Tree from "react-d3-tree";
import TreeDiagram from './TreeDiagram '

// This is a simplified example of an org chart with a depth of 2.
// Note how deeper levels are defined recursively via the `children` property.
const orgChart = {
    name: "CEO",
    children: [
        {
            name: "Manager 04",

            children: [
                {
                    name: "Foreman",
                    attributes: {
                        department: "Fabrication"
                    },
                    children: [
                        {
                            name: "Worker222",
                            children: [
                                {
                                    name: "Ayudante 333",
                                    children: [
                                        {
                                            name: 'suf oficial'
                                        }
                                    ]
                                }
                            ]
                        }
                    ]
                },
                {
                    name: "Foreman",
                    attributes: {
                        department: "Assembly"
                    },
                    children: [
                        {
                            name: "Worker"
                        }
                    ]
                }
            ]
        },
        {
            name: 'marketing'
        }
    ]
};

const ftthNetwork = {
    name: 'OLT',
    children: [
        {
            name: 'Puerto OLT 1',
            children: [
                {
                    name: 'Puerto ODF 1',
                    children: [
                        {
                            name: 'Nap de primer nivel 1',
                            children: [
                                {
                                    name: 'Nap de segundo nivel 1A',
                                    attributes: {
                                        status: 'Activo',
                                    },
                                },
                                {
                                    name: 'Nap de segundo nivel 1B',
                                    attributes: {
                                        status: 'Inactivo',
                                    },
                                },
                            ],
                        },
                        {
                            name: 'Nap de primer nivel 2',
                            children: [
                                {
                                    name: 'Nap de segundo nivel 2A',
                                    attributes: {
                                        status: 'Activo',
                                    },
                                },
                            ],
                        },
                    ],
                },
                {
                    name: 'Puerto ODF 2',
                    children: [
                        {
                            name: 'Nap de primer nivel 3',
                            children: [
                                {
                                    name: 'Nap de segundo nivel 3A',
                                    attributes: {
                                        status: 'Activo',
                                    },
                                },
                                {
                                    name: 'Nap de segundo nivel 3B',
                                    attributes: {
                                        status: 'Inactivo',
                                    },
                                },
                            ],
                        },
                    ],
                },
            ],
        },
        {
            name: 'Puerto OLT 2',
            children: [
                {
                    name: 'Puerto ODF 3',
                    children: [
                        {
                            name: 'Nap de primer nivel 4',
                            children: [
                                {
                                    name: 'Nap de segundo nivel 4A',
                                    attributes: {
                                        status: 'Activo',
                                    },
                                },
                            ],
                        },
                    ],
                },
            ],
        },
    ],
};


export default function OrgChartTree() {

    const [data, setData] = useState([]);
    const [modalData, setModalData] = useState(null);
    

    const handleNodeClick = (nodeData) => {
        setModalData(nodeData);
      };

    const handleSave = (id, name) => {
        // axios.patch(`/api/nodos/${id}/`, { nombre: name })
        //   .then(() => {
        //     setData(prevData => {
        //       const updateNode = (nodes) => {
        //         return nodes.map(node => {
        //           if (node.id === id) {
        //             return { ...node, nombre: name };
        //           }
        //           if (node.children) {
        //             return { ...node, children: updateNode(node.children) };
        //           }
        //           return node;
        //         });
        //       };
        //       return updateNode(prevData);
        //     });
        //   });
      };
    

    const nodeSize = { x: 200, y: 100 }; // Ajustar el tamaño del nodo
    const separation = { siblings: 1, nonSiblings: 1.5 }; // Ajustar la separación entre nodos
    const textLayout = { textAnchor: "start", x: 15, y: -10, transform: undefined };
    return (
        // `<Tree />` will fill width/height of its container; in this case `#treeWrapper`.
        <div className="w-full h-screen flex justify-center items-center" id="treeWrapper">
            <Tree
                data={ftthNetwork}
                //nodeSvgShape={{ shape: 'circle', shapeProps: { r: 10, fill: 'lightblue' } }}
                //textLayout={{ textAnchor: "middle", x: 1, y: -20, transform: "rotate(0)" }} // Ajusta la posición del texto
                //orientation="vertical"
                nodeSize={nodeSize}
                separation={separation}
                textLayout={textLayout}
                pathFunc="diagonal" // Para líneas curvas
                

            />

        
        </div>



    );
}
