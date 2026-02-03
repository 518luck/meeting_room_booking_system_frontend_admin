# build stage
# 使用 node:18 镜像作为构建阶段的基础镜像
FROM node:24 as build-stage

# 定义工作目录为 /app
WORKDIR /app 

# 复制 package.json 到工作目录
COPY package.json ./

# 修改 npm 镜像源为淘宝镜像
RUN npm config set registry https://registry.npmmirror.com/

# 安装依赖
RUN npm install

# 复制项目代码到工作目录
COPY . .

# 构建项目
RUN npm run build

# production stage
# 使用 nginx:stable 镜像作为生产阶段的基础镜像
FROM nginx:stable as production-stage

# /usr/share/nginx/html 这是 Nginx 默认存放网页的根目录。
COPY --from=build-stage /app/dist /usr/share/nginx/html

COPY --from=build-stage /app/nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]