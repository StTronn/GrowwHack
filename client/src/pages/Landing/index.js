import React from "react";
import styled from "styled-components";
import BackImg from "./back2.jpg";

const BgImg = styled.div`
  background-image:url(${(props) => props.img});

`;

const Cointainer = styled.div`
  display:grid;
  grid-template-columns: 6fr 8fr;
  height:100vh;
 @media (max-width: 768px) {
   grid-template-columns: 1fr;
  }
`

const TextArea = styled.div`
  background: rgba( 30, 215, 96, 0.30 );
  /* background: rgba( 255,255,255, 0.60 ); */
  box-shadow: 0 8px 32px 0 rgba( 31, 38, 135, 0.37 );
  backdrop-filter: blur( 11.5px );
  -webkit-backdrop-filter: blur( 11.5px );
`

const Landing = (params) => {
  return (
    <>
      <Banner />
      <Discover />
      <Area120 />
      <CoffeeBreaks/>
    </>
  )
};

const Discover = () => {
  return (
    <section className="text-white">
      <div className="max-w-5xl px-6 py-16 mx-auto">
        <div className="items-center md:flex md:space-x-12 font-bold">
          <div className="md:w-1/2">
            <h3 className="text-5xl font-bold text-sp-green">Discover <br/> </h3>
            <p className="max-w-sm mt-4 text-white text-base text-bold">Find other groots. Learn about their hobies and connect :) </p>
          </div>
          <div className="mt-8 md:mt-0 md:w-1/2">
            <div className="flex items-center justify-center">
              <div className="max-w-md">
                <img className="object-cover object-center w-full rounded-md shadow" alt="img" style={{ height: '500px' }} src="http://source.unsplash.com/tI0wqiJ1N10" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

const Area120 = () => {
  return (
    <section className="text-white">
      <div className="max-w-5xl px-6 py-16 mx-auto">
        <div className="items-center md:flex md:space-x-12 font-bold">
          <div className="md:w-1/2">
            <div className="flex items-center justify-center">
              <div className="max-w-md">
                <img className="object-cover object-center w-full rounded-md shadow" alt="img" style={{ height: '500px' }} src="http://source.unsplash.com/rxpThOwuVgE" />
              </div>
            </div>
          </div>
          <div className="mt-8 md:mt-0 md:w-1/2">
            <h3 className="text-5xl font-bold text-sp-green">Area 120 <br/> </h3>
            <p className="max-w-sm mt-4 text-white text-bold">A place to build your ideas.
             Find others to collaborate as well as showcase what you are building
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

const CoffeeBreaks = () => {
  return (
    <section className="text-white">
      <div className="max-w-5xl px-6 py-16 mx-auto">
        <div className="items-center md:flex md:space-x-12 font-bold">
          <div className="md:w-1/2">
            <h3 className="text-5xl font-bold text-sp-green">Breaks <br/> </h3>
            <p className="max-w-sm mt-4 text-white text-bold">Leave some moments open to chances or just find someone open moment and shedule those amzing talks.</p>
          </div>
          <div className="mt-8 md:mt-0 md:w-1/2">
            <div className="flex items-center justify-center">
              <div className="max-w-md">
                <img className="object-cover object-center w-full rounded-md shadow" alt="img" style={{ height: '500px' }} src="http://source.unsplash.com/YduJNHSnJUU" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

const Banner = () => {
  return (
    <Cointainer>
      <BgImg img={BackImg} className="absolute top-0 w-full h-full bg-center bg-cover">
        <span id="blackOverlay" className="w-full h-full absolute opacity-60 bg-black"></span>
      </BgImg>
      <TextArea className="px-8 py-32">
        <h1 className="text-4xl tracking-tight font-extrabold text-gray-300 sm:text-5xl md:text-6xl">
          <span className="mt-2 block text-sp-green-accent xl:inline">Groom</span>
          <br />

        </h1>
        <div className="mt-20 text-white text-xl font-bold">

          <span class="block text-3xl xl:inline">The virtual space for Groots</span>
          <br />
          <span className="text-3xl text-sp-green-accent"> Share, Collaborate and Inspire </span>
        </div>
        <div className="mt-3 text-white font-bold">
          <p className="mb-2">It's been hard to bump into each other and start those amazing conversation. Groom bring others and start the spark  </p>
          {/* <p className="mt-2">Groom bring others and start the spark </p> */}
        </div>
      </TextArea>
    </Cointainer >
  );
}

export default Landing;
