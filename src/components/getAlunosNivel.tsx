"use client"
import {useState, useEffect } from "react"
import axios from 'axios';


interface Aluno {
    nome: string;
    idade: string;
    objetivos: string;
    menos_consciencia_corporal: boolean;
    menos_adaptado: boolean;
    mais_dor: boolean;
    menos_gesto_tecnico: boolean;
    menos_forca: boolean;
    menos_mobilidade: boolean;
    menos_resistencia: boolean;
    menos_equilibrio: boolean;
    mais_ou_menos_consciencia_corporal: boolean;
    mais_ou_menos_adaptado: boolean;
    mais_ou_menos_dor: boolean;
    mais_ou_menos_gesto_tecnico: boolean;
    mais_ou_menos_forca: boolean;
    mais_ou_menos_mobilidade: boolean;
    mais_ou_menos_resistencia: boolean;
    mais_ou_menos_equilibrio: boolean;
    mais_consciencia_corporal: boolean;
    mais_adaptado: boolean;
    menos_dor: boolean;
    mais_gesto_tecnico: boolean;
    mais_forca: boolean;
    mais_mobilidade: boolean;
    mais_resistencia: boolean;
    mais_equilibrio: boolean;
    observacoes: string;
  }

  const initialAlunoState: Aluno = {
    nome: "",
    idade: "",
    objetivos: "",
    menos_consciencia_corporal: false,
    menos_adaptado: false,
    mais_dor: false,
    menos_gesto_tecnico: false,
    menos_forca: false,
    menos_mobilidade: false,
    menos_resistencia: false,
    menos_equilibrio: false,
    mais_ou_menos_consciencia_corporal: false,
    mais_ou_menos_adaptado: false,
    mais_ou_menos_dor: false,
    mais_ou_menos_gesto_tecnico: false,
    mais_ou_menos_forca: false,
    mais_ou_menos_mobilidade: false,
    mais_ou_menos_resistencia: false,
    mais_ou_menos_equilibrio: false,
    mais_consciencia_corporal: false,
    mais_adaptado: false,
    menos_dor: false,
    mais_gesto_tecnico: false,
    mais_forca: false,
    mais_mobilidade: false,
    mais_resistencia: false,
    mais_equilibrio: false,
    observacoes: "",

};

export default function GetAlunosNivel() {
    const [alunos, setAlunos] = useState<Aluno[]>([]);


    useEffect(() => {
        async function fetchAlunos() {
            try {
                const response = await axios.get('http://localhost:3000/api/v1/alunos');
                const alunosData: Aluno[] = response.data; // Supondo que os dados dos alunos estão na resposta
                
                // Atualiza o estado com a lista de alunos
                setAlunos(alunosData);
            } catch (error) {
                console.error('Erro ao buscar alunos:', error);
            }
        }

        fetchAlunos();
    }, []);

    function determinarNivel(aluno: Aluno) {
        const keys = Object.keys(aluno);

        const menosKeys = keys.filter(key => key.startsWith('menos_') && aluno[key as keyof Aluno]);
        const maisOuMenosKeys = keys.filter(key => key.startsWith('mais_ou_menos_') && aluno[key as keyof Aluno]);
        const maisKeys = keys.filter(key => key.startsWith('mais_') && !key.startsWith('mais_ou_menos_') && aluno[key as keyof Aluno]);
      
        const menos = menosKeys.length;
        const maisOuMenos = maisOuMenosKeys.length;
        const mais = maisKeys.length;
      
        if (menos >= 5) {
            return 'Iniciante';
        } else if (maisOuMenos >= 5) {
            return 'Intermediário';
        } else if (mais >= 5) {
            return 'Avançado';
        } else {
            return 'Nível indeterminado';
        }
    }

        // Agrupa os alunos por nível
        const alunosPorNivel: { [key: string]: Aluno[] } = {};

        alunos.forEach((aluno) => {
            const nivel = determinarNivel(aluno);
    
            if (!alunosPorNivel[nivel]) {
                alunosPorNivel[nivel] = [];
            }
    
            alunosPorNivel[nivel].push(aluno);
        });

      
    return (
          <div>
            {/* Renderização dos alunos por nível */}
            {Object.keys(alunosPorNivel).map((nivel, index) => (
                <div key={index}>
                    <h2>Nível: {nivel}</h2>
                    <ul>
                        {alunosPorNivel[nivel].map((aluno, alunoIndex) => (
                            <li key={alunoIndex}>{aluno.nome}</li>
                        ))}
                    </ul>
                </div>
            ))}
        </div>  
    );
}