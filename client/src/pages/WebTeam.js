import React, { useEffect, useState } from 'react'
import styled from "styled-components";

import authRequest from '../utils/authRequest';

import Card from '../components/Card'

const WebTeam = (params) => {

  useEffect(() => {
    const getData = async () => {
      const data = await authRequest("/team/get?team=web");
      console.log(data);
      if (data) setUsers(data);
    }
    getData();
  }, [])

  const [users, setUsers] = useState([]);

  return (
    <div>
      <Banner >
        Web Team
      </Banner>
      <CardContainer>
        {users && users.map(user =>

          <Card img={user.avatar || 'https://source.unsplash.com/QckxruozjRg'} name={user.fullname} pos={user?.role || "Dev"} username={user.username} />

        )}
      </CardContainer>
    </div>
  )
}


const Banner = styled.div`
  height: 30vh;
  font-size: 46px;
  padding-left: 90px;
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
  grid-template-columns: 1fr 1fr 1fr;
  row-gap: 80px;
  justify-items: center;
  @media (max-width:800px) {
    grid-template-columns: 1fr;
  }
`

export default WebTeam;
