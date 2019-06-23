# Gaia-Esporte

[![pipeline status](https://gitlab.com/botgaia/Gaia-Esporte/badges/master/pipeline.svg)](https://gitlab.com/botgaia/Gaia-Esporte/commits/master)
[![coverage report](https://gitlab.com/botgaia/Gaia-Esporte/badges/master/coverage.svg)](https://gitlab.com/botgaia/Gaia-Esporte/commits/master)
[![License: GPL v3](https://img.shields.io/badge/License-GPLv3-blue.svg)](https://www.gnu.org/licenses/gpl-3.0)

---

## Objetivo

Esse serviço é responsável em informar ao usuário os melhores esportes para praticar ao ar livre, sendo quando pedir ou através de notificação. É possível também saber o clima de qualquer lugar do mundo.

Esse microsserviço, utiliza duas API's externas: [OpenCageData](https://opencagedata.com/api) para pegar as coordenadas exatas do local desejado e [OpenWeatherMap](https://openweathermap.org/) para pegar o clima do local desejado.

Você pode encontrar o serviço nos sequintes links: [homologação](https://esporte.hml.botgaia.ga/) e [produção](https://esporte.botgaia.ga/).

## Como contribuir

Se tiver interesse em como contribuir para o projeto, olhe mais sobre o projeto em nossa [wiki](https://github.com/fga-eps-mds/2019.1-Gaia) e dê uma lida também no nosso guia de [contribuição](https://github.com/BotGaia/Gaia-Esporte/blob/dev/CONTRIBUTING.md).

## Como usar

### Como rodar

O nosso projeto utiliza o Docker e o Docker Compose como ferramentas de desenvolvimento. Para instalar eles, siga o tutorial no site oficial do [Docker](https://www.docker.com/).

Após instalar o docker rode o projeto como desenvolvimento da seguinte maneira, ele será disponibilizado em `localhost:3000`:

```$ sudo docker-compose up --build```

Para rodar os testes, rode esse comando:

``` $ sudo docker-compose run gaiaesporte npm run test ```

Para rodar a folha de estilo, utilize este comando:

``` $ sudo docker-compose run gaiaesporte npm run lint ```

### Endpoints

Para ver quais os endpoints desse serviço, basta acessar a rota principal `/`.
