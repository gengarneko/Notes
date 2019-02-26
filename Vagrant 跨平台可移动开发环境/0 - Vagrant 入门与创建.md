# Vagrant 入门

简单地说，Vagrant让我们可以通过代码的方式快速地、可重复地创建针对不同虚拟环境的虚拟机，包括Virtualbox、AWS、Docker等。它使得我们可以一次性地、自动创建多个环境相同的虚拟机，对于软件开发和测试尤其有用。本文我们将以Virtualbox为例，看看Vagrant的基本使用。



###  快速入门

---

首先需要创建一个目录用于存放 Vagrantfile 文件以及 Vagrant 在工作中的数据：

```shell
mkdir my-vagrant-project
cdr my-vagrant-project
```

然后初始化 Vagrant 工程：

```shell
vagrant init ubuntu/trusty64
```

该命令会在当前目录下创建 Vagrantfile，并且制定所使用的 box 为 ubuntu/trusty64，该 box 由 Hashicorp 官网提供。此时，Vagrant 发现 box 的名字的格式为 “用户名/box 名”，则会使用 “https://atlas.hashicorp.com/用户名/box名” 来下载该 box。

**对于非官网提供的 box**，可以通过如下命令创建：

```shell
vagrant init my-box https://boxes.company.com/my.box
```

其中，my-box 为 box 的名字，链接为下载地址。                           

接下就可以启动虚拟机了：                                                          

```shell
vagrant up
```



此时，Vagrant 会先从官网上下载对应的 box，然后启动虚拟机。在默认情况下，Virtualbox 将作为 provider，当然你也可以使用其他 provider，比如下面一个命令气动一个 hyperv 虚拟机：

```shell
vagrant up --provider hyperv
```

​                                 

登录到虚拟机：

```shell
vagrant ssh
```

此时，Vagrant 将使用默认的用户 vagrant 以及预设的 SSH 公钥密钥键值对直接登录虚拟机。

关闭虚拟机：

```
vagrant halt
```

删除虚拟机：

```shell
vagrant destory
```

请注意，vagrant destroy 只会删除虚拟机本身，也即你在 Virtualbox 将看不到该虚拟机，但是不会删除该虚拟机所使用的 box。

Vagrant 还会在 Vagrantfile 所在的统计目录下面创建一个 .vagrant 隐藏文件夹，该文件夹包含了在本地运行虚拟机的一些信息。如果使用了代码库管理（比如 Git），这个 .vagrant 文件应该被忽略掉，也就是放进 ignore 文件当中去。                                                                                                                                                                                 



### 添加和查看所下载的 box

---

Vagrant 会将所下载的 box 保存到 ~/.vagrant.d/boxes 目录下，除了在执行 “vagrant up” 时 Vagrant 会下载 box 外，你也可以单独下载 box 到本地：

```shell
vagrant box add ubuntu/trusty64
```

这将从官网上下载指定的 box。

我们也可以指定一个链接：

```shell
vagrant box add --name mybox http://someurl.com/ubuntu.box
```

这里的 mybox 是一个逻辑名字，你可以用该名字来设置 Vagrantfile 的 “config.vm.box”。

你可以在任何时候向 vagrant 中添加新的 box 以备用，在执行 vagrant up 时，Vagrant 首先检查本地是否有存在所需要的 box，如果存在，则直接使用。



列出本地所有的 box：

```shell
vagrant box list
```

删除某个 box：

```
vagrant box remove box-name
```



### 端口转发（port forwarding）                                                                                                                                                                                 

---

在默认情况下，Vagrant 创建的  Virtualbox 虚拟机使用的是 NAT 网络类型，即外界不能直接访问你的虚拟机，就连 Host 机器也不行。此时，如果你在虚拟机中启动一个 Tomcat 来部署网站的测试环境，而又想外界能够访问的话，需要使用端口转发：

```
Vagrant.configure("2") do |config|
  config.vm.network "forwarded_port", guest: 8080, host: 8888
end
```

以上代码将 Host 机的 8888 端口转发到了虚拟机的 8080 端口，这样便可以通过 Host 机上访问 http://localhost:8888 来访问虚拟机的 Tomcat 了。对于 Virtualbox 来说，只有 NAT 类型的网络类型支持端口转发，这也是为什么 vagrant 创建的 Virtualbox 虚拟机默认都有一个支持 NAT 的虚拟网卡，原因就是要能够支持 vagrant 级别的端口转发。另外，Vagrant 在第一次尝试连接虚拟机的时候也会使用 NAT。



### 共享文件夹

---

在默认的情况下，Vagrant 所创建的虚拟机已经为我们创建了一个共享文件夹，在虚拟上是 /home/vagrant 目录，在 Host 机上时 Vagrantfile 所在目录，当然你也可以额外添加另外的共享文件夹：

```
Vagrant.configure("2") do |config|
  config.vm.synced_folder "src/", "/srv/website"
end
```

第一个参数为 Host 机上的目录，第二个目录为虚拟机上的目录。



### Provison                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   

---

简单的说，Provision 即通过使用某些工具自动地、批量地为机器安装软件以及配置系统，它省去了人工安装和配置系统的重复性和易错性，当然还享受了计算机与生俱来的速度。vagrant 提供了多种方式对虚拟机进行 Provision，包括 Shell、Chef、Puppet 和 Ansible 等。以 Shell 为例，既可以通过直接在 Vagrantfile 中编写 Shell 脚本的方式，也可以通过引用外部 Shell 文件的方式。

**直接在 Vagrantfile 中编写 Shell 脚本**，可以通过 “inline” 指定脚本内容：

```
Vagrant.configure("2") do |config|
  # ... other configuration

  config.vm.provision "shell", inline: "echo hello"
end
```

**通过引入外部脚本的方式**：

```
Vagrant.configure("2") do |config|
  config.vm.provision "shell", path: "script.sh"
end
```



在使用 Ansible 时，有两种方式：

1. 在 Host 机器上安装 Ansible
2. 采用 Ansible Local 的方式，即在虚拟机上安装 Ansible

对于第一种方式，我们需要保证机器上已经安装好了 Ansible：

```
Vagrant.configure("2") do |config|

  #
  # Run Ansible from the Vagrant Host
  #
  config.vm.provision "ansible" do |ansible|
    ansible.playbook = "playbook.yml"
  end

end
```

使用第二种方式时，Vagrant 会首先检查 box 中是否应安装了 Ansible，如果没有，先进行安装 Ansible 到虚拟机上，在运行 Provison：

```
Vagrant.configure("2") do |config|
  #
  # Run Ansible from the Vagrant VM
  #
  config.vm.provision "ansible_local" do |ansible|
    ansible.playbook = "playbook.yml"
  end
  
end
```





# 创建自己的 Vagrant box