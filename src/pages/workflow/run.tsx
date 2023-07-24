import {ReactElement} from 'react';
import {Card, CardActions, CardContent, Typography} from '@mui/material';
import ButtonCustom from '@/components/ButtonCustom';
import LayoutDashboard from '@/widgets/layout/LayoutDashboard';

const mockStep = {
  startSign: true,
  view: 'View 1',
  desc: 'this is desc',
  state: ['State 1', 'State 2', 'State 3'],
};

const Page = (): ReactElement => {
  const {startSign, view, desc, state} = mockStep;

  const handleNext = () => {
    // TODO: handle next
  };

  return (
    <Card sx={{maxWidth: 345}}>
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {`${startSign ? '(Start Point)' : ''} ${view}`}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {desc}
        </Typography>
      </CardContent>
      <CardActions>
        {state.map((item, index) => (
          <ButtonCustom
            key={index}
            customColor="link"
            size="small"
            onClick={handleNext}
          >
            {item}
          </ButtonCustom>
        ))}
      </CardActions>
    </Card>
  );
};

export default Page;

/**
 * Layout wrapper
 */
Page.getLayout = (page: ReactElement) => {
  return <LayoutDashboard active="Workflow">{page}</LayoutDashboard>;
};
