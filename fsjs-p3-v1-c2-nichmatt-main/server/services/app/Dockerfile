FROM node:lts

WORKDIR /APP

ENV NODE_ENV=production
ENV PORT=4002
ENV DATABASE_URL=postgresql://postgres:NBj-X@e9axs82vC@db.fvaukdfxtducgoyvffpp.supabase.co:5432/postgres

COPY ["package.json", "package-lock.json", "/APP/"]

RUN npm install -g nodemon
RUN npm install


COPY ./ ./

CMD ["npm", "run", "start"]