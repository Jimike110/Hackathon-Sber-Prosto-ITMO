// app/ui/components/Map/index.tsx
import { Card } from 'antd';
import React, { useEffect, useState } from 'react';
import ParkingSpaceModal from '../Modal';
import { fetchData, isApiError } from '@/app/lib/api';

interface MapItem {
  id: number;
  x: number;
  y: number;
  address: string;
  name: string;
  spaces: SpaceItem[];
}

interface SpaceItem {
  id: number;
  x: number;
  y: number;
  type: string;
  space_type: string;
  status: string;
}

const ParkingMap = () => {
  const rowSpacing = 20;
  const spaceWidth = 10;
  const roadColor = '#f0eded';

  const [map, setMap] = useState<MapItem[]>([]);
  const [selectedSpace, setSelectedSpace] = useState<SpaceItem | null>(null);

  const handleSpaceClick = (space: SpaceItem) => {
    if (space.status === "AVAILABLE") {
      setSelectedSpace(space);
    }
  };

  const closeModal = () => {
    setSelectedSpace(null);
  };

  const getMap = async () => {
    try {
      const data = await fetchData<MapItem[]>("/api/parking/space/list"); // Real API request
      setMap(data);
    } catch (error) {
      if (isApiError(error)) {
        console.log("API Error: ", error.message);
      }
    }
  };

  // useEffect(() => {
  //   getMap(); // Fetch data once on mount

  //   const interval = setInterval(() => {
  //     getMap(); // Fetch data every second
  //   }, 1000);

  //   return () => clearInterval(interval); // Cleanup on unmount
  // }, []);

  const lot = map[0];
  const maxX = lot ? lot.x : 0;
  const maxY = lot ? lot.y : 0;

  const getSpaceColor = (status: string) => {
    if (status === "AVAILABLE") return "#4CFF00";
    else if (status === "BLOCKED") return "red";
    else if (status === "DISABLE") return "grey";
    return "#4CFF00";
  };

  return (
    <>
      {selectedSpace && (
        <ParkingSpaceModal 
          visible={true}
          onClose={closeModal}
          spaceInfo={{ row: selectedSpace.y, column: selectedSpace.x }}
        />
      )}

      <Card style={{ padding: 16 }}>
        <div style={{ 
          display: 'flex',
          flexDirection: 'column',
          gap: rowSpacing,
          backgroundColor: roadColor,
          padding: 16,
          borderRadius: 4
        }}>
          {Array.from({ length: maxY }).map((_, rowIndex) => (
            <div key={rowIndex} style={{
              display: 'flex',
              gap: 10,
              position: 'relative'
            }}>
              <div style={{
                display: 'flex',
                gap: 20,
                flex: 1,
                backgroundColor: 'transparent'
              }}>
                {Array.from({ length: maxX }).map((_, colIndex) => {
                  const space = lot ? lot.spaces.find(s => s.x === colIndex + 1 && s.y === rowIndex + 1) : null;
                  const color = space ? getSpaceColor(space.status) : "#fff";
                  return (
                    <div
                      key={`${rowIndex}-${colIndex}`}
                      style={{
                        flex: 1,
                        minWidth: spaceWidth,
                        height: 50,
                        width: 50,
                        backgroundColor: color,
                        borderRadius: '10px',
                        cursor: space && space.status === "AVAILABLE" ? 'pointer' : 'default',
                        transition: 'all 0.2s',
                        position: 'relative',
                        boxSizing: 'border-box',
                      }}
                      onClick={() => space && handleSpaceClick(space)}
                    >
                      <div style={{
                        position: 'absolute',
                        bottom: 4,
                        right: 4,
                        fontSize: 10,
                        color: '#666'
                      }}>
                        {rowIndex + 1}-{colIndex + 1}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </Card>
    </>
  );
};

export default ParkingMap;
