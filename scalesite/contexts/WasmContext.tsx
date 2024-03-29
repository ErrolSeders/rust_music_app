'use client'
import { createContext, useContext, useState } from 'react';

async function loadWasmModule() {
    const wasmModule: WasmModule = await import("@/pkg/scalesite_api");
    return wasmModule;
  }
  
const WasmContext = createContext<Promise<WasmModule> | undefined>(undefined);

export const WasmProvider: React.FC<{children: any}> =({ children }) => {
  const [wasmModule] = useState(loadWasmModule());

  return (
    <WasmContext.Provider value={wasmModule}>
      {children}
    </WasmContext.Provider>
  );
};

export const useWasm = () => {
  const context = useContext(WasmContext);
  if (context === undefined) {
    throw new Error('useWasm must be used within a WasmProvider');
  }
  return context;
};