import React, { useState, useEffect } from "react";
import api from './services/api';
import "./styles.css";

function App() {
  const [repositories, setRepository] = useState([]);

  useEffect(() => {
    api.get('/repositories').then( response => {
      setRepository(response.data);
    });
  }, [repositories]);

  async function handleAddRepository() {
    const response = await api.post('/repositories', {
      title: `New Project ${Date.now()}`,
      url: `https://github.com/rocketseat-education/${Date.now()}`,
      techs: [
        "nodejs",
        "reactjs"
      ]
    });

    setRepository([...repositories, response.data]);
  }

  async function handleRemoveRepository(id) {
    const response = await api.delete(`/repositories/${id}`)
    console.log(response);
    setRepository([...repositories]);
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {repositories.map( repository => (
          <li key={repository.id}>
            { repository.title }
            
            <button onClick={() => handleRemoveRepository(repository.id)}>
              Remover
            </button>
          </li> 
        ))}
  
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
