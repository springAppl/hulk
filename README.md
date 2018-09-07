小程序管理后台前端项目<br/>
在启动前端项目之前，需要先启动后端项目[kuboot](https://github.com/springAppl/kuboot)<br/>
对应的小程序[anna](https://github.com/springAppl/anna)<br/>

nginx配置:
1在本地/etc/hosts文件中添加
```
admin.mini.com 127.0.0.1
```
2创建  mini.conf
```
server {
listen 80;
server_name  www.news.com admin.mini.com;
location ^~ /api/ {
        proxy_pass http://127.0.0.1:8080;
}
location / {
        proxy_pass  http://127.0.0.1:3000;

}
}
```
3nginx.conf中包含 mini.conf
```
http {
  .....
  include path/mini.conf
}
```

采用yarn启动，因为采用npm会碰到各种包的问题，所以采用yarn<br/>

启动过程:<br/>
1 yarn<br/>
2 yarn start<br/>


访问 http://admin.mini.com<br/>
后端swagger地址: http://kuboot.cn/swagger-ui.html<br/>