/* eslint-disable react/jsx-key */
import * as React from 'react';
import {
  DataGrid,
  GridRowId,
  GridColumns,
  GridRowParams,
  GridActionsCellItem,
} from '@mui/x-data-grid';
import DeleteIcon from '@mui/icons-material/Delete';
import SecurityIcon from '@mui/icons-material/Security';
import FileCopyIcon from '@mui/icons-material/FileCopy';
import Datatable, { saveOptionProps } from 'src/components/datatables/Datatable';
import Page from 'src/components/Page';
import { save } from 'src/api_handler/person';
import { load } from 'src/api_handler/users';

export default function EmployeeList() {
  //   const columns = React.useMemo<GridColumns>(
  //     () => [
  //         { field: 'id', headerName: 'ID', width: 90 },
  //         {
  //             field: 'name',
  //             headerName: 'Name',
  //             width: 150,
  //             editable: true,
  //         },
  //         {
  //             field: 'address',
  //             headerName: 'Address',
  //             width: 100,
  //             editable: true,
  //         },
  //         {
  //             field: 'phone_number',
  //             headerName: 'Phone Number',
  //             type: 'number',
  //             width: 120,
  //             editable: true,
  //         },
  //
  //     ],
  //     [],
  //   );
  const columns = [
    { field: 'user_id', headerName: 'ID', width: 90 },
    {
      field: 'name',
      headerName: 'Name',
      width: 150,
      editable: true,
    },
    {
      field: 'address',
      headerName: 'Address',
      width: 100,
      editable: true,
    },
    {
      field: 'phone_number',
      headerName: 'Phone Number',
      type: 'number',
      width: 120,
      editable: true,
    },
    // {
    //     field: 'actions',
    //     type: 'actions',
    //     width: 80,
    //     getActions: (params: GridRowParams) => [
    //     <GridActionsCellItem
    //         icon={<DeleteIcon />}
    //         label="Delete"
    //         // onClick={deleteUser(params.id)}
    //     />,
    //     <GridActionsCellItem
    //         icon={<SecurityIcon />}
    //         label="Toggle Admin"
    //         showInMenu
    //     />,
    //     <GridActionsCellItem
    //         icon={<FileCopyIcon />}
    //         label="Duplicate User"
    //         showInMenu
    //     />
    //     ],
    // },
  ];

  const saveoption: saveOptionProps = {
    handleSave: save,
    fillable: [
      {
        field: 'name',
        type: 'textfield',
        options: {
          required: true,
        },
      },
      {
        field: 'address',
        type: 'textfield',
      },
    ],
  };
  return (
    <Page title="employe">
      <Datatable
        load={load}
        columns={columns}
        saveOption={saveoption}
        primaryId="user_id"
        responseDataLocation={['data', 'data', 'list']}
      />
    </Page>
  );
}
