'use strict';
module.exports = function(grunt) {

  require('time-grunt')(grunt);

  grunt.initConfig({
    jshint: {
      options: {
        jshintrc: '.jshintrc'
      },
      all: [
        'Gruntfile.js',
        'assets/js/*.js',
        '!assets/js/plugins/*.js',
        '!assets/js/scripts.min.js'
      ]
    },
    recess: {
      dist: {
        options: {
          compile: true,
          compress: true
        },
        files: {
          'assets/css/main.min.css': [
            '_assets/less/main.less'
          ]
        }
      }
    },
    uglify: {
      dist: {
        files: {
          'assets/js/scripts.min.js': [
            '_assets/js/plugins/*.js',
            '_assets/js/*.js'
          ]
        }
      }
    },
    imagemin: {
      dist: {
        options: {
          optimizationLevel: 7,
          progressive: true
        },
        files: [{
          expand: true,
          cwd: 'images/',
          src: '{,*/}*.{png,jpg,jpeg}',
          dest: 'images/'
        }]
      }
    },
    svgmin: {
      dist: {
        files: [{
          expand: true,
          cwd: 'images/',
          src: '{,*/}*.svg',
          dest: 'images/'
        }]
      }
    },
    watch: {
      less: {
        files: [
          'assets/less/*.less'
        ],
        tasks: ['recess']
      },
      js: {
        files: [
          '<%= jshint.all %>'
        ],
        tasks: ['jshint','uglify']
      },
      jekyll: {
        files: [
          '_posts/*.md',
          '*.md',
        ],
        tasks: ['jekyll']
      }
    },
    clean: {
      dist: [
        'assets',
        'images',
        '_site',
        'favicon.*',
      ],
      tmp: [
        'images/tmp',
      ]
    },
    responsive_images: {
      options: {
        engine: 'gm',
      },
      icons: {
        options: {
            sizes: [
              {
                name: '200x200',
                width: '200',
                height: '200',
                aspectRatio: 'true',
              },
              {
                name: '144x144',
                width: '144',
                height: '144',
                aspectRatio: 'true',
              },
              {
                name: '114x114',
                width: '114',
                height: '114',
                aspectRatio: 'true',
              },
              {
                name: '72x72',
                width: '72',
                height: '72',
                aspectRatio: 'true',
              },
              {
                name: '57x57',
                width: '57',
                height: '57',
                aspectRatio: 'true',
              },
              {
                name: '32x32',
                width: '32',
                height: '32',
                aspectRatio: 'true',
              }
            ]
        },
        files: [{
          expand: true,
          cwd: '_images/',
          src: ['kamen.png'],
          dest: 'images/tmp/',
        }]
      },
      posts: {
        options: {
          sizes: [
            {
              name: 'small',
              width: '480',
              height: '480',
              aspectRatio: 'true',
            },
            {
              name: 'large',
              width: '1024',
              height: '1024',
              aspectRatio: 'true',
            },
          ]
        },
        files: [{
          expand: true,
          cwd: '_images/posts/',
          src: ['**/*.jpg'],
          dest: 'images/',
        }]
      }
    },
    copy: {
      assets: {
        files: [
          {
            expand: true,
            cwd: '_assets/js/vendor/',
            src: ['*.js'],
            dest: 'assets/js/vendor/'
          },
          {
            expand: true,
            cwd: '_assets/fonts/',
            src: ['*'],
            dest: 'assets/fonts/'
          },
        ]
      },
      icons: {
        files: [
          {
            'images/default-thumb.png': ['images/tmp/kamen-200x200.png'],
            'images/bio-photo.png': ['_images/kamen.png'],
            'favicon.png': ['images/tmp/kamen-32x32.png'],
            'favicon.ico': ['images/tmp/kamen-32x32.png'],
          },
          {
            expand: true,
            cwd: 'images/tmp/',
            src: ['kamen-*.png'],
            dest: 'images/',
            rename: function(dest, src) {
              src = src.replace('kamen', 'apple-touch-icon');
              src = src.replace('.png', '-precomposed.png');
              return dest + src;
            }
          }
        ]
      }
    },
    connect: {
      server: {
        options: {
          port: 4000,
          base: './_site',
        }
      }
    },
    jekyll: {
      generate: {
      }
    }
  });

  // Load tasks
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-imagemin');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-recess');
  grunt.loadNpmTasks('grunt-svgmin');
  grunt.loadNpmTasks('grunt-responsive-images');
  grunt.loadNpmTasks('grunt-jekyll');

  grunt.registerTask('build', [
    'clean',
    'recess',
    'uglify',
    'responsive_images',
    'copy',
    'imagemin',
    'svgmin',
    'clean:tmp',
    'jekyll',
  ]);

  grunt.registerTask('quick_build', [
    'recess',
    'uglify',
    'responsive_images:icons',
    'copy',
    'imagemin',
    'svgmin',
    'clean:tmp',
    'jekyll',
  ]);

  grunt.registerTask('serve', [
    'connect',
    'watch',
  ]);

};