import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface VehicleState {
  activeVehicleId: string | null
  setActiveVehicleId: (id: string | null) => void
}

export const useVehicleStore = create<VehicleState>()(
  persist(
    (set) => ({
      activeVehicleId: null,
      setActiveVehicleId: (id) => set({ activeVehicleId: id }),
    }),
    { name: 'myroda-active-vehicle' },
  ),
)
