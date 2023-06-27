import { type ReactElement } from 'react';
import { useRouter } from "next/router";
import TableCustom from '@/components/TableCustom/TableCustom';
import ButtonCustom from '@/components/ButtonCustom/ButtonCustom';

const headers = ['Workflow', 'Actions'];

const rows = [
  {Workflow: 'Workflow 1', Actions: []},
  {Workflow: 'Workflow 2', Actions: []},
];

const Table = (): ReactElement => {
  const router = useRouter();

  const actionsRender = (
    <>
      <ButtonCustom
        customColor="link"
        size="small"
        onClick={() => router.push({
          pathname: "/workflow/manage",
          query: { id: '1' },
        })}
      >
        Manage
      </ButtonCustom>
      <ButtonCustom
        customColor="link"
        size="small"
        onClick={() => router.push({
          pathname: "/workflow/run",
          query: { id: '1' },
        })}
      >
        Run
      </ButtonCustom>
    </>
  );
  
  return (
    <TableCustom
      rows={rows}
      headers={headers}
      isLastColActions={true}
      children={actionsRender} />
  );
};

export default Table;
