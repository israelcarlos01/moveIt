import { createContext, useState, ReactNode, useEffect } from 'react';
import challenges from '../../challenges.json';

interface Challenge {
    type: 'body' | 'eye';
    description: string;
    amount: number;
}

interface ChallengesContextData {
    level: number;
    currentExperience: number;
    experienceToNextLevel: number; 
    challengesCompleted: number;
    activeChallenge: Challenge;
    levelUp: () => void;
    startNewChallenge: () => void;
    resetChallenge: () => void;
    completeChallenge: () => void;
}

interface ChallengesProviderProps {
    children: ReactNode;
}

export const ChallengesContext = createContext({} as ChallengesContextData);

export  function ChallengesProvider({ children }: ChallengesProviderProps) {
    const [level, setLevel] = useState(1);
    const [currentExperience, setCurrentExperience] = useState(0);
    const [challengesCompleted, setChallengesCompleted] = useState(0);

    const [activeChallenge, setActiveChallenge] = useState(null);

    const experienceToNextLevel = Math.pow((level + 1) * 4, 2);

    /* 
        Quando chamamos essa function com o array do segundo parâmetro vazio, a function
        é executada uma única vez assim que o componente for exibido em tela.
    */
    useEffect(() => {
        //API do própio browser para pedir permissão para mostrar notificações...
        Notification.requestPermission();
    }, [])


    function levelUp() {
        setLevel(level + 1);
    }

    function startNewChallenge() {
        const randomChallengeIndex = Math.floor(Math.random() * challenges.length);
        const challenge = challenges[randomChallengeIndex];

        setActiveChallenge(challenge);

        //API do próprio browser para tocar um áudio.
        new Audio('/notification.mp3').play();

        if (Notification.permission === 'granted') {
            new Notification('Novo desafio', {
                body: `Valendo ${challenge.amount}xp!`
            })
        }
    }

    function resetChallenge() {
        setActiveChallenge(null);
    }

    function completeChallenge() {
        if(!activeChallenge) {
            return;
        }

        //Amount é a variável que trás quanto de exp trás o desafio.
        const { amount } = activeChallenge;

        /* 
            Pega a exp do User a adiciona a exp do defafio.
            let = let it change (deixe mudar), o valor varia.
        */     
        let finalExperience = currentExperience + amount;

        if (finalExperience >= experienceToNextLevel ) {
            finalExperience = finalExperience - experienceToNextLevel;
            levelUp();
        }

        setCurrentExperience(finalExperience);
        setActiveChallenge(null);
        setChallengesCompleted(challengesCompleted + 1);
    }
    
    return (
        <ChallengesContext.Provider 
            value={{ 
                level, 
                currentExperience,
                experienceToNextLevel, 
                challengesCompleted, 
                levelUp,
                startNewChallenge,
                activeChallenge,
                resetChallenge,
                completeChallenge, 
            }}
        >
            {children}
        </ChallengesContext.Provider>
    );
}