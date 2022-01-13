# vinaya2 for Accelon2017
> #### 聲明：原著者是祥因法師！原本用於Accelon3的XML檔  
  
>> 展示網址 https://adbdao.github.io/vinaya2/  
[單機版](http://nanputo.myweb.hinet.net/bhscjeq20170426.zip)  
  
>> 最新下載資訊 http://adbdao.blogspot.com/2018/07/blog-post.html  
  
---  
#### Git常用指令  
* 刪除上一次推送。出問題時，使用此命令  
git remote rm origin  
  
* 一次進行：加入與提交  
git commit -a -m "first commit"  
或者  
git commit -am "first commit"  
  
* 將這次提交，合併到上一次提交  
git commit --amend --no-edit  
合并上一次提交（用于反复修改）  
git commit --amend -m 'xxx'  
  
---  
#### Git基本起始指令  
1. echo "# vinaya2" >> README.md  
git init  
git add README.md  
git commit -m "first commit"  
git remote add origin https://github.com/adbdao/vinaya2.git  
git push -u origin master  
  
2. 直接拉取  
git clone https://github.com/adbdao/vinaya2.git  
git remote add origin https://github.com/adbdao/vinaya2.git  
git push -u origin master  