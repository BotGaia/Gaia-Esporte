[![pipeline status](https://gitlab.com/botgaia/Gaia-Esporte/badges/master/pipeline.svg)](https://gitlab.com/botgaia/Gaia-Esporte/commits/master)
[![coverage report](https://gitlab.com/botgaia/Gaia-Esporte/badges/master/coverage.svg)](https://gitlab.com/botgaia/Gaia-Esporte/commits/master)
[![License: GPL v3](https://img.shields.io/badge/License-GPLv3-blue.svg)](https://www.gnu.org/licenses/gpl-3.0)

# Gaia-Esporte

## Objetivo
Esse serviço é responsável em lidar com o esportes e o clima.

## Como contribuir

Se tiver interesse em como contribuir para o projeto, olhe nossa [wiki](https://github.com/fga-eps-mds/2019.1-Gaia).

## Como usar

### Como rodar

O nosso projeto utiliza o Docker e o Docker Compose como ferramentas de desenvolvimento. Para instalar eles, siga o tutorial no site oficial do [Docker](https://www.docker.com/).

Após instalar o docker rode o projeto como desenvolvimento da seguinte maneira:

```$ sudo docker-compose up --build```

Para rodar os testes, rode esse comando:

``` $ sudo docker-compose run gaiaesporte npm run test ```

Para rodar a folha de estilo, utilize este comando:

``` $ sudo docker-compose run gaiaesporte npm run lint ```

### Endpoints

Aqui se encontra todos os endpoints desse serviço. Todos os endpoints se encontra em `localhost:3000`.

|Requisição|Endpoint|Parâmetro:Tipo|Descrição|
|:--------:|:------:|:------------:|:-------:|
|GET|/|-|Retorna todas as endpoints do microserviço.|
|GET|/local|local: String|Recebe o nome de um local e retorna as coordenadas do local informado.|
|GET|/listLocales|local: String|Recebe o nome de um local e retorna uma lista com os possíveis locais informado.|
|GET|/climate|place: String|Recebe um local e retorna as condições climáticas do mesmo.|
|GET|/forecast|place: String|Recebe o nome de um local e retorna uma lista com as previsões de 3 em 3 horas por 5 dias do local informado.|
|GET|/sports|place: String|Recebe um local e retorna os esportes favoráveis, com ressalva e com alerta.|
|GET|/allSports|-|Retorna todos os esportes presentes no banco de dados.|
|POST|/sportForecast|days: Array, locals: Array, telegramId: String, sport: String, hour: Integer, minutes:Integer, date: String |Recebe um objeto de notificação e retorna a favorabilidade do esporte e um objeto de clima para cada local.|
|GET|/climateForecast|place: String, date: String|Recebe o nome de um local, o dia e a hora e retorna a previsão mais perto do horário escolhido.|
||Formato /climateForecast| place=brasilia&date=AAAA-MM-DDTHH%3AMM|A = ano, M = mês, D = dia, H = hora, M = minuto|
||Exemplo da requisição do /climateForecast| place=brasilia&date=2019-05-30T03%3A30|place = brasilia, 30/05/2019 às 03horas e 30min|
