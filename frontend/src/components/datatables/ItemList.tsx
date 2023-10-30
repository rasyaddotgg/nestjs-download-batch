import { Card, CardContent, Stack, Typography, CardActions, Button, Collapse, List, ListItem, ListItemText } from "@mui/material";
import { useState } from "react";

export default function ItemList(props: any) {
    const { value, mainColumns, detailColumns } = props;
    const [expanded, setExpanded] = useState(false);
    return (
      <Card sx={{ maxWidth: 345 }}>
        <CardContent>
          <Stack sx={{ width: "100%" }} justifyContent="space-between" direction='row'>
            {mainColumns.map((key: any, k: number) => (
              <Typography key={k}>{key.field}</Typography>
            ))}
          </Stack>
          <Stack sx={{ width: "100%" }} justifyContent="space-between" direction='row'>
            {mainColumns.map((key: any, k: number) => (
              <Typography key={k}>{value[key.field]}</Typography>
            ))}
          </Stack>
        </CardContent>
        <CardActions>
          <Button size="small" onClick={() => { setExpanded(!expanded) }}>More Detail</Button>
        </CardActions>
        <Collapse in={expanded} timeout="auto" unmountOnExit>
          <CardContent>
            <List>
              {detailColumns.map((key: any, k: number) => (
                <ListItem key={k}>
                  <Stack justifyContent={'space-between'} spacing={4} direction={'row'}>
                    <ListItemText
                      primary={key.field}
                    />
                    <ListItemText
                      primary={value[key.field]}
                    />
                  </Stack>
                </ListItem>
              ))}
            </List>
          </CardContent>
        </Collapse>
      </Card>
    )
  }