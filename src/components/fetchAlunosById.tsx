import axios from "axios";
import {  useState, useEffect, JSXElementConstructor, Key, PromiseLikeOfReactNode, ReactElement, ReactNode, ReactPortal } from "react"
import { Card, CardContent, CardHeader } from "./ui/card";

export default function FetchAlunosById() {
    const [aluno, setAluno] = useState({
        id: '',
        nome: '',
        idade: '',
        objetivos: '',
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
      });
    
      useEffect(() => {
        // Recuperar o ID do aluno selecionado do localStorage
        const selectedId = localStorage.getItem('idSelecionado');
    
        // Fazer uma requisição para obter os detalhes do aluno com o ID selecionado
        async function fetchAlunoById(id: any) {
          try {
            const response = await axios.get(`http://localhost:3000/api/v1/alunos/${id}`);
            const alunoData = response.data; // Dados do aluno
            console.log('Dados do aluno selecionado: ', alunoData)
    
            // Atualizar o estado com os dados do aluno selecionado
            setAluno(alunoData);
          } catch (error) {
            console.error('Erro ao buscar dados do aluno:', error);
          }
        }
    
        if (selectedId) {
          fetchAlunoById(selectedId);
        }
      }, []);
 
      return (
        <Card>
            <CardHeader>
                Informações do aluno: {aluno.nome}
            </CardHeader>
            <CardContent>
                <div>
                    <ul>
                        <li key={aluno.id}>
                        <h2>Detalhes do Aluno</h2>
                        <p>Nome: {aluno.nome}</p>
                        {/* Adicione outros detalhes do aluno conforme necessário */}
                        </li>
                    </ul>
                </div>
            </CardContent>
        </Card>
      )
    
}