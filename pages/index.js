import Head from 'next/head';
import { useState } from 'react';
import Hero from '../components/Hero';
import Register from '../components/Register';
import Button from '../components/base/Button';

export default function Home() {
  return (
    <div>
      <Head>
        <title>SPCA - Home Page</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <Hero img="/images/110-116.jpg" title="Mitz" text="Loves to cuddle" action="Meet Mitz" to="\cat\mitz" />
      </main>
    </div>
  );
}
