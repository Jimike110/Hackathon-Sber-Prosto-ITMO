import { Card } from 'antd';
import React, { useEffect, useState } from 'react';
import ParkingSpaceModal from '../Modal';
import { fetchData, isApiError } from '@/app/lib/api';

interface MapItem {
  id: number;
  x: number; // overall grid width (number of columns)
  y: number; // overall grid height (number of rows)
  address: string;
  name: string;
  spaces: SpaceItem[];
}

interface SpaceItem {
  id: number;
  x: number; // column position (1-indexed)
  y: number; // row position (1-indexed)
  type: string;
  space_type: string;
  status: string;
}

const fakeData: MapItem[] = [
  {
    id: 1,
    x: 10,
    y: 50,
    address: "Fake Address",
    name: "Fake Parking Lot",
    spaces: [
      {
        id: 1,
        x: 1,
        y: 1,
        type: "PLACE",
        space_type: "OWNED",
        status: "BLOCKED",
      },
      {
        id: 2,
        x: 2,
        y: 1,
        type: "PLACE",
        space_type: "OWNED",
        status: "AVAILABLE",
      },
      {
        id: 3,
        x: 3,
        y: 1,
        type: "PLACE",
        space_type: "OWNED",
        status: "DISABLE",
      },
      // Add more spaces as needed...
    ],
  },
];

const ParkingMap = () => {
  const rowSpacing = 20;
  const spaceWidth = 10;
  const roadColor = '#f0eded';

  // We'll store parking lots (MapItem[]) returned from the API.
  const [map, setMap] = useState<MapItem[]>([]);
  // For the modal, store the currently selected space (if any).
  const [selectedSpace, setSelectedSpace] = useState<SpaceItem | null>(null);

  // When a space is clicked, set it as the selectedSpace.
  const handleSpaceClick = (space: SpaceItem) => {
    if (space.status !== "BLOCKED") {
      setSelectedSpace(space);
    }
  };

  const closeModal = () => {
    setSelectedSpace(null);
  };

  // Fetch data (for now we use fakeData)
  const getMap = async () => {
    try {
      // Uncomment the line below to use your API when ready
      // const data = await fetchData<MapItem[]>("/api/parking/space/list");
      // For testing, we use fakeData:
      // console.log(data);
      setMap(fakeData);
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
  }, [map]);

  // For now, assume there is only one parking lot. In a real scenario, you might want to handle multiple lots.
  const lot = map[0];

  // If there's a lot, use its x and y as grid dimensions
  const maxX = lot ? lot.x : 0;
  const maxY = lot ? lot.y : 0;

  // Helper: determine background color based on space status.
  const getSpaceColor = (status: string) => {
    if (status === "AVAILABLE") return "#4CFF00";
    else if (status === "BLOCKED") return "red";
    else if (status === "DISABLE") return "grey";
    else return "#4CFF00";
  };

  return (
    <>
      {selectedSpace && (
        <ParkingSpaceModal 
          visible={true}
          onClose={closeModal}
          // You can modify your modal to accept the full space object
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
          {/* Render grid rows */}
          {Array.from({ length: maxY }).map((_, rowIndex) => (
            <div key={rowIndex} style={{
              display: 'flex',
              gap: 10,
              position: 'relative'
            }}>
              {/* Render grid columns */}
              <div style={{
                display: 'flex',
                gap: 20,
                flex: 1,
                backgroundColor: 'transparent'
              }}>
                {Array.from({ length: maxX }).map((_, colIndex) => {
                  // Grid positions are 1-indexed.
                  const space = lot ? lot.spaces.find(s => s.x === colIndex + 1 && s.y === rowIndex + 1) : null;
                  const color = space ? getSpaceColor(space.status) : "#fff";
                  return (
                    <div
                      key={`${rowIndex}-${colIndex}`}
                      style={{
                        flex: 1,
                        minWidth: spaceWidth,
                        height: 100,
                        backgroundColor: color,
                        borderRadius: '10px',
                        cursor: space && space.status !== "DISABLE" ? 'pointer' : 'default',
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
