import { ReactNode, createContext, useState, useEffect } from 'react';
// hooks
import useResponsive from '../hooks/useResponsive';

// ----------------------------------------------------------------------
export type TabActiveProps = {
  label: string;
  link: string;
}
export type DynamicTabContextProps = {
  tabActive: TabActiveProps | null;
  tabList: TabActiveProps[];
  onTabChange: (newTab: TabActiveProps) => void;
  onTabAdd: (newTab: TabActiveProps) => void;
  onTabDelete: (link: string) => string;
};

const initialState: DynamicTabContextProps = {
  tabActive: null,
  tabList: [],
  onTabChange: () => {},
  onTabAdd: () => {},
  onTabDelete: () => {return ''}
};

const DynamicTabContext = createContext(initialState);

type DynamicTabProviderProps = {
  children: ReactNode;
};

function DynamicTabProvider({ children }: DynamicTabProviderProps) {

  const [tab, setTab] = useState<TabActiveProps[]>([]);
  const [activetab, setActivetab] = useState<TabActiveProps|null>(null);

  const handleAddTab = (newTab: TabActiveProps) => {
    if(!tab.find(x => x.link === newTab.link)){
      setTab([...tab,newTab]);
    }
    handleActiveTab(newTab);
  };
  const handleActiveTab = (newTab: TabActiveProps) => {
    setActivetab(newTab);
  };
  const handleDeleteTab = (link: string) => {
    let index = tab.findIndex(x => x.link === link);
    if(index >= 0 && tab.length > 1){
      setTab(tab.filter(item => item.link !== link));
      let target_tab; 
      if(index > 0){
        target_tab = tab[index - 1];
      }else{
        target_tab = tab[1];
      }
      setActivetab(target_tab);
      return target_tab.link;
    }
    return '';
  };
  
  return (
    <DynamicTabContext.Provider
    value={{
      tabActive: activetab,
      tabList: tab,
        onTabChange: handleActiveTab,
        onTabAdd: handleAddTab,
        onTabDelete: handleDeleteTab
      }}
    >
      {children}
    </DynamicTabContext.Provider>
  );
}

export { DynamicTabProvider, DynamicTabContext };
