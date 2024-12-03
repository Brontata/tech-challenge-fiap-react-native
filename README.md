# Tech Challenge Mobile

**Versão:** 1.0.0  
**Descrição:** Aplicação mobile desenvolvida com React Native e Expo.

## Sumário

1. [Setup Inicial](#setup-inicial)
2. [Arquitetura da Aplicação](#arquitetura-da-aplicação)
3. [Guia de Uso](#guia-de-uso)
4. [Dependências](#dependências)

---

## Setup Inicial

1. **Pré-requisitos**:
   - Node.js (recomendado: versão 18 ou superior)
   - Expo CLI instalado globalmente (`npm install -g expo-cli`)
   - Emulador Android/iOS ou dispositivo físico com o aplicativo Expo Go.

2. **Clonando o repositório**:
   ```bash
   git clone https://github.com/Brontata/tech-challenge-fiap-react-native.git
   cd tech-challenge-mobile

3. **Instalando dependências**:
    ```bash
    npm install

3. **Executando a aplicação:**:
    ```bash
    npm start```

 - Escaneie o QR Code gerado no terminal com o aplicativo Expo Go ou utilize o emulador configurado.

---
## Arquitetura da Aplicação
A aplicação segue a estrutura modular para facilitar o desenvolvimento e a manutenção:

 - App.js: Ponto de entrada da aplicação, define as rotas principais.
 - Diretórios principais:
    - api: Funções relacionadas ao consumo de APIs externas e chamadas aos endpoints REST.
    - components: Componentes reutilizáveis para a interface do usuário.
    - pages: Telas principais da aplicação.
    - services: Camada de serviços para lógica de negócios e integração com APIs.
    - assets: Recursos estáticos como imagens e ícones.
    - utils: Funções auxiliares
    - context: Arquivos relacionados ao Context API, fornece uma maneira eficiente de compartilhar estados, funções ou outros valores entre componentes 
    - hooks: Usada para organizar custom hooks (ganchos personalizados) criados para encapsular lógica reutilizável

A navegação é gerenciada utilizando o React Navigation, implementando stacks e abas para transição entre telas.

___

## Guia de Uso

1. Navegação:

    - A navegação entre telas é feita pelas abas na parte inferior (implementadas com @react-navigation/bottom-tabs).

2. Consumindo APIs:

    - O serviço axios é configurado em /services para realizar requisições HTTP.

3. Interface:

    - A interface utiliza React Native Paper para estilização e componentes pré-construídos.

---
## Principais Funcionalidades
   - Autenticação via email do usuário e senha
   - Visualização de posts
   - Criação e edição de Posts (necessário autenticação)
   - Criação e edição de usuários por Professores
   - Listagem de Usuários com filtro professor ou aluno
   - Página Administrativa permitindo visualização, edição e exclusão de Posts
---

## Dependências

### Principais

- React Navigation: Gerenciamento de rotas (@react-navigation/native, @react-navigation/stack, etc.).

- Axios: Realiza requisições HTTP.

- Expo Linear Gradient: Gradientes na interface.

- React Native Paper: Componentes de UI Material Design.

