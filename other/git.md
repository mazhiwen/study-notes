# git

<https://juejin.cn/post/6844903699915997192>

## 概念

[这才是真正的Git——Git内部原理](https://juejin.cn/post/6844904019245137927)

Git是分布式系统

## tag

```sh
git tag ：tag列表  
git tag -a v1.0.3 -m "let关键"  :添加tag
# 推送所有tag
git push origin --tags
git push origin [tagname]
git tag -d v1.0.3 :删除本地tag
git push origin :refs/tags/v1.0.2 :删除远程tag
```

## 强制推送远程

git push origin --force

## 删除远程分支

删除远程分支 git push origin --delete <BranchName>

## 放弃更改

1.放弃未commit文件

git checkout file
git checkout .

2.放弃已
经commit文件

git reset --hard HEAD : 将stage area中未提交的file回滚到之前的commit状态（这个指令可以解决你的问题）
git checkout . && git clean -df

git clean
-d 删除未被添加到git的路径中的文件
-f 强制运行
-x 删除忽略文件已经对git来说 不识别的文件

清楚git缓存
git rm -r --cached .

忽略大小写 windows git
git config core.ignorecase false

3. 放弃git add
git reset

## reset远程commit

```
1. 通过找到想要退回到的commit_id

$ git log

2. 本地回到上一个commit_id

$ git reset --hard <commit_id>

3. 推送到服务器，一定要加 --force 参数

$ git push origin HEAD:master --force
```

## 配置origin

```
①   cd ~/.ssh/    【如果没有对应的文件夹，则执行  mkdir  ./.ssh】

②  git config --global user.name "xb12369"

③  git config --global user.email "1234@qq.com"

④  ssh-keygen -t rsa -C "81245995@qq.com"

```

~/ssh/config文件:

```sh
#git.domain.com
Host git.wolaidai.com
IdentityFile ~/.ssh/id_rsa


#github.com
Host github.com
  HostName github.com
  IdentityFile ~/.ssh/github_mazhiwen


Host github.com
  HostName ssh.github.com
  User 81245995@qq.com
  IdentityFile ~/.ssh/id_rsa_personal
  Port 443


```

## stash

git stash    加save 可以保存stash 加备注:git stash save "dd"

git stash pop  弹出最近保存，盏

git stash apply stash@{1}

git stash drop stash@{1} 移除某个list

git stash clear 清空list

git stash show 查看差异

## 大小写

git默认忽略大小写

git config core.ignorecase false  区分大小写

## 撤销commit

git reset --soft HEAD～1

## 强制远程覆盖本地

git fetch --all &&  git reset --hard origin/master && git pull

## git pull 和 git fetch 的区别

git fetch 只是将远程仓库的变化下载下来，并没有和本地分支合并。

git pull 会将远程仓库的变化下载下来，并和当前分支合并。

## git rebase 和 git merge 的区别

git merge 和 git rebase 都是用于分支合并，关键在 commit 记录的处理上不同。

git merge 会新建一个新的 commit 对象，然后两个分支以前的 commit 记录都指向这个新 commit 记录。这种方法会
保留之前每个分支的 commit 历史。

git rebase 会先找到两个分支的第一个共同的 commit 祖先记录，然后将提取当前分支这之后的所有 commit 记录，然后
将这个 commit 记录添加到目标分支的最新提交后面。经过这个合并后，两个分支合并后的 commit 记录就变为了线性的记
录了。

## 每次commit，Git储存的是全新的文件快照还是储存文件的变更部分？

由上面的例子我们可以看到，Git储存的是全新的文件快照，而不是文件的变更记录。

也就是说，就算你只是在文件中添加一行，Git也会新建一个全新的blob object。那这样子是不是很浪费空间呢?这其实是Git在空间和时间上的一个取舍，思考一下你要checkout一个commit，或对比两个commit之间的差异。如果Git储存的是问卷的变更部分，那么为了拿到一个commit的内容，Git都只能从第一个commit开始，然后一直计算变更，直到目标commit，这会花费很长时间。而相反，Git采用的储存全新文件快照的方法能使这个操作变得很快，直接从快照里面拿取内容就行了。

当然，在涉及网络传输或者Git仓库真的体积很大的时候，Git会有垃圾回收机制gc，不仅会清除无用的object，还会把已有的相似object打包压缩。

## git merge

从指定分支合并到当前分支

git merge --abort

## git删除未跟踪文件

删除 untracked files:

git clean -f

连 untracked 的目录也一起删掉:

git clean -fd

连 gitignore 的untrack 文件/目录也一起删掉 （慎用，一般这个是用来删掉编译出来的 .o之类的文件用的）:

git clean -xfd

在用上述 git clean 前，墙裂建议加上 -n 参数来先看看会删掉哪些文件，防止重要文件被误删:

git clean -nxfd
git clean -nf
git clean -nfd

## cherry-pick

<http://www.ruanyifeng.com/blog/2020/04/git-cherry-pick.html>

## 国内github加速

<https://github.com/chenxuhua/issues-blog/issues/3>

查dns解析:

<https://ipaddress.com/website/github.com>

github.com
assets-cdn.github.com
github.global.ssl.fastly.net

sudo vi /etc/hosts

185.199.108.153 assets-cdn.github.com
