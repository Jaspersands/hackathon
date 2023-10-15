import { createContext, useContext, useState } from 'react';

const SemesterContext = createContext();

export function SemesterProvider({ children }) {
  const [semester, setSemester] = useState('');

  return (
    <SemesterContext.Provider value={{ semester, setSemester }}>
      {children}
    </SemesterContext.Provider>
  );
}

export function useSemester() {
  return useContext(SemesterContext);
}
