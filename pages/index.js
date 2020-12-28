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
      const { pictures, name, tagline } = pet.res;
      setHeroPet({
        img: pictures[0],
        title: name,
        text: tagline,
        action:`Meet ${name}`,
        to: `/pet/${name}`,
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
