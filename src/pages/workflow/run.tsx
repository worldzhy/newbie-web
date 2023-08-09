import {ReactElement, useEffect, useState} from 'react';
import {Button} from '@mui/material';
import {useRouter} from 'next/router';
import {ComponentType} from '@/widgets/workflow/ComponentModal';
import Title from '@/widgets/workflow/components/Title';
import LayoutDashboard from '@/widgets/layout/LayoutDashboard';
import Container from '@/widgets/workflow/components/Container';
import Paragraph from '@/widgets/workflow/components/Paragraph';
import WorkflowViewApiRequest from '@/http/api/workflow-view';
import {WorkflowRoute, WorkflowViewComponent} from '@prisma/client';

import styles from './index.module.scss';

const ComponentsMapper: any = {
  [ComponentType.INFO_Title]: Title,
  [ComponentType.INFO_Description]: Paragraph,
};

const Page = (): ReactElement => {
  const [components, setComponents] = useState<WorkflowViewComponent[]>([]);
  const [states, setStates] = useState<WorkflowRoute[]>([]);
  const router = useRouter();
  const {id} = router.query;
  const viewService = new WorkflowViewApiRequest();

  const getWorkflowStartData = async () => {
    const workflow = await viewService.getStartViews(id as string);
    const {components, outboundRoutes} = workflow[0];
    setComponents(components);
    setStates(outboundRoutes);
  };

  const handleNext = async (id: number) => {
    const route: any = states.find(({id: routeId}) => routeId === id);
    if (route) {
      const {components, outboundRoutes} = await viewService.get(
        route?.nextViewId
      );
      setComponents(components);
      setStates(outboundRoutes);
    }
  };

  const handleComponentRender = ({type}: WorkflowViewComponent) => {
    const Component = ComponentsMapper[type];
    return <Component value="value?" />;
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
