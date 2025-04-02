FROM node:22-alpine AS build

WORKDIR /app

COPY package*.json ./
RUN npm install --only=production

COPY . .
RUN npm run build

FROM node:22-alpine
WORKDIR /app

COPY --from=build /app /app

ENV NODE_ENV=production

EXPOSE 3000

CMD [ "sh", "-c", "npm run migrate && npm run seed && npm start" ]