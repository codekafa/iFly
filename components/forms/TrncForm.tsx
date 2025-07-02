import React from 'react';
import { BaseForm } from './BaseForm';

interface TrncFormProps {
  initialFrom?: string;
  initialTo?: string;
}

const TrncForm = ({ initialFrom, initialTo }: TrncFormProps) => {
  return <BaseForm 
    toFixed="kibris" 
    initialFrom={initialFrom}
    initialTo={initialTo}
  />;
};

export default TrncForm; 