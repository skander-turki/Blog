import * as React from 'react'; 
import { DataGrid ,GridActionsCellItem } from '@mui/x-data-grid';
import DeleteIcon from '@mui/icons-material/Delete';
import SecurityIcon from '@mui/icons-material/Security';
import moment from 'moment';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

function DisplayPosts ({Delete ,Update, list}) {
        //const dispatch = useDispatch();
      const columns = [
        { field: '_id', headerName: 'ID', width: 160 },
        { field: 'Titre', headerName: 'Titre', width: 160 },
        { field: 'DatePost', headerName: 'DatePost', width: 200 ,},
        { field: 'LikesNumber', headerName: 'LikesNumber', type: 'number', width: 160 },
        {
            field: 'ViewNumber',
            headerName: 'ViewNumber',
            type: 'number',
            width: 100,
        },
        {
            field: 'Description',
            headerName: 'Description',
            description: 'This column is not sortable.',
            sortable: false,
            width: 100,
        },
        {
          field: 'Description',
          headerName: 'Description',
          description: 'This column is not sortable.',
          sortable: false,
          width: 100,
      },
      {
        field: 'actions',
        type: 'actions',
        width: 80,
        getActions: (params) => [
          <GridActionsCellItem
            icon={<DeleteIcon />}
            label="Delete"
            onClick={Delete( params.id)}
          />,
          <GridActionsCellItem
            icon={<SecurityIcon />}
            label="Update Article"
            onClick={Update(params.id)}
          />,  
        ],
      }
    ];
        return (
            <div>
            { list.length !== 0 ? <div style={{ height: 600, width: '100%' }}>
              <DataGrid
                rows={list}
                columns={columns}
                getRowId={(row) =>  row._id }
                initialState={{
                  pagination: {
                    paginationModel: { page: 0, pageSize: 5 },
                  },
                }}
                pageSizeOptions={[5, 10]}
              /> 
              
            </div> : 
            <Box sx={{ display: 'flex' , justifyContent:'center'}}>
                <CircularProgress />
            </Box>
            }
            </div>
          );
    
}
export default DisplayPosts;