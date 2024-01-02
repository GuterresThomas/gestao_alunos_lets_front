"use client"

import React, { useState } from 'react';
import axios from 'axios';

const AddAlunoForm = () => {
  const [aluno, setAluno] = useState({
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

  const handleChange = (e: { target: { name: any; value: any; }; }) => {
    const { name, value } = e.target;
    setAluno({ ...aluno, [name]: value });
  };

  const handleSubmit = async (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3000/api/v1/alunos', aluno);
      console.log('Aluno adicionado:', response.data);
      // Limpar o formulário ou fazer outra ação após adicionar o aluno com sucesso
      setAluno({
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
    } catch (error) {
      console.error('Erro ao adicionar aluno:', error);
    }
  };

  return (
    <div>
      <h2>Adicionar Aluno</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" name="nome" placeholder="Nome" value={aluno.nome} onChange={handleChange} />
        <input type="text" name="idade" placeholder="Idade" value={aluno.idade} onChange={handleChange} />
        {/* Outros campos do aluno */}
        <button type="submit">Adicionar Aluno</button>
      </form>
    </div>
  );
};

export default AddAlunoForm;
