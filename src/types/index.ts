export interface Vehicle {
  chassis: string;
  position: string;
  comment?: string;
  timestamp: number;
}

export interface UserState {
  name: string;
  setName: (name: string) => void;
}

export interface VehicleState {
  vehicles: Vehicle[];
  addVehicle: (vehicle: Omit<Vehicle, 'timestamp'>) => void;
  clearVehicles: () => void;
}