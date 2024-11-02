// components/page.js
'use client'; // Isso deve ser adicionado se este componente usar recursos do cliente

import React from 'react';
import { Container, Nav, Navbar, NavDropdown } from "react-bootstrap";

export default function Pagina({ titulo, children }) {
  return (
    <>
      {/* Barra de Navegação */}
      <Navbar bg="dark" data-bs-theme="dark">
        <Container>
          <Navbar.Brand href="/">Home</Navbar.Brand>
        </Container>
      </Navbar>

      {/* Barra de Titulo */}
      <div className="bg-secondary text-center text-white py-2">
        <h1>{titulo}</h1>
      </div>

      {/* Conteudo da Página */}
      <Container className="mt-2">
        {children}
      </Container>
    </>
  );
}
