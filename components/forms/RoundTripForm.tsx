import React from 'react';
import { BaseForm } from './BaseForm';

interface RoundTripFormProps {
  initialFrom?: string;
  initialTo?: string;
}

const RoundTripForm = ({ initialFrom, initialTo }: RoundTripFormProps) => {
  return <BaseForm 
    isRoundTripOnly={true} 
    initialFrom={initialFrom}
    initialTo={initialTo}
    initialTripType="roundtrip"
  />;
};

export default RoundTripForm; 