import { useEffect, useState } from "react";
import { Fullscreen } from "../utils/styled";
import { getScoreboard } from "../api";
import { Table } from "antd";
import styled from "styled-components";

//columns background color black
//rows background color grey
//hover color white
const StyledTable = styled(Table)`
  border: 0;
  .ant-table-thead > tr > th {
    background-color: black;
    color: white;
    border-top: solid 1px white;
  }
  .ant-table-tbody > tr > td {
    background-color: grey;
    color: white;
    border-top: solid 1px white;
  }
`;

export default function Scoreboard() {
  const [scoreboard, setScoreboard] = useState<any[]>([]);

  useEffect(() => {
    loadScoreboard();
  }, [])

  async function loadScoreboard() {
    const score = await getScoreboard();
    setScoreboard(score);
    console.log("Scoreboard loaded", score);
  }
  
  return (
    <Fullscreen>
      <StyledTable 
        dataSource={scoreboard}
        columns={[
          { title: 'User', dataIndex: 'username', key: 'username' },
          { title: 'Points', dataIndex: 'points', key: 'points' },
          { title: 'Level', dataIndex: 'level', key: 'level' },
        ]}
      />
    </Fullscreen>
  );
}
