module.exports = function(grunt) {
    grunt.initConfig({
        browserify: {
            dev: {
                src: ['src/scripts/toast.module.js'],
                dest: 'dist/angular-simple-toast.js'
            }
        },
        sass: {
            dist: {
                files: {
                    'dist/angular-simple-toast.css': 'src/styles/angular-simple-toast.scss'
                }
            }
        },
        uglify: {
            prod: {
                options: { mangle: true, compress: true },
                src: 'dist/angular-simple-toast.js',
                dest: 'dist/angular-simple-toast.min.js'
            }
        },
        cssmin: {
            target: {
                files: {
                    'dist/angular-simple-toast.min.css': ['dist/angular-simple-toast.css']
                }
            }
        },
        watch: {
            scripts: {
                files: ['src/**/*'],
                tasks: ['browserify', 'sass'],
                options: {
                    spawn: false
                }
            }
        }
    });

    grunt.loadNpmTasks('grunt-browserify');
    grunt.loadNpmTasks('grunt-sass');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.registerTask('default', ['browserify', 'sass', 'uglify', 'cssmin', 'watch']);
};
