module.exports = function(grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        uglify: {
            options: {
                banner: '/*! <%= pkg.name %> <%= grunt.template.today("dd-mm-yyyy") %> */\n'
            },
            build: {
                // 动态文件映射，
                // 当任务运行时会自动在 "src/bin/" 目录下查找 "**/*.js" 并构建文件映射，
                // 添加或删除文件时不需要更新 Gruntfile。
                files: [
                    {
                        expand: true,     // 启用动态扩展
                        /*cwd: 'js/',      // 源文件匹配都相对此目录*/
                        src: ['src/framework/angular-1.3.0.14/angular.min.js',
                            'src/framework/angular-1.3.0.14/angular-route.min.js',
                            'src/framework/angular-1.3.0.14/angular-resource.min.js',
                            'src/framework/jquery-1.9.1.js',
                            'src/framework/bootstrap/js/bootstrap.min.js',
                            '/socket.io/socket.io.js',
                            'src/public/javascripts/app1.js',
                            'src/public/javascripts/services1.js',
                            'src/public/javascripts/controllers1.js',
                            'src/public/javascripts/comb.js'
                        ], // 匹配模式
                        dest: 'dest/js/',   // 目标路径前缀
                        ext: '.min.js',   // 目标文件路径中文件的扩展名
                        extDot: 'first'   // 扩展名始于文件名的第一个点号
                    },
                ],
            }
        },
        cssmin: {
            options: {
                banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n',
            },
            build: {
                files: [{
                    expand: true,
                    /*cwd: 'css/',*/
                    src: ['src/public/stylesheets/*.css'],
                    dest: 'dest/css/',
                    ext: '.min.css',
                    extDot: 'first'
                }]
            }
        },
        concat: {
            options: {
                separator: ';'
            },
            allInOne: { //所有JS文件全部合并成一份文件
                src: [  /*  'dest/js/src/framework/angular-1.3.0.14/angular.min.js',
                    'dest/js/src/framework/angular-1.3.0.14/angular-route.min.js',
                    'dest/js/src/framework/angular-1.3.0.14/angular-resource.min.js',
                    'dest/js/src/framework/jquery-1.min.js',
                    'dest/js/src/framework/bootstrap/js/bootstrap.min.js',
                   'dest/js//socket.io/socket.io.min.js',*/
                   /*'dest/js/src/public/javascripts/app1.min.js',
                    'dest/js/src/public/jav ascripts/services1.min.js',
                    'dest/js/src/public/javascripts/controllers1.min.js'*/
                    'dest/js/src/public/javascripts/comb.min.js'
                ],
                dest: 'dest//built.js'
            }
        },
        watch: {
            javascript: {

                //files: ['app.js','src/public/**/*.js','src/routes/*.js','src/models/*.js'],
                files: ['app.js','src/public/**/*.js','src/routes/*.js','src/models/*.js'],
                /*tasks: ['concat:allInOne', 'uglify:buildsrc', 'uglify:buildrelease'],*/
                options: {
                    spawn: true,
                    interrupt: true,
                    livereload: "<%= connect.options.livereload %>"
                }
            },
            jade:{
                files:['src/views/*.jade'],
                options:{
                  livereload: "<%= connect.options.livereload %>"
                }
            },
            css:{
                files:['src/public/stylesheets/*.css'],
                options:{
                  livereload: "<%= connect.options.livereload %>"
                }
            },
        },
        nodemon:{
          dev:{
            script: 'app.js',
            options:{
              args:[],
              ignoredFiles:['README.md','node_modules/**','.DS_Store'],
              watchedExtensions:['js'],
              watchedFolders:['./'],
              debug:true,
              delayTime:1,
              env:{
                VCAP_APP_PORT:3005
              },
              cwd:__dirname,
            }
          }
        },
        connect: {
          options: {
            port: 9001,
            hostname: 'localhost',
            livereload: 35726
          },
        },
        concurrent:{
          tasks:['nodemon','watch'/*,'concat','uglify','cssmin'*/],
          options:{
            logConcurrentOutput:true
          }
        }

    });

    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-connect');
    grunt.loadNpmTasks('grunt-nodemon');
    grunt.loadNpmTasks('grunt-concurrent');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-cssmin');


    grunt.option('force',true)
    /*grunt.registerTask('default', ['concat','uglify','watch']);*/
    grunt.registerTask('default', ['concurrent']);
};
