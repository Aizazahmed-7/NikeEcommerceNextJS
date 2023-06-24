'use client'
import React, { createContext, useState } from 'react';

export const KeywordContext = createContext({
  keyword: '',
  setKeyword: () => {}
});

export function KeywordProvider({ children }) {
  const [keyword, setKeyword] = useState('');

  return (
    <KeywordContext.Provider value={{ keyword, setKeyword }}>
      {children}
    </KeywordContext.Provider>
  );
}
