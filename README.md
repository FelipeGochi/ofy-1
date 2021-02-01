# ObjectiveFy

## Manifesto
O ObjectiveFy tem como proposito apoiar o crescimento dos nossos usuários! Organizar a bagunça mental e fazer com que o usuário alcance o máximo do seu potencial!

## DESENVOLVIMENTO

### Para subir o Banco de dados desenvolvimento docker
docker run --name 'SqlServerDatabase' -e 'ACCEPT_EULA=Y' -e 'SA_PASSWORD=<Password>' -p 1433:1433 -d mcr.microsoft.com/mssql/server:2017-latest