import { useEffect, useState } from 'react';
import axios from 'axios';
import { Card, Table } from 'react-bootstrap';

export default function Users() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      const   
 response = await axios.get('https://dummyjson.com/users');   

      setUsers(response.data.users);
    };

    fetchUsers();
  }, []);

  return (
    <div>
      <h1>Lista de Usuários</h1>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Nome</th>
            <th>Sobrenome</th>
            <th>Idade</th>
            <th>Imagem</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>{user.firstName}</td>
              <td>{user.lastName}</td>
              <td>{user.age}</td>
              <td><img src={user.image} alt={user.firstName} /></td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
}