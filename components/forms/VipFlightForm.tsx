import React from 'react';
import { BaseForm } from './BaseForm';

interface VipFlightFormProps {
  initialFrom?: string;
  initialTo?: string;
  initialTripType?: 'oneway' | 'roundtrip';
}

const VipFlightForm = ({ initialFrom, initialTo, initialTripType }: VipFlightFormProps) => {
  return <BaseForm 
    initialFrom={initialFrom}
    initialTo={initialTo}
    initialTripType={initialTripType}
  />;
};

export default VipFlightForm; 