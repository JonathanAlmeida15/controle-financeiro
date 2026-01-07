# fullstack-platform
Sistema de controle financeiro — Spring Boot + React + TypeScript


## Como rodar (desenvolvimento)
1. Backend: `cd backend && mvn spring-boot:run`
2. Frontend: `cd frontend && npm install && npm run dev`
3. Alternativa: `docker-compose up --build`


## Versão atual, de 07/01/2026 - 05:28

## Comando para rodar o ambiente de Homologação: 
$env:SPRING_PROFILES_ACTIVE="homolog"
mvn spring-boot:run


## Variaveis de ambiente e temporarias (Ativas somente na janela do PowerShell)

$env:SPRING_PROFILES_ACTIVE="prod"
$env:DB_USER="root"
$env:DB_PASSWORD="66360180"          
$env:JWT_SECRET="a9F3kLmP0X2R8s7ZQWERTYuiopASDFGHJKL123456789" 