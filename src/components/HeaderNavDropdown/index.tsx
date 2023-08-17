import {useRef, useState} from 'react';
import {
  Box,
  Link,
  Collapse,
  IconButton,
  ClickAwayListener,
} from '@mui/material';
import {navigations} from '../HeaderNavBar';
import {styled} from '@mui/material/styles';
import SvgHamburgerMenu from '@/icons/SvgHamburgerMenu';

const Anchor = styled('a')<{
  component?: React.ElementType;
  noLinkStyle?: boolean;
}>(({theme}) => [
  {
    ...theme.typography.body2,
    fontWeight: theme.typography.fontWeightBold,
    textDecoration: 'none',
    border: 'none',
    width: '100%',
    backgroundColor: 'transparent',
    color: theme?.palette.text.secondary,
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(1),
    borderRadius: theme.spacing(1),
    transition: theme.transitions.create('background'),
    '&:hover, &:focus-visible': {
      backgroundColor: theme?.palette.grey[100],
      // Reset on touch devices, it doesn't add specificity
      '@media (hover: none)': {
        backgroundColor: 'transparent',
      },
    },
  },
]);

const UList = styled('ul')({
  listStyleType: 'none',
  padding: 0,
  margin: 0,
});

const HeaderNavDropdown = () => {
  const [open, setOpen] = useState(false);
  const hambugerRef = useRef<HTMLButtonElement | null>(null);

  return (
    <>
      <IconButton
        color="primary"
        aria-label="Menu"
        ref={hambugerRef}
        disableRipple
        onClick={() => setOpen(value => !value)}
        sx={{
          position: 'relative',
          '& rect': {
            transformOrigin: 'center',
            transition: '0.2s',
          },
          ...(open && {
            '& rect:first-of-type': {
              transform: 'translate(1.5px, 1.6px) rotateZ(-45deg)',
            },
            '& rect:last-of-type': {
              transform: 'translate(1.5px, -1.2px) rotateZ(45deg)',
            },
          }),
        }}
      >
        <SvgHamburgerMenu />
      </IconButton>
      <ClickAwayListener
        onClickAway={event => {
          if (
            hambugerRef.current &&
            !hambugerRef.current.contains(event.target as Node)
          ) {
            setOpen(false);
          }
        }}
      >
        <Collapse
          in={open}
          sx={{
            position: 'fixed',
            top: 56,
            left: 0,
            right: 0,
            boxShadow: `0px 4px 20px rgba(170, 180, 190, 0.3)`,
          }}
        >
          <Box
            sx={{
              p: 2,
              bgcolor: 'background.paper',
              maxHeight: 'calc(100vh - 56px)',
              overflow: 'auto',
            }}
          >
            <UList
              sx={{
                '& ul': {
                  borderLeft: '1px solid',
                  borderColor: 'grey.100',
                  pl: 1,
                  pb: 1,
                  ml: 1,
                },
              }}
            >
              {navigations.map(({name, path}) => (
                <li key={name}>
                  <Anchor href={path} as={Link} noLinkStyle>
                    {name}
                  </Anchor>
                </li>
              ))}
            </UList>
          </Box>
        </Collapse>
      </ClickAwayListener>
    </>
  );
};

export default HeaderNavDropdown;
