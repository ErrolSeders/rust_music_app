'use client'
import { NOTENUMBERSFLATS } from '@/constants/constants';
import { createContext, useContext, useState } from 'react';

interface NoteNamesContextValues {
    noteNames: NoteNames, 
    setNoteNames: ReactSetter<NoteNames>
}

const NoteContext = createContext<NoteNamesContextValues | undefined>(undefined);

export const NoteNameProvider: React.FC<{children: any}> =({ children }) => {
    const [noteNames, setNoteNames] = useState(NOTENUMBERSFLATS);

    return (
        <NoteContext.Provider value={{noteNames,setNoteNames}}>
            {children}
        </NoteContext.Provider>
    );
};

export const useNoteNames = () => {
    const context = useContext(NoteContext);
    if (context === undefined) {
        throw new Error('useNoteNames must be used within a NoteProvider');
    }
    return context;
}