import { LoadingButton } from '@mui/lab';
import {
  Stack,
  TextField,
  Card,
  CardContent,
  Typography,
  CardActions,
  Button,
  Collapse,
  List,
  ListItem,
  ListItemText,
  IconButton,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  ButtonGroup,
} from '@mui/material';
import { DataGrid, GridActionsCellItem, GridColDef, GridRowParams } from '@mui/x-data-grid';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { DatatableProvider } from 'src/contexts/DatatableContext';
import useDatatable from 'src/hooks/useDatatable';
import useResponsive from 'src/hooks/useResponsive';
import Iconify from '../iconify';

import FormDialog from './FormDialog';
import ExportExcel from '../exports/ExportExcel';
import ItemList from './ItemList';

export type fillableProps = {
  field: string;
  type: string;
  options?: Object;
};
export type saveOptionProps = {
  handleSave: (body?: any) => void;
  handleEdit?: any;
  fillable: fillableProps[];
};
export type mobileOptionsProps = {
  visible: boolean;
  mainColumns?: any;
  detailColumns?: any;
};
export default function Datatable(props: {
  load: any;
  columns: GridColDef[];
  addonParam?: any;
  getActions?: (row: any) => any;
  searchAction?: (keyword: string) => void;
  responseDataLocation?: string[];
  primaryId?: string;
  mobileOptions?: mobileOptionsProps;
  saveOption?: saveOptionProps;
}) {
  return (
    <DatatableProvider>
      <TableView {...props} />
    </DatatableProvider>
  );
}
function TableView(props: {
  load: any;
  columns: any;
  addonParam?: any;
  primaryId?: string;
  mobileOptions?: mobileOptionsProps;
  saveOption?: saveOptionProps;
  responseDataLocation?: string[];
  getActions?: (row: any) => any;
  searchAction?: (keyword: string) => void;
}) {
  const isDesktop = useResponsive('up', 'lg');
  const { columns, mobileOptions, saveOption, addonParam, primaryId = 'id' } = props;
  if (mobileOptions != undefined) {
    const { visible, mainColumns, detailColumns } = mobileOptions;
  }
  const {
    data,
    page,
    rowCount,
    rowTotal,
    keyword,
    sort,
    reload,
    setSort,
    setData,
    setPage,
    setRowCount,
    setRowTotal,
    setKeyword,
    setReload,
  } = useDatatable();
  useEffect(() => {
    const fetch = async () => {
      setData({
        ...data,
        isLoading: true,
        data: [],
        code: null,
        info: 'waiting',
      });

      let param: any = {
        page: page == 0 ? page + 1 : page,
        limit: rowCount,
        search: keyword,
      };
      // let param = {};
      if (props.searchAction == undefined) {
        param.search = keyword;
      }
      if (sort?.length > 0) {
        param.sortBy = sort[0].field;
        param.order = sort[0].sort;
      }
      if (addonParam !== undefined) {
        param = { ...addonParam, ...param };
      }

      const response: any = props.load(param);
      let responseData = response.data;
      if (props.responseDataLocation) {
        const a: any = props.responseDataLocation;
        responseData = response;
        a.map((v: string) => {
          responseData = responseData[v];
        });
      }
      setRowTotal(response.total);
      setData({
        ...data,
        isLoading: false,
        data: responseData,
        code: 0,
        info: 'Success',
      });
    };
    fetch();
  }, [page, addonParam, rowCount, keyword, sort, reload]);
  columns.map((v: any) => {
    v.flex = 1;
  });

  const index = columns.findIndex((x: any) => x.field === 'actions');
  if (index === -1) {
    columns.push({
      field: 'actions',
      headerName: 'Action',
      type: 'actions',
      getActions: (params: GridRowParams) => {
        let elements = [<></>];

        // if(saveOption?.handleEdit){
        //   elements.push(
        //     <GridActionsCellItem
        //       icon={<Iconify icon="fa6-solid:pencil" />}
        //       label="Edit"
        //       onClick={() => { handleClickOpenForm(params.id, params.row) }}
        //   />
        //   );
        // }
        // elements.push(
        //   <GridActionsCellItem
        //         icon={<Iconify icon="fa6-solid:trash" />}
        //         label="Delete"
        //         // onClick={deleteUser(params.id)}
        //     />
        // )
        return elements;
      },
    });
  }

  const [openForm, setOpenForm] = useState(false);
  const [formMode, setFormMode] = useState('save');
  const [currentRow, setCurrentRow] = useState(null);

  const handleClickOpenForm = (id: string | number | null = null, row: any = null) => {
    setCurrentRow(null);
    if (row) setCurrentRow(row);
    setFormMode(id ? 'update' : 'save');
    setOpenForm(true);
  };

  const handleCloseForm = () => {
    setOpenForm(false);
  };

  return (
    <div style={{ height: '100vh', width: '100%' }}>
      <Stack direction="row" justifyContent={'space-between'}>
        {/* <ButtonGroup variant="contained" color="inherit" aria-label="outlined grey button group"> */}
        <Stack direction="row" spacing={1}>
          <Button variant="contained" color="info" size="small" onClick={setReload}>
            <Iconify width={14} icon="fa6-solid:arrow-rotate-right" />
          </Button>
          <Button variant="contained" color="info" size="small">
            <Iconify icon="fa6-solid:filter" width={14} />
          </Button>
          <ExportExcel
            variant="contained"
            color="info"
            size="small"
            addonParam={props.addonParam}
            load={props.load}
            responseDataLocation={props.responseDataLocation}
          >
            <Iconify width={14} icon="fa6-solid:download" />
          </ExportExcel>
          {saveOption && (
            <Button
              variant="contained"
              color="info"
              size="small"
              onClick={() => handleClickOpenForm()}
            >
              <Iconify icon="fa6-solid:plus" width={14} />
            </Button>
          )}
        </Stack>
        {/* </ButtonGroup> */}
        <TextField
          size="small"
          onChange={(val: any) => {
            if (props.searchAction !== undefined) {
              props.searchAction(val.target.value);
            }

            setKeyword(val.target.value);
          }}
          placeholder="search"
        />
      </Stack>
      {(isDesktop || mobileOptions == undefined) && (
        <DataGrid
          rows={data.data ? data.data : []}
          rowCount={rowTotal}
          loading={data.isLoading}
          rowsPerPageOptions={[10]}
          getRowId={(row) => row[primaryId]}
          pagination
          sortingMode="server"
          onSortModelChange={(val) => {
            setSort(val);
          }}
          page={page}
          pageSize={rowCount}
          paginationMode="server"
          onPageChange={(newPage) => setPage(newPage)}
          onPageSizeChange={(newPageSize) => setRowCount(newPageSize)}
          columns={columns}
        />
      )}
      {!isDesktop && mobileOptions != undefined && (
        <Stack sx={{ width: '100%' }} spacing={2}>
          {data.data?.length > 0 &&
            data.data.map((val: any, i: number) => (
              <ItemList
                value={val}
                mainColumns={mobileOptions?.mainColumns}
                detailColumns={mobileOptions?.detailColumns}
                key={i}
              />
            ))}
        </Stack>
      )}
      {openForm && (
        <FormDialog
          open={openForm}
          handleClose={handleCloseForm}
          formMode={formMode}
          saveOption={saveOption}
          currentRow={currentRow}
        />
      )}
    </div>
  );
}
