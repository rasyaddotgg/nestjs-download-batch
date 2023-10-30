// routes
import { PATH_DASHBOARD, PATH_EMPLOYEE } from '../../../routes/paths';
// components
import SvgColor from '../../../components/svg-color';

// ----------------------------------------------------------------------

const icon = (name: string) => (
  <SvgColor src={`/assets/icons/navbar/${name}.svg`} sx={{ width: 1, height: 1 }} />
);

const ICONS = {
  user: icon('ic_user'),
  ecommerce: icon('ic_ecommerce'),
  analytics: icon('ic_analytics'),
  dashboard: icon('ic_dashboard'),
};

const navConfig = [
  // GENERAL
  // ----------------------------------------------------------------------
  {
    subheader: 'General',
    items: [
      { title: 'Dashboard', path: PATH_DASHBOARD.one, icon: ICONS.dashboard },
      { title: 'Download', path: PATH_DASHBOARD.download, icon: ICONS.analytics },
      // {
      //   title: 'knowledge',
      //   path: '/',
      //   icon: ICONS.user,
      //   children: [
      //     { title: 'List', path: '/' },
      //   ],
      // },
    ],
  },

  // MANAGEMENT
  // ----------------------------------------------------------------------
  // {
  //   subheader: 'management',
  //   items: [
  //   ],
  // },
];

export default navConfig;
