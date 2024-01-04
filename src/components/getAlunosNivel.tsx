"use client"
import {useState, useEffect } from "react"
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
  } from "@/components/ui/alert-dialog"

import { ScrollArea } from "@/components/ui/scroll-area"

  
import axios from 'axios';
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card"

import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion"


import { Separator } from "@/components/ui/separator"
import { Button } from "./ui/button";
import AddForm from "./addAlunos";
import EditForm from "./editAluno";
import FetchAlunosById from "./fetchAlunosById";

interface Aluno {
    id: number;
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


        async function handleDeleteAluno(id: any) {
            try {
                const response = await axios.delete(`http://localhost:3000/api/v1/alunos/${id}`);
                console.log(response)
                alert('Aluno excluido com sucesso!')
                window.location.href = '/'  
                
            } catch (error) {
                 console.error('Erro ao excluir aluno:', error);
            }
        }


        function handleIdLocalStorage(id: any) {
            localStorage.setItem('idSelecionado', id)
        }
    
        function handleDeleteIdLocalStorage() {
            localStorage.removeItem('idSelecionado')
        }
        
        return (
            <div className="flex justify-center w-screen">
                <Card className="w-3/4 mt-2">
                    <CardHeader>
                        <CardTitle>Lista de alunos</CardTitle>
                        <CardDescription>Sepração por níveis</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <Accordion type="single" collapsible>
                            {Object.keys(alunosPorNivel).map((nivel, index) => (
                                <AccordionItem key={index} value={`item-${index}`}>
                                    <AccordionTrigger>
                                        <h2>
                                            <span className="font-bold">
                                                Nível: 
                                            </span>
                                            <span className="ml-2">
                                                {nivel}
                                            </span>
                                        </h2>
                                    </AccordionTrigger>
                                    <AccordionContent>
                                        <ul className="">
                                            {alunosPorNivel[nivel].map((aluno, alunoIndex) => (
                                                <div key={alunoIndex}>
                                                    <AlertDialog>
                                                    <AlertDialogTrigger><li onClick={() => handleIdLocalStorage(aluno.id)} className="cursor-pointer hover:underline"><span className="font-bold cursor-pointer hover:underline">Nome: </span>{aluno.nome}</li></AlertDialogTrigger>
                                                    <AlertDialogContent>
                                                        <FetchAlunosById/>
                                                    <AlertDialogCancel onClick={handleDeleteIdLocalStorage}>Sair</AlertDialogCancel>
                                                    </AlertDialogContent>
                                                    </AlertDialog>
                                                    <li><span className="font-bold">Idade: </span>{aluno.idade}</li>
                                                    {/* Adicione outros detalhes do aluno conforme necessário */}
                                                    <AlertDialog>
                                                        <AlertDialogTrigger><Button onClick={() => handleIdLocalStorage(aluno.id)}>Editar aluno</Button></AlertDialogTrigger>
                                                        <AlertDialogContent>
                                                            <AlertDialogHeader>
                                                            <AlertDialogTitle>Editar Aluno</AlertDialogTitle>
                                                            <AlertDialogDescription>
                                                                Preencha o Formulário com cuidado.
                                                            </AlertDialogDescription>
                                                            </AlertDialogHeader>
                                                            <div className=" scroll-auto overflow-y-auto h-[250px]">
                                                                <EditForm/>
                                                            </div>
                                                            <AlertDialogFooter>
                                                            <AlertDialogCancel><span onClick={handleDeleteIdLocalStorage}>Cancel</span></AlertDialogCancel>
                                                            </AlertDialogFooter>
                                                        </AlertDialogContent>
                                                    </AlertDialog>
                                                    <AlertDialog>
                                                        <AlertDialogTrigger><Button className="ml-2" onClick={() => handleIdLocalStorage(aluno.id)}>Excluir aluno</Button></AlertDialogTrigger>
                                                        <AlertDialogContent>
                                                            <AlertDialogHeader>
                                                            <AlertDialogTitle>Excluir Aluno</AlertDialogTitle>
                                                            <AlertDialogDescription>
                                                                Você tem certeza que quer excluir o aluno?
                                                            </AlertDialogDescription>
                                                            </AlertDialogHeader>
                                                                <span className="font-bold">Essa é uma ação irreversível!</span>
                                                            <AlertDialogFooter>
                                                            <AlertDialogCancel><span onClick={handleDeleteIdLocalStorage}>Cancelar</span></AlertDialogCancel>
                                                            <AlertDialogAction onClick={() => { handleDeleteAluno(localStorage.getItem('idSelecionado')); handleDeleteIdLocalStorage()}}>Excluir</AlertDialogAction>
                                                            </AlertDialogFooter>
                                                        </AlertDialogContent>
                                                    </AlertDialog>
                                                    <Separator className="m-2"/> 
                                                </div>
                                            ))}
                                        </ul>
                                    </AccordionContent>
                                </AccordionItem>
                            ))}
                        </Accordion>
                    </CardContent>
                </Card>
            </div>
        );
}