import { useContext } from 'react';
import { DatatableContext } from 'src/contexts/DatatableContext';

// ----------------------------------------------------------------------

const useDatatable = () => useContext(DatatableContext);

export default useDatatable;
