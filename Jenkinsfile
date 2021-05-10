pipeline {
  agent any
  stages {
    stage('清除旧数据+打包') {
      steps {
        echo '开始打包'
        sh 'npm install && npm run build:stage'
        echo '打包成功'
      }
    }

    stage('【测试环境】部署应用') {
      when {
        expression {
          params.env == '测试环境'
        }

      }
      steps {
        echo '开始部署'
        sshagent(credentials: ['84-ssh']) {
          sh "ssh -v -o StrictHostKeyChecking=no ${TARGET_HOST_TEST} uname -a"
          sh "ssh -o StrictHostKeyChecking=no ${TARGET_HOST_TEST} \"uname;ps -ef | egrep ${params.moduleName}.*.jar | egrep -v grep | awk '{print \\\$2}' | xargs -r sudo kill -9\""
          sh "ssh -o StrictHostKeyChecking=no ${TARGET_HOST_TEST} \"cd ${TARGET_DIR_SERVER} && ./backup.sh\""
          sh "cd target && scp *.jar ${TARGET_HOST_TEST}:${TARGET_DIR_SERVER}"
          sh "cd src/main/webapp && scp -r static/ ${TARGET_HOST_TEST}:${TARGET_DIR_SERVER}"
          sh "cd src/main/webapp && scp -r template/ ${TARGET_HOST_TEST}:${TARGET_DIR_SERVER}"
          sh "ssh -o StrictHostKeyChecking=no ${TARGET_HOST_TEST} \"cd ${TARGET_DIR_SERVER}; nohup /usr/bin/java -jar ${params.moduleName}-${APP_VERSION}.jar --spring.profiles.active=test >/dev/null 2>&1 &\""
          sh 'echo "部署成功~"'
        }

        echo '部署成功'
      }
    }

  }
  environment {
    TARGET_HOST_TEST = 'root@1.15.145.63'
    TARGET_DIR_SERVER = '/home/apps/ny-lottery'
    APP_VERSION = '1.0.0'
  }
  parameters {
    choice(description: '你需要选择哪个环境进行部署 ?', name: 'env', choices: ['测试环境'])
    choice(description: '你需要选择哪个模块进行构建 ?', name: 'moduleName', choices: ['ny-lottery'])
  }
}