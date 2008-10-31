require 'rubygems'
require 'rake'
require 'echoe'

Echoe.new('dash-generators', '0.1.8') do |p|
  p.project        = "dashgenerators"
  p.summary        = "A collection of useful generator scripts for Rails."
  p.description    = "A collection of useful generator scripts for Rails."
  p.url            = "http://github.com/jhnsntmthy/dash-generators"
  p.author         = 'Timothy Johnson, previously Ryan Bates'
  p.email          = "found (at) foundinteractive (dot) com"
  p.ignore_pattern = ["script/*", "*.gemspec"]
  p.development_dependencies = []
end

Dir["#{File.dirname(__FILE__)}/tasks/*.rake"].sort.each { |ext| load ext }
