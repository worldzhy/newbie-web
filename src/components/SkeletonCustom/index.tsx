import { type FC, type ReactElement } from "react";
import { Skeleton, Stack } from "@mui/material";
import styles from "./index.module.scss";

interface Props {
  numRows?: number;
}

const SkeletonCustom: FC<Props> = ({ numRows = 3 }): ReactElement => {
  return (
    <Stack direction="column" spacing={1} className={styles.skeleton}>
      {Array.from(new Array(numRows)).map((_, key: number) => (
        <Skeleton key={key} variant="rounded" animation="wave" height={60} />
      ))}
    </Stack>
  );
};

export default SkeletonCustom;
