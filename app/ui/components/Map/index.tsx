import { Card } from 'antd';
import React, { useEffect, useState } from 'react';
import ParkingSpaceModal from '../Modal';
import { fetchData, isApiError } from '@/app/lib/api';

interface MapItem {
  id: number;
  color: string;
  x: number;
  y: number;
}

type MapList = MapItem[];

const ParkingMap = () => {
  const rowSpacing = 20;
  const spaceWidth = 10;
  const roadColor = '#f0eded';

  const [map, setMap] = useState<MapList>([]);

  // Modal state management
  const [selectedSpace, setSelectedSpace] = useState<{
    row: number;
    column: number;
  } | null>(null);

  const handleSpaceClick = (rowIndex: number, colIndex: number) => {
    setSelectedSpace({
      row: rowIndex + 1,
      column: colIndex + 1
    });
  };

  const closeModal = () => {
    setSelectedSpace(null);
  };

  const getMap = async () => {
    try {
      const data = await fetchData<MapList>("/api/parking/space/list");
      console.log(data);
      setMap(data);
    } catch (error) {
      if (isApiError(error)) {
        console.log("API Error: ", error.message);
      }
      throw error;
    }
  };

  useEffect(() => {
    const timeout = setTimeout(() => {
      getMap();
    }, 100);

    return () => clearTimeout(timeout);
  }, []);

  // Find the grid size dynamically
  // const maxX = Math.max(...map.map(space => space.x), 0);
  // const maxY = Math.max(...map.map(space => space.y), 0);
  const maxX = 10, maxY = 5;

  return (
    <>
      <ParkingSpaceModal 
        visible={!!selectedSpace}
        onClose={closeModal}
        spaceInfo={selectedSpace}
      />

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
                  const space = map.find(space => space.x === colIndex + 1 && space.y === rowIndex + 1);
                  return (
                    <div
                      key={`${rowIndex}-${colIndex}`}
                      style={{
                        flex: 1,
                        minWidth: spaceWidth,
                        height: 100,
                        backgroundColor: space ? space.color : '#4CFF00',
                        borderRadius: '10px',
                        cursor: 'pointer',
                        transition: 'all 0.2s',
                        position: 'relative',
                        boxSizing: 'border-box',
                      }}
                      onClick={() => handleSpaceClick(rowIndex, colIndex)}
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

              {rowIndex < maxY - 1 && (
                <div style={{
                  position: 'absolute',
                  bottom: -rowSpacing,
                  left: 0,
                  right: 0,
                  height: rowSpacing,
                  backgroundColor: roadColor
                }}></div>
              )}
            </div>
          ))}
        </div>
      </Card>
    </>
  );
};

export default ParkingMap;
