
import ChordQualities from '@/components/ChordButtons';
import { WasmProvider } from '@/contexts/WasmContext';
import ScaleRing from '@/components/ScaleRing';
import ScaleContainer from '@/components/ScaleContainer';
import { NoteNameProvider } from '@/contexts/NoteNameContext';

export default function Home() {

  return (
    <main className="flex min-h-screen min-w-screen items-center justify-center p-2">
      <WasmProvider>
      <NoteNameProvider>
        <ScaleContainer/>
      </NoteNameProvider>
      </WasmProvider>
    </main>
  )
}

