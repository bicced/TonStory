import loadGameScene from "../components/GameScene.tsx";
import { useContext, useEffect } from "react";
import { loadEnvironmentAssets, loadGameSounds, loadPlayerSprites } from "../utils/assetloader.tsx";
import { store } from "../utils/store.tsx";
import styled from "styled-components";
import { Progress, Statistic } from "antd";
import k from '../utils/kaboom.tsx';
import { Label } from "../utils/styled.tsx";
import { FireOutlined } from "@ant-design/icons";

const Stats = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  width: 100vw;
  text-align: center;
`;

const Container = styled.div`
  position: fixed;
  padding: 20px;
`;

export default function Game() {
  const {state, dispatch} = useContext(store);

  useEffect(() => {
    loadPlayerSprites(k);
    loadEnvironmentAssets(k);
    loadGameSounds(k);
    loadGameScene(k, dispatch);
  }, []);
  
  return (
    <Container>
      <Stats>
        <Statistic valueStyle={{ color: 'white', fontSize: 16 }} title="Points" value={state.points} />
        <Statistic valueStyle={{ color: 'white', fontSize: 16 }} title="Level" value={state.level} />
        <Statistic valueStyle={{ color: 'white', fontSize: 16 }} title="Username" value={state.username} />
      </Stats>
      <Stats style={{bottom: 0}}>
        <FireOutlined />
        <Progress style={{padding: 10, marginRight: 25, color: 'blue'}} size="small" percent={(state.stamina / (state.level * 1000)) * 100} format={(percent) => <p style={{color: 'white'}}>{Math.round((percent / 100) * (state.level * 1000))}</p>} />
      </Stats>
    </Container>
  )
}