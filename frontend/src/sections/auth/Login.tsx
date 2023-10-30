// @mui
import { Alert, Tooltip, Stack, Typography, Link, Box } from '@mui/material';
import { personalization } from 'src/config';
// hooks
import { useAuthContext } from '../../auth/useAuthContext';
// layouts
import LoginLayout from '../../layouts/login';
//
import AuthLoginForm from './AuthLoginForm';
import AuthWithSocial from './AuthWithSocial';

// ----------------------------------------------------------------------

export default function Login() {
  const { method } = useAuthContext();

  return (
    <LoginLayout illustration={'https://hrmis.neuron.id/assets/personalization/4a273291f377393477c0c9b87a60cfaf.png'}>
      <Stack spacing={2} sx={{ mb: 5, position: 'relative' }}>
        <Typography variant="h4">{personalization.application}</Typography>

        <Stack direction="row" spacing={0.5}>
          <Typography variant="body2">New user?</Typography>

          <Link variant="subtitle2">Create an account</Link>
        </Stack>

        {/* <Tooltip title={method} placement="left">
          <Box
            component="img"
            alt={method}
            src={`/assets/icons/auth/ic_${method}.png`}
            sx={{ width: 32, height: 32, position: 'absolute', right: 0 }}
          />
        </Tooltip> */}
      </Stack>

      <AuthLoginForm />

      <AuthWithSocial />
    </LoginLayout>
  );
}
