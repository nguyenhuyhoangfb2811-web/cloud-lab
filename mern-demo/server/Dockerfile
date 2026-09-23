# Câu 32: Khai báo Node.js Image làm Base Image
FROM node:20-alpine

# Câu 33: Thiết lập thư mục làm việc bên trong Container
WORKDIR /usr/src/app

# Câu 34: Sao chép package.json và package-lock.json vào Container
COPY package*.json ./

# Câu 35: Cài đặt các package của Backend
RUN npm install

# Câu 36: Sao chép toàn bộ source code Backend vào Container
COPY . .

# Câu 37: Khai báo port 5000
EXPOSE 5000

# Câu 38: Thiết lập lệnh khởi động Backend
CMD ["npm", "start"]