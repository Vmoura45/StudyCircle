// src/hooks/useMaterial.js
import { useContext } from 'react';
import { MaterialContext } from '../contexts/MaterialContext';

export function useMaterial() {
  const context = useContext(MaterialContext);
  
  if (!context) {
    throw new Error('useMaterial must be used within a MaterialProvider');
  }
  
  return context;
}