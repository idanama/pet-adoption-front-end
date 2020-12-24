import Head from 'next/head';
import { useState, useEffect } from 'react';
import Hero from '../components/Hero';
import api from '../utils/api';

export default function Home() {
  const [heroPet, setHeroPet] = useState(
    {
      img: '',
      title: 'SPCA',
      text: 'Society for Prevention of Cruelty to Animals in Israel',
      action: ``,
      to: `/`,
    }
  );

  const fetchRandomPet = async () => {
    const pet = await api.getRandomPet();
    if (pet.ok) {
      setHeroPet({
        img: pet.pictures[0],
        title: pet.name,
        text: pet.tagline,
        action:`Meet ${pet.name}`,
        to: `/pet/${pet.name}`,
      });
    }
  };

  useEffect(() => {
    fetchRandomPet();
  }, []);

  return (
    <div>
      <Head>
        <title>SPCA - Home Page</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <Hero img={heroPet.img} title={heroPet.title} text={heroPet.text} action={heroPet.action} to={heroPet.to} />
      </main>
    </div>
  );
}
