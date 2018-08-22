git reset --hard HEAD : 将stage area中未提交的file回滚到之前的commit状态（这个指令可以解决你的问题）
git clean -d -f 删除未跟踪的目录和文件