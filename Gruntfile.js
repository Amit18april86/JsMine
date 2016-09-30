module.exports = function (grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        jasmine:{
            all:{
                src:['src/appFiles/**/*.js'],
                options:{
                    specs:['spec/**/*Spec.js'],
                    vendor:[]
                }
            },
            istanbul: {
                src: '<%= jasmine.all.src %>',
                options: {
                    vendor: '<%= jasmine.all.options.vendor %>',
                    specs: '<%= jasmine.all.options.specs %>',
                    template: require('grunt-template-jasmine-istanbul'),
                    templateOptions: {
                        coverage: 'coverage/json/coverage.json',
                        report: [
                            {type: 'html', options: {dir: 'coverage/html'}},
                            {type: 'text-summary'}
                        ]
                    }
                }
            }
        },
        watch:{
            js:{
                files:[
                    'src/**/*.js',
                    'spec/**/*Spec.js'
                ],
                tasks:['jasmine:all']
            }
        },
        open : {
            dev : {
                path: 'coverage/html/index.html',
                app: 'Chrome'
            },
            cover:{
                path: 'report/index.html',
                app: 'Chrome'
            }
        },
        exec: {
            cmd:'node src/compiler/compiler.js src/appFiles/HelloWorld.js',
            jasmineInit:'jasmine init',
            plato:'plato -r -d report src/appFiles/**/*.js'
        },
        express: {
            all: {
                options: {
                    bases: ['C:\\inetpub\\wwwroot\\test'],
                    port: 8080,
                    hostname: "0.0.0.0",
                    livereload: true
                }
            }
        },
        nodemon: {
            dev: {
                script: 'server.js'
            }
        },
        notify: {
            task_name: {
                options: {
                    // Task-specific options go here.
                }
            },
            watch: {
                options: {
                    title: 'Task Complete',  // optional
                    message: 'SASS and Uglify finished running' //required
                }
            },
            server: {
                options: {
                    message: 'Test cases executed successfully!'
                }
            }
        }
    });
    grunt.loadNpmTasks('grunt-contrib-jasmine');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-exec');
    grunt.loadNpmTasks('grunt-open');
    grunt.loadNpmTasks('grunt-express');
    grunt.loadNpmTasks('grunt-nodemon');
    grunt.loadNpmTasks('grunt-notify');

    grunt.registerTask('start',function(){
        //grunt.util.spawn({
        //    cmd:'node',
        //    args:['src/index.js','src/HelloWorld.js']
        //});
    });
    //'open'
    grunt.registerTask('default',['start','exec:jasmineInit','exec:cmd','exec:plato','jasmine','express','notify:server','open','nodemon']);
};