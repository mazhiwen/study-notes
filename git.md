
## tag

git tag ：tag列表  
git tag -a v1.0.3 -m "let关键"  :添加tag
git tag -d v1.0.3 :删除本地tag
git push origin :refs/tags/v1.0.2 :删除远程tag



### 分支

删除远程分支 git push origin --delete <BranchName>



### 放弃更改

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


### reset远程commit

1.通过找到想要退回到的commit_id
$ git log
 2.本地回到上一个commit_id
$ git reset --hard <commit_id>
 3.推送到服务器，一定要加 --force 参数
$ git push origin HEAD:master --force

### 配置origin

~/ssh/config文件:

```sh
#git.domain.com
Host git.wolaidai.com
IdentityFile ~/.ssh/id_rsa


#github.com
Host github.com
IdentityFile ~/.ssh/github_mazhiwen 




```



### stash
git stash   , 加save 可以保存stash 加备注  
git stash pop  弹出最近保存，盏
git stash apply stash@{1}
git stash drop stash@{1} 移除某个list
git stash clear 清空list
git stash show 查看差异


### 大小写
git config core.ignorecase true  忽略大小写