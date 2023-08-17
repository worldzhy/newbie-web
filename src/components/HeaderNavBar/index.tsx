import {Link, styled} from '@mui/material';

export const navigations = [
  {
    name: 'Projects',
    path: '/projects',
  },
  {
    name: 'Services',
    path: '/services',
  },
  {
    name: 'Wiki',
    path: '/wiki',
  },
  {
    name: 'Team',
    path: '/team',
  },
  {
    name: 'Workflow',
    path: '/workflow',
  },
];

const Navigation = styled('nav')(({theme}) => [
  {
    '& ul': {
      padding: 0,
      margin: 0,
      listStyle: 'none',
      display: 'flex',
    },
    '& li': {
      color: theme?.palette.text.primary,
      ...theme?.typography.body2,
      fontWeight: theme?.typography.fontWeightBold,
      '& > a, & > button': {
        display: 'inline-block',
        color: 'inherit',
        font: 'inherit',
        textDecoration: 'none',
        padding: theme?.spacing('8px', 1),
        borderRadius: theme?.shape.borderRadius,
        '&:hover': {
          color: theme?.palette.grey[700],
          backgroundColor: theme.palette.grey[50],
          // Reset on touch devices, it doesn't add specificity
          '@media (hover: none)': {
            backgroundColor: 'initial',
          },
        },
        '&:focus-visible': {
          color: theme?.palette.grey[700],
          outline: 0,
          backgroundColor: theme?.palette.grey[100],
        },
      },
      '& > div': {
        cursor: 'default',
      },
    },
  },
]);

const HeaderNavBar = () => {
  return (
    <Navigation>
      <ul>
        {navigations.map(({name, path}) => (
          <li key={name}>
            <Link href={path}>{name}</Link>
          </li>
        ))}
      </ul>
    </Navigation>
  );
};

export default HeaderNavBar;
