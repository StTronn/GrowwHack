import React, { useEffect, useState } from 'react'
import styled from "styled-components";

import authRequest from '../utils/authRequest';
import DarkTemp from "../darkTemp.png"
import CleanupImage from "../clean-up-temp.png"
import Card from '../components/Card'

const Cointainer = styled.div`
  min-height:100vh;
  padding: 80px 0; 
  box-sizing:border-box;
  margin: 0px 120px 0px 120px;
  font-family: "Nunito Sans", sans-serif;
  color: white;
`

const Title = styled.div`
  font-size:48px;
  color: #1db954;
  font-weight: 800;
  text-align: center;
  
`
const Section = styled.div`
  min-height:60vh;
  padding: 40px 0;
  
`
const SectionTitle = styled.div`
  font-size: 32px;
  font-weight: 800;
  padding: 40px 0;
`

const SectionDesc = styled.div`
  display: grid;
  column-gap: 40px;
  grid-template-columns: 1fr 1fr;
  @media (max-width: 640px) {
    grid-template-columns: 1fr;
    row-gap: 40px;
  }

  `
const Banner = styled.div`
  height: 30vh;
  font-size: 46px;
  padding-left: 80px;
  padding-top: 80px;
  font-weight: 800;
  letter-spacing: 0.04rem;
  line-height: 1;
  color: #1db954;

  @media (max-width:800px) {
    font-size: 32px;
    padding-left: 40px;
    font-weight: 800;
    letter-spacing: 0.04rem;
  }
`

const CardContainer = styled.div`
  display: grid;
  padding:0 80px;
  grid-template-columns: 1fr 1fr 1fr;
  row-gap: 80px;
  justify-items: center;
  @media (max-width:800px) {
    grid-template-columns: 1fr;
  }
`

const WebTeam = () => {

  useEffect(() => {
    const getData = async () => {
      const data = await authRequest("/team/get?team=other");
      if (data) setUsers(data);
    }
    getData();
  }, [])

  const [ users, setUsers ] = useState([]);

  return (
    <div>
      <div>
        <Banner >
          Dev Team
      </Banner>
        <CardContainer>
          {users && users.map(user =>

            <Card img={user.avatar || 'https://source.unsplash.com/QckxruozjRg'}
              name={user.fullname}
              pos={user?.role || "Dev"}
              username={user.username}
              info={user.info} />

          )}
        </CardContainer>
      </div>
      <Cointainer>
        <Title>Highlights</Title>
        <Section>
          <SectionTitle>
            Dark Mode
        </SectionTitle>
          <SectionDesc>
            <div style={{ maxWidth: "480px", fontSize: "20px", color: "white" }}>
              The Dark Mode is one of the coolest features to have.
              We Have Finally rolled out our own dark mode ❤️
          </div>
            <div>
              <img src={DarkTemp} alt="Dark Mode" />
            </div>
          </SectionDesc>
        </Section>
        <Section>
          <SectionTitle>
            Clean Up and Guidlines
        </SectionTitle>
          <SectionDesc>
            <div>
              <img src={CleanupImage} width="100%" alt="Dark Mode" />
            </div>
            <div style={{ maxWidth: "480px", fontSize: "20px", color: "white" }}>
              With web we have been pushing a lot of changes fast.
              That has lead to some tech debt and various in consitency.
              We decided to enforce some styling guidlines through eslint as well as we
              moved on to a typed system through Typescript.
          </div>
          </SectionDesc>
        </Section>
      </Cointainer>
    </div>
  )
}




export default WebTeam;
