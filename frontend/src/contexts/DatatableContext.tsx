import { ReactNode, createContext, useState, useEffect } from 'react';
import { AnyObject } from 'yup/lib/types';

// ----------------------------------------------------------------------
export type DatatableContextProps = {
  data: any;
  page: number;
  sort: any;
  rowCount: number;
  rowTotal: number;
  keyword: string;
  reload: number;
  setSort: (value: any) => void;
  setData: (value: any) => void;
  setPage: (value: number) => void;
  setRowCount: (value: number) => void;
  setRowTotal: (value: number) => void;
  setKeyword: (value: string) => void;
  setReload: () => void;
};
const carts: any = [];

const initialState: DatatableContextProps = {
  data: {
    isLoading: true,
    data: [],
    code: null,
    info:null
  },
  page: 1,
  sort: [],
  rowCount: 10,
  rowTotal: 0,
  keyword: '',
  reload: 0,
  setData: () => {},
  setSort: () => {},
  setPage: () => {},
  setRowCount: () => {},
  setRowTotal: () => {},
  setKeyword: () => {},
  setReload: () => {}
};

const DatatableContext = createContext(initialState);

type DatatableProviderProps = {
  children: ReactNode;
};

function DatatableProvider({ children }: DatatableProviderProps) {

  const [ data, setData ] = useState<any>({
    isLoading: true,
    data: [],
    code: null,
    info:null
  });
  const [ page,setPage ] = useState(1);
  const [ sort,setSort ] = useState();
  const [ reload,setReload ] = useState(0);
  const [ rowCount,setRowCount ] = useState(10);
  const [ keyword,setKeyword ] = useState('');
  const [ rowTotal,setRowTotal ] = useState(0);

  const handleReload = () => {
    setReload(reload+1)
  }
  
  
  return (
    <DatatableContext.Provider
    value={{
        data: data,
        page: page,
        sort: sort,
        rowCount: rowCount,
        rowTotal: rowTotal,
        keyword: keyword,
        reload: reload,
        setSort: setSort,
        setData: setData,
        setPage: setPage,
        setRowCount: setRowCount,
        setRowTotal: setRowTotal,
        setKeyword: setKeyword,
        setReload: handleReload,
      }}
    >
      {children}
    </DatatableContext.Provider>
  );
}

export { DatatableProvider, DatatableContext };
