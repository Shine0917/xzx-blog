#该脚本执行自动打包程序，然后将打包内容同步到远程仓库
#!/usr/bin/env sh

# 确保脚本抛出遇到的错误
set -e

# 生成静态文件
npm run docs:build

# 进入生成的文件夹
cd ./docs/.vuepress/dist
#cd dist

# 如果是发布到自定义域名
# echo 'www.example.com' > CNAME

git init
git add -A
git commit -m 'deploy'

# 如果发布到 https://<USERNAME>.github.io  USERNAME=你的用户名
# git push -f git@github.com:susan007/susan007.github.io.git master

git push -f git@github.com:XiaoZhaoxiaaa/XiaoZhaoxiaaa.github.io.git master
# 如果发布到 https://<USERNAME>.github.io/<REPO>  REPO=github上的项目
# git push -f git@github.com:susan007/my-blog.git master:gh-pages
# git push -f git@github.com:XiaoZhaoxiaaa/xzx-blog.git master:gh-pages

cd -
# 把本工程代码推到码云上，是本工程，不是打包好的那些
# git pull origin master
# git add .
# git commit -m '提交本地更新'
# git push origin master
# cd -