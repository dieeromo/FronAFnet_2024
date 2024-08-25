import React, { useState } from 'react';
import Tree from 'react-d3-tree';

const treeData = {
  name: 'Parent Node',
  children: [
    {
      name: 'Child Node 1',
      children: [
        {
          name: 'Grandchild Node 1',
        },
        {
          name: 'Grandchild Node 2',
        },
      ],
    },
    {
      name: 'Child Node 2',
      children: [
        {
          name: 'Grandchild Node 3',
          children:[
            {
                name:'hijo'
            }
            
          ]
        },
      ],
    },
  ],
};

const TreeDiagram = () => {
  const [translate, setTranslate] = useState({ x: 0, y: 0 });

  const containerRef = React.createRef();

  React.useEffect(() => {
    if (containerRef.current) {
      const dimensions = containerRef.current.getBoundingClientRect();
      setTranslate({
        x: dimensions.width / 3,
        y: dimensions.height / 3,
      });
    }
  }, [containerRef]);

  return (
    <div
      id="treeWrapper"
      className="w-full h-screen flex justify-center items-center bg-gray-100"
      ref={containerRef}
    >
      <Tree
        data={treeData}
        translate={translate}
        orientation="vertical"
        pathFunc="diagonal"
        rootNodeClassName="node__root"
        branchNodeClassName="node__branch"
        leafNodeClassName="node__leaf"
        collapsible={false}
        initialDepth={1}
      />
    </div>
  );
};

export default TreeDiagram;
