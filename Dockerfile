FROM node:20.11.0-alpine3.19

WORKDIR /usr/src/app

COPY pnpm-lock.yaml package.json ./
RUN npm install -g pnpm
RUN pnpm install
RUN npm install pm2 -g

COPY . .

EXPOSE 3000
CMD ["pm2-runtime", "start", "app.js"]
