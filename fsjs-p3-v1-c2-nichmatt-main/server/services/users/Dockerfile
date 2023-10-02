FROM node:lts

WORKDIR /USER

ENV NODE_ENV=production
ENV JWT_SECRET=SECRET
ENV PORT=4001

COPY ["package.json", "package-lock.json", "/USER/"]

RUN npm install -g nodemon
RUN npm install


COPY ./ ./

CMD ["npm", "run", "start"]