import React, { useState,useEffect } from "react";

import "./styles.css";

import api from './services/api'

//importar axios, criar estado e funções pra lidar com o pedido

function App() {
  //declarar um estado para atualizarmos com a lista de repositorios
  const [repositories, setRepositories] = useState([]);

  useEffect(() => {
    //nao colocar async await aqui
    api.get('repositories').then(response => {
      setRepositories(response.data)
    })
  }, [])

  async function handleAddRepository() {
    const response = await api.post('repositories',{
      title: "Desafio ReactJS",
      url: "https://github.com/joaohcca/reactjs",
      techs: ["nodeJS","ReactJS","always"]
    })
    setRepositories([... repositories, response.data])
  }

  async function handleRemoveRepository(id) {
    await api.delete(`repositories/${id}`)
    
    setRepositories(repositories.filter(
      repository => repository.id !== id
    ))
  }

  async function handleLikeRepository(id) {
    //TODO
  }

  return (
    <div>
      <ul data-testid="repository-list">
      
        
        {repositories.map(repository => <li key={repository.id}>
          {repository.title} 
          <button onClick={() => handleRemoveRepository(repository.id)}>
            Remover
          </button>
          
          </li>)}

      </ul>
      <button onClick={handleAddRepository}>Adicionar</button>
      
      </div>
  );
}

export default App;
