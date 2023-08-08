import {ReactElement, useEffect, useState} from 'react';
import {Button} from '@mui/material';
import {useRouter} from 'next/router';
import {ComponentType} from '@/widgets/workflow/ComponentModal';
import {ViewComponent} from '@/shared/libs/workflow-view-components';
import ViewsService from '@/shared/libs/workflow-view';
import Title from '@/widgets/workflow/components/Title';
import LayoutDashboard from '@/widgets/layout/LayoutDashboard';
import Container from '@/widgets/workflow/components/Container';
import Paragraph from '@/widgets/workflow/components/Paragraph';

import styles from './index.module.scss';

const ComponentsMapper: any = {
  [ComponentType.INFO_Title]: Title,
  [ComponentType.INFO_Description]: Paragraph,
};

const Page = (): ReactElement => {
  const [components, setComponents] = useState([]);
  const [states, setStates] = useState([]);
  const router = useRouter();
  const {id} = router.query;
  const service = new ViewsService();

  const handleNext = async (id: number) => {
    const route: any = states.find(({id: routeId}) => routeId === id);
    if (route) {
      const {components, routes} = await service.getView(route?.nextViewId);
      setStates(routes || []);
      setComponents(components || []);
    }
  };
  const getWorkflowStartData = async () => {
    const workflow = await service.startView(id as string);
    const {components, routes} = workflow[0];
    setStates(routes || []);
    setComponents(components || []);
  };
  const handleComponentRender = ({
    type,
    properties: {value},
  }: ViewComponent) => {
    const Component = ComponentsMapper[type];
    return <Component value={value} />;
  };
  const handleStateRender = (route: any) => {
    const {
      id,
      state: {name},
    } = route;
    return (
      <Button key={id} onClick={() => handleNext(id)}>
        {name}
      </Button>
    );
  };

  useEffect(() => {
    id && getWorkflowStartData();
  }, [id]);


  return (
    <Container>
      {components.map(component => handleComponentRender(component))}
      <div className={styles.statesContainer}>
        {states.map(state => handleStateRender(state))}
      </div>
    </Container>
  );
};

export default Page;

/**
 * Layout wrapper
 */
Page.getLayout = (page: ReactElement) => {
  return <LayoutDashboard active="Workflow">{page}</LayoutDashboard>;
};
