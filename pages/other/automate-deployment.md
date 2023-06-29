---
  title: 前端自动化部署相关知识点，包括nginx和jenkins基础配置
  display: 前端自动化部署相关知识点，包括nginx和jenkins基础配置
  image: /image/banner1.jpg
  description: 
  subtitle: 
  date: 2023-06-29
  type: other
  author: lrsoy
  toc: true
  duration: 30min
---
<DelayTeleport>

[[toc]]
</DelayTeleport>


## 一、购买云服务器



## 二、配置服务器环境

### 2.1 在云服务器里面配置Nginx

#### 2.1.1 连接远程服务器

* 对已经购买的云服务器(腾讯/阿里/华为)进行远程连接，使用git自带的命令行工具`Bash`进行远程连接

```shell
# 通过git bash 中的ssh工具进行远程服务器连接，用户root，@后面接已购买云服务器公网IP
ssh root@123.57.32.173
```

![](/deploy/20230628134049.png)



* 通过vscode链接远程仓库

```shell
# 在vscode中安装插件
Remote - SSH
```

![](/deploy/20230628141308.png)



![](/deploy/20230628141331.png)

![](/deploy/20230628141443.png)



![](/deploy/20230628141506.png)



![](/deploy/20230628141751.png)

![](/deploy/20230628142509.png)

#### 2.1.2 在远程服务器内配置Nginx(centos8)

* 查看远程服务器内是否存在`软件包管理器dnf` ，centos8已经内置了dnf，在之前的版本里面通过使用`yum`

```shell
# 查看 dnf 的版本
dnf --version
```

* 使用`dnf`搜索服务器软件包里面是否存在`Nginx` ，搜索到并且进行安装。

```shell
# 利用 dnf search 搜索 nginx
dnf search nginx

# 利用 dnf install 安装nginx
dnf install nginx

# 提示安装完成
Complete!
```

* 启动nginx

```shell
# 通过系统指令启动nginx
systemctl start nginx

# 查看nginx启动状态
systemctl status nginx

# 下次启动系统(重新启动系统)的是否自动开启nginx
systemctl enable nginx
```

* 配置nginx的用户和默认访问目录

```shell
# 1. 将nginx加入到root这个组里面，让nginx也拥有root的权限
sudo usermod -a -G root nginx

# 2. 通过修改nginx的配置文件，来改变他的访问权限 /etc/nginx/(nginx的安装目录位置)
```

![](/deploy/20230628143215.png)



```shell
# 修改nginx的配置文件 nginx.conf
01. user root;  修改user,将原来的nginx修改成root,让nginx访问其他文件的时候拥有root的权限

02.  root         /usr/share/nginx/html; 将server下面的80端口下面的这句话注释掉，因为当访问公网ip的时候，默认访问的是80端口，在浏览器输入公网ip显示的页面就是这个root下面的这个页面，但是我们不希望访问这个页面，所以需要配置server下面location这个字段

03. 配置location选项 （配置两个选项后，当访问公网ip的时候，就会默认的访问配置好的地址）
	root /root/dist/; # 代表的是我要访问的文件夹路径
    index index.html; # 代表的是访问root指定路径下面的哪一个文件
```

![](/deploy/20230628144411.png)



* 修改配置保存完成，重启nginx

```shell
 # 重新启动 nginx
 systemctl restart nginx
```



### 2.2 自动化部署Jenkins

#### 2.2.1 安装Java环境(准备工作)

* 通过centos8 里面自带的软件包管理器`dnf` 搜索java软件包是否存在

```shell
# 搜索 软件包 java
dnf search java

# 安装最新版的 java软件包
dnf install java-17-openjdk
```

#### 2.2.2 安装Jenkins

* 因为`Jenkins`本身是没有在**dnf**的软件仓库包中的，所以我们需要`连接Jenkins仓库`：
  * `wget`是Linux中下载文件的一个工具，`-O`表示输出到某个文件夹并且命名为什么文件
  * `rpm`：全称为**The RPM Package Manage**，是Linux下一个软件包管理器

```shell
# 要安装jenkins 需要添加jenkins软件包的储存库
sudo wget -O /etc/yum.repos.d/jenkins.repo https://pkg.jenkins.io/redhat/jenkins.repo

# 导入GPG密钥以确保您的软件合法
sudo rpm --import https://pkg.jenkins.io/redhat/jenkins.io.key
```

* 编辑一下文件/etc/yum.repos.d/jenkins.repo

```shell
# 编辑此文件，查看里面是否有内容，有直接保存退出即可
vim /etc/yum.repos.d/jenkins.repo
```

