FROM node:22-alpine

WORKDIR /app
COPY package.json ./
COPY server.js ./
COPY index.html admin.html analytics.html deployment.html offline.html manifest.webmanifest ./
COPY src ./src
COPY data ./data
COPY docs ./docs

ENV PORT=5173
EXPOSE 5173

CMD ["npm", "start"]
