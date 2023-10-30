import { LoadingButton } from "@mui/lab";
import { Dialog, DialogTitle, DialogContent, TextField, DialogActions, Button } from "@mui/material";
import { useState } from "react";
import { useForm } from "react-hook-form";
import useDatatable from "src/hooks/useDatatable";

export default function FormDialog(props: any) {

    const { open, handleClose, formMode, saveOption, currentRow } = props;
    const { reload, setReload } = useDatatable();
    const [ loading, setLoading ] = useState(false);
  
    const handleSave = async (data: any) => {
      console.log(data);
      let response;
      setLoading(true);
      if (formMode == 'save') {
        response = saveOption.handleSave(data);
      } else {
        response = saveOption.handleEdit(currentRow.id, data);
      }
      setLoading(false);
      setReload()
      
      handleClose();
    };
    
    const { register, handleSubmit } = useForm({
      defaultValues:currentRow
    });
  
    return (
      <div>
        <Dialog open={open} onClose={handleClose}>
          <DialogTitle>{formMode == 'save' ? 'Save' : 'Edit'} Form</DialogTitle>
          <form 
            onSubmit={handleSubmit(handleSave)}
          >
            <DialogContent>
              {
                saveOption.fillable.map((v: any, index: number) =>{
  
                  if(v.type === 'textfield' || v.type === 'number'){
                    return (
                      <TextField
                        key={index}
                        margin="dense"
                        id={v.field}
                        label={v.field}
                        type="text"
                        fullWidth
                        variant="standard"
                        {...register(v.field, v.options)}
                      />
                    )
                  }
  
                  if(v.type === 'file'){
                    return (
                      <TextField
                        key={index}
                        margin="dense"
                        id={v.field}
                        label={v.field}
                        type="file"
                        fullWidth
                        variant="standard"
                        {...register(v.field,v.options)}
                      />
                    )
                  }
                } )
              }
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose}>Cancel</Button>
              <LoadingButton                
                  sx={{
                    bgcolor: 'primary.main',
                    color: (theme) => (theme.palette.mode === 'light' ? 'common.white' : 'grey.800'),
                    '&:hover': {
                      bgcolor: 'primary.dark',
                      color: (theme) => (theme.palette.mode === 'light' ? 'common.white' : 'grey.800'),
                    },
                  }}
                  loading={loading}
                  type="submit"
                  >
                    Save
                  </LoadingButton>
            </DialogActions>
          </form>
        </Dialog>
      </div>
    );
  }