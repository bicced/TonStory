import styled from "styled-components";
import { Card, Fullscreen, Label, Title } from "../utils/styled";
import { Button, message } from "antd";
import { useContext } from "react";
import { store } from "../utils/store";

//disabled color grey
const StyledButton = styled(Button)`
  width: 100%;
  background-color: orange;
  color: white;

  &:disabled {
    background-color: grey;
  }
`;

export default function Share() {
  const { state } = useContext(store);
  console.log(state);
  const items: any[] = [
    {
      title: "Refill Stamina",
      description: "Fully replenishes stamina",
      price: "100 points",
      active: true
    },
    {
      title: "Level Up",
      description: "Increase level by 1",
      price: "50 points",
      active: true
    },
    {
      title: "Sacred Sword",
      description: "Increase attack by 10%",
      price: "6969 points",
      active: false
    },
  ];
  
  return (
    <Fullscreen>
      <Title>Share</Title>
      <Card>
        <Label>Total Invited Users</Label>
        <Label>{state.referrals}</Label>
      </Card>
      <Card onClick={() => {navigator.clipboard.writeText(state.referralURL); message.success('copied to clipboard')}}>
        <div>
          <Label>Personal Ref Link</Label>
          <p>{state.referralURL}</p>
        </div>
      </Card>
      <p style={{margin: '10px'}}>Referrals gives your referred friend 300 starting points and earns you 10% of points earned by them</p>
    </Fullscreen>
  );
}
