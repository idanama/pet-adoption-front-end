import Head from 'next/head';
import { useState, useEffect } from 'react';
import Hero from '../components/Hero';

export default function Home() {
  const [heroPet, setHeroPet] = useState({ Name: 'SPCA', tagline: 'Society for Prevention of Cruelty to Animals in Israel', pictures: [''] });

  const fetchRandomPet = async () => {
    const petResponse = await (await fetch('/api/pet/random')).json();
    setHeroPet(petResponse);
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
        <Hero img={`${heroPet.pictures[0]}`} title={heroPet.name} text={heroPet.tagline} action={`Meet ${heroPet.name}`} to={`/pet/${heroPet.name}`} />
      </main>
    </div>
  );
}
