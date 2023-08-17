import {useState} from 'react';
import {IconButton, InputBase, Paper} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';

const AppSearch = () => {
  const [value, setValue] = useState('');

  const handleSearch = () => {
    // TODO: handle search
  };

  return (
    <Paper
      component="form"
      sx={{p: '2px 4px', display: 'flex', alignItems: 'center', width: '32vw'}}
    >
      <IconButton sx={{p: '10px'}} aria-label="menu">
        <MenuIcon />
      </IconButton>
      <InputBase
        value={value}
        sx={{ml: 1, flex: 1}}
        placeholder="Search..."
        inputProps={{'aria-label': 'search...'}}
        onChange={e => setValue(e.target.value)}
      />
      <IconButton type="button" sx={{p: '10px'}} aria-label="search">
        <SearchIcon onClick={handleSearch} />
      </IconButton>
    </Paper>
  );
};

export default AppSearch;
