
# 🐰 NestJS RabbitMQ Messaging System

Este projeto consiste em um sistema de mensageria assíncrona utilizando **NestJS** e **RabbitMQ**, dividido em duas partes:

1. **Producer**: Responsável por enviar ordens (orders) ao consumer.
2. **Consumer**: Processa as ordens recebidas e envia uma requisição `PATCH` para uma rota de atualização do status de ordem no producer.

## 🗂 Estrutura do Projeto

```bash
├── producer/
│   └── src/
│       └── order/
│           └── order.controller.ts  # Rota para receber updates do consumer
│   └── package.json                 # Dependências e scripts do producer
├── consumer/
│   └── src/
│       └── order/
│           └── order.processor.ts   # Processamento das ordens recebidas
│   └── package.json                 # Dependências e scripts do consumer
│   └── Dockerfile                   # Dockerfile para configurar o RabbitMQ
│   └── docker-compose.yml           # Configuração do RabbitMQ com Docker
```

## 🚀 Visão Geral

O projeto é composto de duas aplicações separadas:

1. **Producer**:
   - O producer envia uma order para o **RabbitMQ**. 
   - A order é consumida pelo **Consumer** e, quando processada, o **Consumer** realiza uma requisição `PATCH` para atualizar o status dessa order no producer.

2. **Consumer**:
   - O **Consumer** é responsável por processar as orders recebidas do RabbitMQ.
   - Uma vez processada, o consumer realiza uma requisição `PATCH` para a rota de atualização de status do **Producer**.

## 🛠️ Tecnologias Utilizadas

- **NestJS**: Framework para construir aplicações Node.js escaláveis.
- **RabbitMQ**: Sistema de mensageria utilizado para comunicação entre o producer e o consumer.
- **Docker**: Utilizado para rodar uma instância do RabbitMQ no ambiente do consumer.

## 🔧 Configuração

### Producer

1. Navegue até a pasta `producer`:
   ```bash
   cd producer
   ```

2. Instale as dependências:
   ```bash
   npm install
   ```

3. Inicie o servidor do **Producer**:
   ```bash
   npm run start:dev
   ```

### Consumer

1. Navegue até a pasta `consumer`:
   ```bash
   cd consumer
   ```

2. Instale as dependências:
   ```bash
   npm install
   ```

3. Para iniciar o RabbitMQ com Docker, execute o seguinte comando:
   ```bash
   npm run start:docker-dev
   ```

4. Em seguida, inicie o backend do **Consumer**:
   ```bash
   npm run start:dev
   ```

## 🛤️ Fluxo de Funcionamento

1. O **Producer** envia uma order para a fila do RabbitMQ.
2. O **Consumer** consome essa ordem, a processa e, quando terminado, realiza uma requisição `PATCH` para o **Producer**, atualizando o status da ordem.


## 📋 Rotas

### Producer

- **PATCH /order/:id**: Atualiza o status de uma order processada.
  - Exemplo de Payload:
    ```json
    {
      "status": "COMPLETED"
    }
    ```

### Consumer

- O **Consumer** escuta automaticamente a fila de orders do RabbitMQ e processa as ordens conforme elas chegam.

## 🐳 Docker

- O **Consumer** já vem configurado com um Dockerfile e um **docker-compose.yml** para subir uma instância do RabbitMQ.
- Para rodar o RabbitMQ via Docker, basta utilizar o comando:
  ```bash
  npm run start:docker-dev
  ```

## 🏗️ Como Contribuir

1. Faça um fork do repositório.
2. Crie uma nova branch:
   ```bash
   git checkout -b feature/nova-feature
   ```
3. Faça as alterações e commit:
   ```bash
   git commit -m "Adiciona nova feature"
   ```
4. Faça o push para a branch:
   ```bash
   git push origin feature/nova-feature
   ```
5. Abra um Pull Request!

---

## 📜 Licença

Este projeto está licenciado sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.
