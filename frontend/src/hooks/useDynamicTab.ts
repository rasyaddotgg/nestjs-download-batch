import { useContext } from 'react';
import { DynamicTabContext } from 'src/contexts/DynamicTabContext';

// ----------------------------------------------------------------------

const useDynamicTab = () => useContext(DynamicTabContext);

export default useDynamicTab;
