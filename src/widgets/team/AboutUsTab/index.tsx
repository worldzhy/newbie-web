import React, { type ReactElement } from "react";
import TableContainerCustom from "@/components/TableContainerCustom";
import TableRowCustom from "@/components/TableRowCustom";
import TableCellCustom from "@/components/TableCellCustom";
import LinkCustom from "@/components/LinkCustom";
import SkeletonCustom from "@/components/SkeletonCustom";

const createData = (
  name: string,
  link: string
): { name: string; link: string } => {
  return { name, link };
};

const data = [
  createData("Company Official Site", "https://inceptionpad.com"),
  createData("Company Wiki", "https://wiki.inceptionpad.com"),
  createData("Company Profile", "https://i.feishu.cn/wiki/"),
  createData("Onboarding Guide", "https://i.feishu.cn/wiki/"),
];

const AboutUsTab = (): ReactElement => {
  /**
   * Declarations
   */
  const headers = ["Name", "Link"];

  const table = (
    <TableContainerCustom headers={headers}>
      {data
        .sort((a, b) => a.name.localeCompare(b.name))
        .map(({ name, link }, key) => (
          <TableRowCustom key={key}>
            <TableCellCustom>{name}</TableCellCustom>
            <TableCellCustom>
              <LinkCustom href={link} openNewTab={true}>
                {link}
              </LinkCustom>
            </TableCellCustom>
          </TableRowCustom>
        ))}
    </TableContainerCustom>
  );

  return data.length === 0 ? <SkeletonCustom /> : table;
};

export default AboutUsTab;
