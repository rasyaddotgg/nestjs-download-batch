
// components & @mui
import { Card, CardContent, Container, List, ListItem, ListItemText, Stack, Typography } from '@mui/material';
import Page from 'src/components/Page';
import Header from 'src/sections/articles/Header';
import Content from 'src/sections/articles/Content';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';

//hooks
import { useSettingsContext } from '../components/settings';
import { useAuthContext } from 'src/auth/useAuthContext';
import { useEffect } from 'react';

//redux
import { useDispatch, useSelector } from 'src/redux/store';
import { addLike, addView, getArticle } from 'src/redux/slices/article';
// ----------------------------------------------------------------------

export default function PageOne() {
  const { user } = useAuthContext();
  const dispatch = useDispatch();

  const { isLoading, data, like } = useSelector((state) => state.article)
  useEffect(() => {
    dispatch(getArticle());
    dispatch(addView());
  }, [dispatch]);
  return (
    <>
      <Page title="Articles">
        <Typography variant="h3" component="h1" paragraph>
          Welcome to neuron skeleton
        </Typography>
        <Card>
          <CardContent sx={{ overflow: 'auto' }}>
            <List>
              <ListItem>
                <ListItemText>Username : {user?.name}</ListItemText>
              </ListItem>
              <Divider/>
              <ListItem>
                <ListItemText>Grants : {JSON.stringify(user?.grants)}</ListItemText>
              </ListItem>
              <Divider/>
              <ListItem>
                <ListItemText>Roles : {JSON.stringify(user?.roles)}</ListItemText>
              </ListItem>
              <Divider/>
              <ListItem>
                <ListItemText>Token : {user?.token}</ListItemText>
              </ListItem>
              <Divider/>
            </List>
          </CardContent>
        </Card>
        <Stack sx={{display:'none'}}>
          {/* Section Header */}
          <Header />
          {/* Section Content */}
          <Content />
          {/* Section Rating */}
          {/* Section Comment */}
          Like : { like }
          views : { data?.views }
          <Card>
            <CardContent>
            { isLoading && (<>Please Wait</>)} 
            <Typography>{data?.title}</Typography>
            <Typography>{data?.content}</Typography>
            </CardContent>
          </Card>
          <LikeSection />
        </Stack>
      </Page>
    </>
  );
}

function LikeSection(){
  const dispatch = useDispatch();
  return (
    <Button onClick={ () => dispatch(addLike()) }>Like</Button>
  )
}
