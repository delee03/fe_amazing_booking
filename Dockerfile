# Sử dụng Node.js 22.9.0 làm base image
FROM node:22.9.0

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

RUN npm install -g serve
#Sử dụng serve do nhẹ và vì tối ưu cho production build và serve static files(html css, js) nhanh hơn

EXPOSE 5173

CMD ["serve", "-s", "dist", "-l", "5173"]
