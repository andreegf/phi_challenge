# PHI-CHALLENGE

## TECNOLOGIAS
* Node.js com Typescript
* Express
* TypeORM
* Bcrypt e JWT
* Jest
* Postgres rodando no docker

## INSTRUÇÕES
*   para iniciar o projeto, rodar o comando ```yarn```
*   Preencher o ormconfig e o .env com suas credenciais
*   rodar as migrations com  ```yarn typeorm migration:run``` (as migrations incluem seeds de filmes)
*   para executar o servidor, rodar ```yarn dev:server```
*   para rodar testes ```yarn test```
*   Junto do projeto está uma collection para facilitar os testes.
*   A url base está como http://localhost:3333
*   As queries para criação do DB também estão em anexo.
*   Você pode ter que ativar a extensão uuid_ossp do postgres


## EXEMPLOS

### ROTAS ABERTAS

#### USUÁRIO

##### CRIAR USUÁRIO

Para criar um usuário deve-se enviar um  ```POST``` para ```/users``` com o seguinte conteúdo:
```
{
	"name": "Teste",
	"email":"teste@teste.com",
	"password":"test2"
}

```

No qual :
propriedade |   descrição
--          |   --
name        |   Nome do usuário
email       |   Email do usuário
password    |   Senha do usuário

O retorno será o objeto enviado, seguido da propriedade ```created_at``` com sua data de criação

##### REALIZAR LOGIN

Para realizar um login e ter acesso as rotas privadas deve-se enviar um  ```POST``` para ```/auth``` com o seguinte conteúdo:
```
{
	"email":"teste@teste.com",
	"password":"test2"
}

```

No qual :
propriedade |   descrição
--          |   --
email       |   Email do usuário
password    |   Senha do usuário

O retorno será
```
{
  "name": "Teste",
  "email": "teste@teste.com",
  "token": "your-token"
}

```

No qual :
propriedade |   descrição
--          |   --
name        |   Nome do usuário
email       |   Email do usuário
token       |   Token de acesso

### ROTAS FECHADAS

#### FILMES

##### LISTAR FILMES DISPONÍVEIS

para listar os filmes disponíveis para locação você deve mandar um ```GET``` para ```/MOVIES```

O retorno seguirá o seguinte formato:

```
[
  {
    "id": "f7544c3f-39ed-4041-88c7-ab41105087c5",
    "title": "Crepúsculo",
    "director": "Catherine Hardwicke",
    "quantity": 2,
    "created_at": "2021-01-22T21:52:38.155Z",
    "updated_at": "2021-01-22T21:52:38.155Z"
  },
  {
    "id": "5e49cbec-851c-4206-a3d7-f9b35bab310d",
    "title": "Lua Nova",
    "director": "Catherine Hardwicke",
    "quantity": 3,
    "created_at": "2021-01-22T21:52:38.155Z",
    "updated_at": "2021-01-22T21:52:38.155Z"
  },
  {
    "id": "7588ceb5-77f0-4719-9980-e3132725c911",
    "title": "Django Livre",
    "director": "Quentin Tarantino",
    "quantity": 1,
    "created_at": "2021-01-22T21:52:38.155Z",
    "updated_at": "2021-01-22T21:52:38.155Z"
  }
]

```

No qual :
propriedade |   descrição
--          |   --
id          |   Identificador do filme
title       |   Título do filme
director    |   Diretor do filme
quantity    |   Quantidade disponível
created_at  |   Data do cadastro do título
updated_at  |   Última alteração realizada no título

#### BUSCAR FILME PELO SEU TÍTULO

Para buscar um filme por parte do seu título você deve fazer um ```GET``` para ```/movies/search?title=:titleToSearch``` no qual ```titleToSearch``` é parte do título do filme

O retorno é o mesmo da chamada anterior, um array de objetos contendo todos que possuem o título semelhante ao pesquisado.

### LOCAR UM FILME

para locar um filme você deve fazer um ```POST``` para ```/rents´´´ com a seguinte estrutura:

```
{
  "movie_id": "some-movie-id",
  start_date: '2021-01-22'
}

```
Sendo:
propriedade |   descrição
--          |   --
movie_id    |   identificador do filme
start_date  |   data inicial da locação

O retorno seguirá o seguinte formato:
propriedade |   descrição
--          |   --
id          |   Identificador da locação
movie_id    |   identificador do filme
user_id     |   identificador do usuário
start_date  |   Data de início da locação
created_at  |   Data do cadastro da locação
updated_at  |   Última alteração realizada na locação

### DEVOLVER UM FILME

Para fazer a devolução do filme você deve fazer um ```PATCH``` para ```/RENTS/RETURN/:RENT_ID``` no qual rent_id é o id da locação

O retorno da chamada será
propriedade |   descrição
--          |   --
id          |   Identificador da locação
movie_id    |   identificador do filme
user_id     |   identificador do usuário
start_date  |   Data de início da locação
return_date |   Data da devolução da locação
created_at  |   Data do cadastro da locação
updated_at  |   Última alteração realizada na locação




