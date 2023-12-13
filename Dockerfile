# 使用 Nginx 官方镜像
FROM nginx:latest

# 复制您的 Nginx 配置文件到容器的 Nginx 配置目录
COPY ./conf/nginx.conf /etc/nginx/nginx.conf

# 将您的网页文件复制到容器内的 Nginx 服务器目录
COPY ./html/KarGoBang /usr/share/nginx/html/KarGoBang

# 假设您的 Dockerfile 和 Nginx 文件夹在同一目录下
COPY ./Certbot/live/kargobang.top/fullchain.pem /etc/nginx/certs/fullchain.pem
COPY ./Certbot/live/kargobang.top/privkey.pem /etc/nginx/certs/privkey.pem

RUN mkdir -p /etc/nginx/logs && touch /etc/nginx/logs/error.log

# 暴露 80 端口
EXPOSE 80

# 启动 Nginx 服务器
CMD ["nginx", "-g", "daemon off;"]
