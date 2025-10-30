#Instalando o node v20
FROM node:20

WORKDIR /app

#instalando dependencias
COPY ./app/package.json package.json
RUN npm install

#Inserindo variaveis de ambiente
ARG PORT_BUILD=3000
ENV PORT=${PORT_BUILD}
EXPOSE ${PORT}

#Setando pasta principal
COPY ./app .
ENTRYPOINT ["node", "server.js"]
