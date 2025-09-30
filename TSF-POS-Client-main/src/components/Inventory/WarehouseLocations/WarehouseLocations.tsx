import React from "react";
import Button from "../../core/Button/Button";
import { WarehouseLocation } from "../../../types/Inventory/inventoryTypes";

interface WarehouseLocationsProps {
  locations: WarehouseLocation[];
  loading: boolean;
  onEdit: (location: WarehouseLocation) => void;
  onDelete: (id: string) => void;
}

const WarehouseLocations: React.FC<WarehouseLocationsProps> = ({ locations, loading, onEdit, onDelete }) => {
  const calculateOccupancyPercentage = (current: number, capacity: number) => {
    return capacity > 0 ? Math.round((current / capacity) * 100) : 0;
  };

  return (
    <div className="warehouse-locations">
      <table className="modern-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Code</th>
            <th>Description</th>
            <th>Capacity</th>
            <th>Current Occupancy</th>
            <th>Utilization</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {locations.map((location) => (
            <tr key={location._id}>
              <td>{location.name}</td>
              <td>{location.code}</td>
              <td>{location.description || "N/A"}</td>
              <td>{location.capacity || "Unlimited"}</td>
              <td>{location.currentOccupancy || 0}</td>
              <td>
                {location.capacity ? (
                  <div className="utilization-bar">
                    <div className="utilization-progress">
                      <div 
                        className="utilization-fill"
                        style={{ 
                          width: `${calculateOccupancyPercentage(location.currentOccupancy || 0, location.capacity)}%`,
                          backgroundColor: calculateOccupancyPercentage(location.currentOccupancy || 0, location.capacity) >= 90 ? '#dc3545' : 
                                         calculateOccupancyPercentage(location.currentOccupancy || 0, location.capacity) >= 75 ? '#ffc107' : '#28a745'
                        }}
                      ></div>
                    </div>
                    <span className="utilization-text">
                      {calculateOccupancyPercentage(location.currentOccupancy || 0, location.capacity)}%
                    </span>
                  </div>
                ) : (
                  <span className="unlimited-badge">Unlimited</span>
                )}
              </td>
              <td>
                <Button 
                  title="Edit"
                  className="modern-btn modern-btn-outline modern-btn-sm me-2"
                  onClick={() => onEdit(location)}
                />
                <Button 
                  title="Delete"
                  className="modern-btn modern-btn-danger modern-btn-sm"
                  onClick={() => onDelete(location._id)}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default WarehouseLocations;