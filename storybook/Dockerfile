FROM node:20-alpine

WORKDIR /app

COPY package.json package-lock.json* ./
RUN npm install

COPY . .

EXPOSE 6006

CMD ["npm", "run", "storybook", "--", "--host", "0.0.0.0", "--no-open"]
