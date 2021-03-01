import Head from 'next/head';
import { GetServerSideProps } from 'next';

import { CompletedChallenges } from '../components/CompletedChallenges';
import { Countdown } from '../components/Countdown';
import { ExperienceBar } from '../components/ExperienceBar';
import { Profile } from '../components/Profile';
import { ChallengeBox } from '../components/ChallengeBox';

import  styles  from '../styles/pages/Home.module.css';
import { CountdownProvider } from '../contexts/CountdownContext';
import { ChallengesProvider } from '../contexts/ChallengesContext';

interface HomeProps {
  level: number;
  currentExperience: number;
  challengesCompleted: number;
}

export default function Home(props: HomeProps) {
  return (
    <ChallengesProvider 
      level={props.level}  
      currentExperience={props.currentExperience}
      challengesCompleted={props.challengesCompleted}
      >  
      <div className={styles.container}>
        <Head>
          <title>Início | move.it</title>
        </Head>


        <ExperienceBar />

        <CountdownProvider>
          <section>
            <div>
              <Profile />
              <CompletedChallenges />
              <Countdown />
            </div>
            <div>
              <ChallengeBox />
            </div>
          </section>
        </CountdownProvider>
      </div>
    </ChallengesProvider>
  )
}

/* 
  Quando eu declaro essa function dentro de uma página do next, eu consigo manipular
  quais dados são repassados da camada do next.js para camada Front-end.

  Tudo que eu faço dentro dessa function executa dentro do servidor node e não do Browser. 
  
  O parâmetro ctx é o contexto da aplicação.

  Ex:
  Back-end (Ruby)
  Next.js (Node.js)
  Front-end (React)
*/  
export const getServerSideProps: GetServerSideProps = async (ctx) => {
  
  const { level, currentExperience, challengesCompleted } = ctx.req.cookies;
  
  return {
    props: {
      level: Number(level),
      currentExperience: Number(currentExperience),
      challengesCompleted: Number(challengesCompleted)
    }
  }

}
