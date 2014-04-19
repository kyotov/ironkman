'use strict';
module.exports = function(grunt) {

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
            'assets/less/main.less'
          ]
        }
      }
    },
    uglify: {
      dist: {
        files: {
          'assets/js/scripts.min.js': [
            'assets/js/plugins/*.js',
            'assets/js/_*.js'
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
      }
    },
    clean: {
      dist: [
        'assets/css/main.min.css',
        'assets/js/scripts.min.js'
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
				cwd: 'images-src/',
				src: ['kamen.png'],
				dest: 'images-gen/',
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
				cwd: 'images-src/posts/',
				src: ['**/*.jpg'],
				dest: 'images/',
			}]
		}
  	},
  	copy: {
  		options: {

  		},
  		icons: {
	  		files: [
	  			{
	  				'images/default-thumb.png': ['images-gen/kamen-200x200.png'],
	  				'images/bio-photo.png': ['images-src/kamen.png'],
	  				'favicon.png': ['images-gen/kamen-32x32.png'],
	  				'favicon.ico': ['images-gen/kamen-32x32.png'],
	  			},
	  			{
	  				expand: true,
	  				cwd: 'images-gen',
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
				//keepalive: true,
			}
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

  // Register tasks
  grunt.registerTask('default', [
    'clean',
    'recess',
    'uglify',
    'imagemin',
    'svgmin'
  ]);
  grunt.registerTask('dev', [
    'watch'
  ]);

};