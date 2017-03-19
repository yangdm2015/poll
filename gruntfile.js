module.exports = function(grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        uglify: {
            options: {
                banner: '/*! <%= pkg.name %> <%= grunt.template.today("dd-mm-yyyy") %> */\n'
            },
            build: {
                files: [
                    {
                        expand: true,     // 启用动态扩展
                        src: ['src/client/public/dest/built.js'
                        ], // 匹配模式
                        //dest: 'min/',   // 目标路径前缀
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
                /*files: [{
                    expand: true,
                    src: ['src/client/public/stylesheets/poll.css','src/client/public/stylesheets/normalize.css'],
                    dest: 'dest/css/',
                    ext: '.min.css',
                    'output.css':['dest/css/src/client/public/stylesheets/poll.css','dest/css/src/client/public/stylesheets/normalize.css'],
                    extDot: 'first'
                }]*/
                files: [{
                    expand: true,
                    src: 'src/client/dest/built.css',
                    //dest: 'min/',
                    ext: '.min.css',
                    extDot: 'first'
                }]
            }
        },
        concat: {
            options: {
                separator: ';'
            },
            concatjs: { //所有JS文件全部合并成一份文件
                src: [
                    'src/client/module/abt/angular-animate.min.js',
                    'src/client/module/angular-route.min.js',
                    'src/client/routercomponent/clientroute.js',
                    'src/client/pollcomponent/pollcontrollers.js',
                    'src/client/usercomponent/usercontroller.js',
                    'src/client/usercomponent/userservices.js',
                    'src/client/usercomponent/pollservices.js'
                ],
                dest: 'src/client/dest/built.js'
            },
            concatcss:{
                src:['src/client/module/bootstrap/css/bootstrap.min.css','src/client/routercomponent/stylesheets/polles.css'],
                dest: 'src/client/dest/built.css'
            }
        },
        watch: {
            javascript: {

                //files: ['app.js','src/public/**/*.js','src/routes/*.js','src/models/*.js'],
                files: ['app.js','src/client/**/*.js','src/client/*.js','src/client/*.js'],
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
                files:['src/client/routercomponent/stylesheets/*.css'],
                options:{
                  livereload: "<%= connect.options.livereload %>"
                }
            },
            less: {
                files: ['*src/client/routercomponent/stylesheets/*.less'],
                tasks: ['less']
            }
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
        less: {
            compile: {
                files: {
                    'src/client/routercomponent/stylesheets/polles.css': 'src/client/routercomponent/stylesheets/polles.less'
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
          tasks:['less','nodemon','watch','concat','uglify','cssmin'],
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
    grunt.loadNpmTasks('grunt-contrib-less');


    grunt.option('force',true)
    /*grunt.registerTask('default', ['concat','uglify','watch']);*/
    grunt.registerTask('default', ['concurrent']);
};