* 安装Jenkins，由于在使用centos8 用命令`sudo dnf install jenkins`安装jenkins时报错如下：`Public key for jenkins-2.249.1-1.1.noarch.rpm is not installed`

```shell
# 强制安装Jenkins  --nogpgcheck
sudo dnf install --nogpgcheck jenkins
```

* 启动Jenkins：启动后由于Jenkins默认侦听端口是`8080` 所以需要在购买的云服务器里面=》安全组追加一个端口号为`8080`

```shell
sudo systemctl start jenkins

# 重启服务重新启动jenkins
sudo systemctl enable jenkins

# 查看启动状态
sudo systemctl status jenkins
```

* 安装相关的插件，当访问公网IP:8080 的时候就会出现以下内容

![](/deploy/20230628190503.png)

出现此界面，复制红色区域的路径，在服务器里面通过**cat**指令查看jenkins改生成的初始密码

```shell
cat /var/lib/jenkins/secrets/initialAdminPassword
```

![](/deploy/20230628192052.png)

* 出现以上界面代表依赖已经安装完成，接下来就是配置Jenkins。通过界面提示创建账号密码。创建完成后出现以下界面，就可以在下面的界面里面去做其他操作

![](/deploy/20230629154347.png)





#### 2.2.3 配置Jenkins

* 新建任务，在首页找到`新建Item` 或者是`create a job` ，新建任务，第一项就是填写任务名称(随便)，然后选择`Freestyle projech`自定义一个任务

![](/deploy/20230629154750.png)



* General选项，配置基本信息，填写代码仓库地址，下面的其他选项可选可不选配置

![](/deploy/20230629155855.png)



* 源码管理，在第一次配置的时候需要注意的是，因为服务器内还没有下载`git` 软件包，需要先通过dnf下载软件包

```shell
# 下载 git 软件包
dnf install git
```

![](/deploy/20230629160137.png)

在填写完仓库地址后，找到`Credentials`选项，此选项代表的是权限配置的地方，公开的仓库不需要配置，**私有**仓库需要配置访问权限，才能进行访问，根据访问私有仓库方式选择配置权限的**类型**

![](/deploy/20230629160515.png)



* 构建触发器：选择在什么时候触发构建，定时或者是其他条件，一下是**定时任务**配置规则

```shell
#每半小时构建一次OR每半小时检查一次远程代码分支，有更新则构建
H/30 * * * *

#每两小时构建一次OR每两小时检查一次远程代码分支，有更新则构建
H H/2 * * *

#每天凌晨两点定时构建
H 2 * * *

#每月15号执行构建
H H 15 * *

#工作日，上午9点整执行
H 9 * * 1-5

#每周1,3,5，从8:30开始，截止19:30，每4小时30分构建一次
H/30 8-20/4 * * 1,3,5
```

需要注意的是**轮询 scm**，他表示在构建之前每一次都先扫描一下代码是否有更新，如果有更新就执行，没有更新不执行，如果项目比较大，不建议使用，会增大系统的开销

![](/deploy/20230629161341.png)



* 构建环境：需要安装node环境，因为构建前端项目需要使用到node环境去构建，Jenkins里面并没有安装，所以在配置的时候需要手动的进行安装

![](/deploy/20230629161724.png)



回到Jenkins 首页，找到侧边栏**Manage Jenkins**选项，点击进入，选择**System Configuration**中的**Plugin**点击进入，然后通过下图安装node，然后重启**Jenkins**

![](/deploy/20230629162147.png)



安装完成后重启重新登录Jenkins，找到首页找到**系统配置**选项，找到第一行**System Configuration**中的全局工具配置，滑到最后找到node，并且新增node，选择需要的node版本，保存即可

![](/deploy/20230629162603.png)



再次回到Jenkins任务配置页面，找到构建触发器，选择已经安装好的node



* Build Steps: 在构建的时候需要执行的指令并选择执行shell

```shell
pwd
node -v
npm -v

npm install 
npm run build

pwd

echo '构建成功'

ls

# 删除/root/dist文件夹里所有的内容
rm -rf /root/dist/* 

cp -rf ./dist/* /root/dist/
```

![](/deploy/20230629163446.png)

#### 2.2.4 配置Jenkins访问文件权限

* 第一种：找到Jenkins的配置文件，修改Jenkins访问权限


* 第二种：通过linux指令，将Jenkins 添加到 root 组里面

```shell
sudo usermod -a -G root jenkins
```

* 第三种：通过linux指令，将某一个文件的权限交给 Jenkins

```shell
chown -R jenkins  /xxx/xxx 

# 重启 Jenkins
systemctl restart jenkins
```

