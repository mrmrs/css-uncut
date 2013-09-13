require "rubygems"
require 'rake'

desc "Start Sass so that is compiles to css upon file save"
task :sass do
  system "sass --watch i.scss"
end # task :sass

desc "Start Sass so that is compiles to css upon file save"
task :size do
  system "sass i.scss:i.css --style compressed && find . -name 'i.css' -exec ls -lh {} \+ >> file-size-diff.txt && gzip -9 i.css -c >> file-size-diff.txt"
end # task :minify
