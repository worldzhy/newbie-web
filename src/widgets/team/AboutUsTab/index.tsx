import {EMPTY_PLACEHOLDER} from '@/constants';
import {Link, TableCell, TableRow} from '@mui/material';
import SkeletonCustom from '@/components/SkeletonCustom';
import TableContainerCustom from '@/components/TableContainerCustom';

const createData = (
  name: string,
  link: string
): {name: string; link: string} => {
  return {name, link};
};

const data = [
  createData('Company Official Site', 'https://inceptionpad.com'),
  createData('Company Wiki', 'https://wiki.inceptionpad.com'),
  createData('Company Profile', 'https://i.feishu.cn/wiki/'),
  createData('Onboarding Guide', 'https://i.feishu.cn/wiki/'),
];

const AboutUsTab = () => {
  const headers = ['Name', 'Link'];

  const table = (
    <TableContainerCustom headers={headers}>
      {data
        .sort((a, b) => a.name.localeCompare(b.name))
        .map(({name, link}, key) => (
          <TableRow key={key}>
            <TableCell align="center">{name || EMPTY_PLACEHOLDER}</TableCell>
            <TableCell align="center">
              <Link href={link} target="_blank">
                {link}
              </Link>
            </TableCell>
          </TableRow>
        ))}
    </TableContainerCustom>
  );

  return data.length === 0 ? <SkeletonCustom /> : table;
};

export default AboutUsTab;
