# Câu 51: Khai báo Node.js Image làm Base Image
FROM node:20-alpine

# Câu 52: Thiết lập thư mục làm việc bên trong Container
WORKDIR /usr/src/app

# Câu 53: Sao chép package.json và package-lock.json
COPY package*.json ./

# Câu 54: Cài đặt các package của React Application
RUN npm install

# Câu 55: Sao chép toàn bộ source code React vào Container
COPY . .

# Câu 56: Build React Application (Tạo ra thư mục dist)
RUN npm run build

# --- Phần lệnh thêm để Container có thể chạy được (Phục vụ Câu 60) ---
EXPOSE 5173
CMD ["npm", "run", "preview"]