import React, { useEffect, useState } from "react";
import styled from "styled-components";

import authRequest from "../utils/authRequest";

import Loading from "../pages/Loading";
import NotFound from "../pages/NotFound";

import HomeBanner from "../components/HomeBanner";
import Room  from "../components/RoomCard";

const Home = () => {
  const [myRooms, setMyRooms] = useState([]);
  const [allRooms, setAllRooms] = useState([]);
  const [loading, setLoading] = useState(false);
  const [notFound, setNotFound] = useState(false);
  const [modalIsOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const fetchRooms = await authRequest(`/room/userRooms`);
        setMyRooms(fetchRooms);

        const fetchAllRooms = await authRequest(`/room/allRooms`);
        setAllRooms(fetchAllRooms);

        setLoading(false);
      } catch (err) {
        console.log(err);
        if (err.response) console.log(err.response);
        setNotFound(true);
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (notFound) return <NotFound />;
  if (loading) return <Loading />;

  return (
    <div className="pb-16">
      <HomeBanner modalIsOpen={modalIsOpen} setIsOpen={setIsOpen} />

      <p className="text-white pt-8 pb-4 text-base font-semibold px-8">
        Your Project
      </p>
      <ProjectCardGrid className="px-8 py-2">
        {!modalIsOpen && myRooms.map(obj => <ProjectCard obj={obj} />)}
      </ProjectCardGrid>
      <p className="text-white pt-8 pb-4 text-base font-semibold px-8">
        All Projects
      </p>
      <ProjectCardGrid className="px-8 py-2">
        {!modalIsOpen && allRooms.map(obj => <ProjectCard obj={obj} />)}
      </ProjectCardGrid>
    </div>
  );
};


const ProjectCard = ({ obj }) => {
  return (
    <div style={{ width: "fit-content" }} className=" bg-nt-gray rounded-lg" >
      <Room roomObj={obj} />
      <div className="py-4 text-white font-bold px-4">
        <h1 className="text-md  ">{obj.title}</h1>
        <h1 className="font-normal">{obj.teamName}</h1>
      </div>
    </div>
  )
}

const ProjectCardGrid = styled.div`
  display:grid;
  grid-template-columns: repeat( 4, minmax(250px, 1fr) );
  grid-gap:10px;
  align-content:center;
  justify-content:center;

`
export default Home;
