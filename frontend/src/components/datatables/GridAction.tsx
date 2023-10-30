import { IconButton } from "@mui/material";
import Iconify from "../iconify";

export default function GridAction(props: any){
    return (
        <IconButton size="small" {...props}>
            {/* {props.icon} */}
            <Iconify icon={'fa6-solid:ellipsis-vertical'}/>
        </IconButton>
    )
}