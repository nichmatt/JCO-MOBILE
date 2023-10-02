FROM node:lts

WORKDIR /ORCHESTRATOR

ENV APP_URL=http://localhost:4002 
ENV USER_URL=http://localhost:4001 
ENV NODE_ENV=production
ENV PORT=4000

COPY ["package.json", "package-lock.json", "/ORCHESTRATOR/"]

RUN npm install -g nodemon
RUN npm install

COPY ./ ./

CMD ["npm", "run", "start"]