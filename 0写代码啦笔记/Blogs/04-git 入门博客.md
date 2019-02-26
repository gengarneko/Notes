# 章 4 命令行 - 作业 2

基础的三个命令：

- git init
- git add
- git commit -v



## git init

创建一个空的 Git 仓库或重新初始化一个现有仓库。

其实就是通过创建版本库（.git）文件，告知 git 此文件夹已经处于 git 的版本控制之下。

git 获得目标文件夹的所有权，对其进行 add、commit、pull 等一些列操作。

```bash
# 打开文件夹
cd test
# 初始化
git init
# 查看是否有 .git 文件夹
ls -a
```



## git add

将修改的文件提交到 **暂存区**，此时，暂存库（stage）中会存有之前 add 的文件。

执行 git add 命令的时候，通过hash函数算出文件名对应的sha-1值，这个值是一个32位的16进制数。

git 会取这个值的前两位作为文件夹名在 .git/objects 文件夹中创建一个文件夹，取值的后30位作为文件名，在.git/objects/文件夹中创建一个文件，git会将原文件内容通过一定的压缩保存在这个文件中。

```bash
# 改动文件
start test.txt
# 查看变动（文件前？）
git status -sb
# 添加单个文件
git add test.txt
# 添加所有改动文件
git add .
# 查看变动（文件前 A）
git status -sb
```



## git commit -m

上面我们将文件添加到暂存区，现在我们使用 git commit -m 将文件提交到缓存区。

`git commit --message <msg>` msg为本次提交操作的注释信息。

在将文件 `git add <file>` 操作后，我在进行`git commit <file>`操作时，事实上是先对`add` 进 `Staged Snapshot` 来的文件进行拍照（快照），然后提交给 `Commit History`。

```bash
# 查看变动（文件前红 A）
git status -sb
# 提交所有改动文件到缓存区
git commit -m "test" 
# 查看变动（文件前绿 A）
git status -sb
```

