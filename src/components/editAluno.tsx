import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Input } from "@/components/ui/input";
import { Button } from './ui/button';
import { Checkbox } from './ui/checkbox';
import { Label } from './ui/label';

export default function EditForm() {
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


  const handleChange = (e: { target: { name: any; value: any; }; }) => {
    const { name, value } = e.target;
    setAluno((prevAluno) => ({
      ...prevAluno,
      [name]: value,
    }));
  };
  
  const handleCheckboxClick = (fieldName: keyof typeof aluno) => {
    setAluno(prevState => ({
      ...prevState,
      [fieldName]: !prevState[fieldName],
    }));
  };



  const handleSubmit = async (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    try {
      const response = await axios.put(`http://localhost:3000/api/v1/alunos/${aluno.id}`, aluno);
      console.log('Aluno atualizado:', response.data);
      alert('Aluno atualizado com sucesso!');
      // Redirecionar ou realizar outras ações após a atualização bem-sucedida
    } catch (error) {
      console.error('Erro ao atualizar aluno:', error);
      alert('Erro ao atualizar aluno. Por favor, tente novamente.');
    }
  };

  // Renderização do formulário
  return (
    <div className="p-2 m-2">
      <form className="flex-col flex justify-center" onSubmit={handleSubmit}>
            <Input className='m-2' type="text" name="nome" placeholder="Nome" value={aluno.nome}  onChange={(e) => setAluno({ ...aluno, nome: e.target.value })} required />
            <Input className='m-2' type="text" name="idade" placeholder="Idade" value={aluno.idade} onChange={(e) => setAluno({ ...aluno, idade: e.target.value })} />
            <Input className='m-2' type="text" name="objetivos" placeholder="Objetivos" value={aluno.objetivos} onChange={(e) => setAluno({ ...aluno, objetivos: e.target.value })} />
            <div className='flex mt-2'>
              <Checkbox className='' name="menos_consciencia_corporal" checked={aluno.menos_consciencia_corporal} onClick={() => handleCheckboxClick('menos_consciencia_corporal')} />
              <Label className='ml-2'htmlFor="menos_consciencia_corporal">1-3 Consciencia corporal</Label>
            </div>
            <div className='flex mt-2'>
              <Checkbox className='' name="menos_adaptado" checked={aluno.menos_adaptado} onClick={() => handleCheckboxClick('menos_adaptado')}/>
              <Label className='ml-2' htmlFor="menos_adaptado">1-3 Adaptado</Label>
            </div>
            <div className='flex mt-2'>  
              <Checkbox  name="mais_dor" checked={aluno.mais_dor} onClick={() => handleCheckboxClick('mais_dor')}/>
              <Label className='ml-2' htmlFor="mais_dor">7-10 Dor</Label>
            </div>
            <div className='flex mt-2'>  
            <Checkbox
              name="menos_gesto_tecnico" checked={aluno.menos_gesto_tecnico} onClick={() => handleCheckboxClick('menos_gesto_tecnico')}
            />
            <Label className='ml-2' htmlFor="menos_gesto_tecnico">1-3 Gesto Técnico</Label>
            </div>
            <div className='flex mt-2'>  
            <Checkbox name="menos_forca" checked={aluno.menos_forca} onClick={() => handleCheckboxClick('menos_forca')}
            />
            <Label className='ml-2' htmlFor="menos_forca">1-3 Força</Label>
            </div>
            <div className='flex mt-2'>  
            <Checkbox name="menos_mobilidade" checked={aluno.menos_mobilidade} onClick={() => handleCheckboxClick('menos_mobilidade')} />
            <Label className='ml-2' htmlFor="menos_mobilidade">1-3 Mobilidade</Label>
            </div>
            <div className='flex mt-2'>  
            <Checkbox name="menos_resistencia" checked={aluno.menos_resistencia} onClick={() => handleCheckboxClick('menos_resistencia')} />
            <Label className='ml-2' htmlFor="menos_resistencia">1-3 Resistencia</Label>
            </div>
            <div className='flex mt-2'>  
            <Checkbox name="menos_equilibrio" checked={aluno.menos_equilibrio} onClick={() => handleCheckboxClick('menos_equilibrio')} />
            <Label className='ml-2' htmlFor="menos_equilibrio">1-3 Equilibrio</Label>
            </div>
            
            <div className='flex mt-2'>  
            <Checkbox name="mais_ou_menos_consciencia_corporal" checked={aluno.mais_ou_menos_consciencia_corporal} onClick={() => handleCheckboxClick('mais_ou_menos_consciencia_corporal')} />
            <Label className='ml-2' htmlFor="mais_ou_menos_consciencia_corporal">4-6 Consciencia corporal</Label>
            </div>
            <div className='flex mt-2'>  
            <Checkbox name="mais_ou_menos_adaptado" checked={aluno.mais_ou_menos_adaptado} onClick={() => handleCheckboxClick('mais_ou_menos_adaptado')}/>
            <Label className='ml-2' htmlFor="mais_ou_menos_adaptado">4-6 Adaptado</Label>
            </div>
            <div className='flex mt-2'>  
            <Checkbox  name="mais_ou_menos_dor" checked={aluno.mais_ou_menos_dor} onClick={() => handleCheckboxClick('mais_ou_menos_dor')}/>
            <Label className='ml-2' htmlFor="mais_ou_menos_dor">4-6 Dor</Label>
            </div>
            <div className='flex mt-2'>  
            <Checkbox
              name="mais_ou_menos_gesto_tecnico" checked={aluno.mais_ou_menos_gesto_tecnico} onClick={() => handleCheckboxClick('mais_ou_menos_gesto_tecnico')}
            />
            <Label className='ml-2' htmlFor="mais_ou_menos_gesto_tecnico">4-6 Gesto Técnico</Label>
            </div>
            <div className='flex mt-2'>  
            <Checkbox name="mais_ou_menos_forca" checked={aluno.mais_ou_menos_forca} onClick={() => handleCheckboxClick('mais_ou_menos_forca')}
            />
            <Label className='ml-2' htmlFor="mais_ou_menos_forca">4-6 Força</Label>
            </div>
            <div className='flex mt-2'>  
            <Checkbox name="mais_ou_menos_mobilidade" checked={aluno.mais_ou_menos_mobilidade} onClick={() => handleCheckboxClick('mais_ou_menos_mobilidade')} />
            <Label className='ml-2' htmlFor="mais_ou_menos_mobilidade">4-6 Mobilidade</Label>
            </div>
            <div className='flex mt-2'>  
            <Checkbox name="mais_ou_menos_resistencia" checked={aluno.mais_ou_menos_resistencia} onClick={() => handleCheckboxClick('mais_ou_menos_resistencia')} />
            <Label className='ml-2' htmlFor="mais_ou_menos_resistencia">4-6 Resistencia</Label>
            </div>
            <div className='flex mt-2'>  
            <Checkbox name="mais_ou_menos_equilibrio" checked={aluno.mais_ou_menos_equilibrio} onClick={() => handleCheckboxClick('mais_ou_menos_equilibrio')} />
            <Label className='ml-2' htmlFor="mais_ou_menos_equilibrio">4-6 Equilibrio</Label>
            </div>

            <div className='flex mt-2'>  
            <Checkbox name="mais_consciencia_corporal" checked={aluno.mais_consciencia_corporal} onClick={() => handleCheckboxClick('mais_consciencia_corporal')} />
            <Label className='ml-2' htmlFor="mais_consciencia_corporal">7-10 Consciencia corporal</Label>
            </div>
            <div className='flex mt-2'>  
            <Checkbox name="mais_adaptado" checked={aluno.mais_adaptado} onClick={() => handleCheckboxClick('mais_adaptado')}/>
            <Label className='ml-2' htmlFor="mais_adaptado">7-10 Adaptado</Label>
            </div>
            <div className='flex mt-2'>  
            <Checkbox  name="menos_dor" checked={aluno.menos_dor} onClick={() => handleCheckboxClick('menos_dor')}/>
            <Label className='ml-2' htmlFor="menos_dor">1-3 Dor</Label>
            </div>
            <div className='flex mt-2'>  
            <Checkbox
              name="mais_gesto_tecnico" checked={aluno.mais_gesto_tecnico} onClick={() => handleCheckboxClick('mais_gesto_tecnico')}
            />
            <Label className='ml-2' htmlFor="mais_gesto_tecnico">7-10 Gesto Técnico</Label>
            </div>
            <div className='flex mt-2'>  
            <Checkbox name="mais_forca" checked={aluno.mais_forca} onClick={() => handleCheckboxClick('mais_forca')}
            />
            <Label className='ml-2' htmlFor="mais_forca">7-10 Força</Label>
            </div>
            <div className='flex mt-2'>  
            <Checkbox name="mais_mobilidade" checked={aluno.mais_mobilidade} onClick={() => handleCheckboxClick('mais_mobilidade')} />
            <Label className='ml-2' htmlFor="">7-10 Mobilidade</Label>
            </div>
            <div className='flex mt-2'>  
            <Checkbox name="mais_resistencia" checked={aluno.mais_resistencia} onClick={() => handleCheckboxClick('mais_resistencia')} />
            <Label className='ml-2' htmlFor="mais_resistencia">7-10 Resistencia</Label>
            </div>
            <div className='flex mt-2'>  
            <Checkbox name="mais_equilibrio" checked={aluno.mais_equilibrio} onClick={() => handleCheckboxClick('mais_equilibrio')} />
            <Label className='ml-2' htmlFor="mais_equilibrio">7-10 Equilibrio</Label>
            </div>
            <Input className='m-2' type="text" name="observacoes" placeholder="Observações" value={aluno.observacoes} onChange={handleChange} />
        <Button type="submit">Atualizar Aluno</Button>
      </form>
    </div>
  );
};
