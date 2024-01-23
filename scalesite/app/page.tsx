

import { Greeter } from '@/components/Greeter';
import ChordQualities from '@/components/ChordButtons';
import { WasmProvider } from '@/contexts/WasmContext';
import ScaleRing from '@/components/ScaleRing';
import ScaleContainer from '@/components/ScaleContainer';

export default function Home() {

  return (
    <main className="bg-l_primary flex flex-auto min-h-screen items-center p-24 m-auto">
      <WasmProvider>
      <ScaleContainer/>
      </WasmProvider>
    </main>
  )
}

