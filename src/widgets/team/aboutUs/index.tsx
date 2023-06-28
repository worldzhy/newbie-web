import React, { type ReactElement } from 'react';
import TableAboutUs from './table';

const createData = (
  name: string,
  link: string
): { name: string; link: string } => {
  return { name, link };
};

const data = [
  createData('Company Official Site', 'https://inceptionpad.com'),
  createData('Company Wiki', 'https://wiki.inceptionpad.com'),
  createData('Company Profile', 'https://i.feishu.cn/wiki/'),
  createData('Onboarding Guide', 'https://i.feishu.cn/wiki/'),
];

const TeamAboutUs = (): ReactElement => {
  return <TableAboutUs data={data}></TableAboutUs>;
};

export default TeamAboutUs;
