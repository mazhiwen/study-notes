git reset --hard HEAD : 将stage area中未提交的file回滚到之前的commit状态（这个指令可以解决你的问题）
git clean -d -f 删除未跟踪的目录和文件

## tag

git tag ：tag列表  
git tag -a v1.0.3 -m "let关键"  :添加tag
git tag -d v1.0.3 :删除本地tag
git push origin :refs/tags/v1.0.2 :删除远程tag



删除远程分支 git push origin --delete <BranchName>



## 放弃更改

1.放弃未commit文件 
git checkout file
git checkout .


2.放弃已经commit文件
git reset --hard  commitid
git checkout . && git clean -df