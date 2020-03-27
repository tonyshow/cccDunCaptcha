配置环境变量

mac  
  vi ~/.bash_profile
  添加下面三行
  GRADLE_HOME=/Users/Apple/Desktop/soft/gradle/gradle-4.6 
  export GRADLE_HOME
  export PATH=$PATH:$GRADLE_HOME/bin
  保存退出 
  执行 source ~/.bash_profile

  检查是否安装成功
  执行 gradle -version


gradle assemblerelease
常见问题  
  1、Android Studio编译失败提示"It is currently in use by another Gradle instance"异常处理
    参考地址：https://www.jianshu.com/p/5e29f99577df
    执行 find ~/.gradle -type f -name "*.lock" | while read f; do rm $f; done