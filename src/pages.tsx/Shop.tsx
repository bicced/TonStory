import styled from "styled-components";
import { Card, Fullscreen, Label, Title } from "../utils/styled";
import { Button } from "antd";
import { useContext } from "react";
import { store } from "../utils/store";

//disabled color grey
const StyledButton = styled(Button)`
  min-width: 100px;
  background-color: orange;
  color: white;

  &:disabled {
    background-color: grey;
  }
`;

export default function Shop() {
  const { state } = useContext(store);
  const items: any[] = [
    {
      title: "Refill Stamina",
      description: "Fully replenishes stamina",
      price: "100",
      active: true
    },
    {
      title: "Level Up",
      description: "Increase level by 1",
      price: "50",
      active: true
    },
    {
      title: "Sacred Sword",
      description: "Increase attack by 10%",
      price: "6969",
      active: false
    },
  ];
  
  return (
    <Fullscreen>
      <div style={{display: 'flex', justifyContent: 'space-between'}}>
        <Title>Shop</Title>
        <Label style={{margin: 15}}>Stamina: {state.stamina}</Label>
        <Label style={{margin: 15}}>Points: {state.points}</Label>
      </div>
      {items.map((item) => (
        <Card>
          <div>
            <Label>{item.title}</Label>
            <p>{item.description}</p>
          </div>
          <StyledButton disabled={!item.active}>{item.active ? item.price : 'Soon'}</StyledButton>
        </Card>
      ))}
    </Fullscreen>
  );
}
