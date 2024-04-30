import { PlayCircleOutlined, ShareAltOutlined, ShopOutlined, TrophyOutlined } from "@ant-design/icons";
import styled from "styled-components";
import { Navigate, useNavigate } from 'react-router-dom';

const Bar = styled.div`
  display: flex;
  justify-content: space-around;
  width: 100vw;
  position: fixed;
  bottom: 0;
  z-index: 10;
  background-color: black;
  border-top: 1px solid white;
  padding: 20px 0;
`;

export default function Navbar() {
  const navigate = useNavigate();

  return (
    <Bar>
      <PlayCircleOutlined style={{fontSize: 20}} onClick={() => navigate('/')} />
      <TrophyOutlined style={{fontSize: 20}} onClick={() => navigate('/scoreboard')} />
      <ShopOutlined style={{fontSize: 20}} onClick={() => navigate('/shop')} />
      <ShareAltOutlined style={{fontSize: 20}} onClick={() => navigate('/share')} />
    </Bar>
  );
}
