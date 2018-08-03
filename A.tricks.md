# git
* git branch -f <branch> <commit> 移动分支到某一commit  
* git cherr-pick <commit> <commit> 指定commit添加到本分支上  
* git reset HEAD^ 回到上一commit点 （本次commit仍存在）  
* git revert HEAD 新建一commit与本次commit相反 并提交 达到抵消本次commit的目的 （注意是HEAD不是HEAD^）  
