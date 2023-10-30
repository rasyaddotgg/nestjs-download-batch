import { IconButton, Stack } from "@mui/material";
import Iconify from "src/components/iconify";
// import { topMenu } from "./config";

export default function NavMain(){
    return (
        <Stack direction={'row'} justifyContent="center" spacing={1}>
        {/* {
          topMenu.map((val)=>(
            <IconButton key={val.icon}>
              <Iconify icon={val.icon} width={18} height={18}/>
            </IconButton>
          ))
        } */}
        </Stack>
    )
} 