class DashLayoutGenerator < Rails::Generator::Base
  def initialize(runtime_args, runtime_options = {})
    super
    @name = @args.first || 'application'
  end
  
  def manifest
    record do |m|
      m.directory 'app/views/layouts'
      m.directory 'public/stylesheets'
      m.directory 'app/helpers'
      m.directory 'app/views/shared'
      
      if options[:haml]
        m.directory 'public/stylesheets/sass'
        m.template "layout.html.haml", "app/views/layouts/#{file_name}.html.haml"
        m.file     "stylesheets/stylesheet.sass",  "public/stylesheets/sass/#{file_name}.sass"
      else
        m.template "layout.html.erb", "app/views/layouts/#{file_name}.html.erb"
        m.template "_header.html.erb", "app/views/layouts/_header.html.erb"
        m.file     "_footer.html.erb", "app/views/layouts/_footer.html.erb"
        m.file     "_tabs.html.erb", "app/views/layouts/_tabs.html.erb"
        m.file     "stylesheets/reset.css",  "public/stylesheets/reset.css"
        m.file     "stylesheets/ie.css",  "public/stylesheets/ie.css"
        m.file     "stylesheets/dashboard.css",  "public/stylesheets/dashboard.css"
        m.file     "stylesheets/navigation_tabs.css",  "public/stylesheets/navigation_tabs.css"
        m.file     "stylesheets/navigation_icons.css",  "public/stylesheets/navigation_icons.css"
        m.file     "stylesheets/forms_tables.css",  "public/stylesheets/forms_tables.css"
        m.file     "javascripts/jquery-1.2.6.min.js", "public/javascripts/jquery-1.2.6.min.js"
        m.file     "javascripts/jquery-ui.js", "public/javascripts/jquery-ui.js"
        m.file     "javascripts/jquery-fx.js", "public/javascripts/jquery-fx.js"
        m.file     "javascripts/jquery-pages.js", "public/javascripts/jquery-pages.js"
        m.file     "javascripts/thickbox.js", "public/javascripts/thickbox.js"
        m.file     "javascripts/tablesorter.js", "public/javascripts/tablesorter.js"
        m.file     "javascripts/jquery.tablesorter.pager.js", "public/javascripts/jquery.tablesorter.pager.js"
        m.file     "javascripts/tablesorter_filter.js", "public/javascripts/tablesorter_filter.js"
        m.file     "javascripts/jquery.maskedinput.js", "public/javascripts/jquery.maskedinput.js"
        m.file     "javascripts/application_pager.js", "public/javascripts/application_pager.js"
        m.file     "_google_analytics.html.erb", "app/views/shared/_google_analytics.html.erb"
      end
      m.file "helper.rb", "app/helpers/layout_helper.rb"
    end
  end
  
  def file_name
    @name.underscore
  end

  protected

    def add_options!(opt)
      opt.separator ''
      opt.separator 'Options:'
      opt.on("--haml", "Generate HAML for view, and SASS for stylesheet.") { |v| options[:haml] = v }
    end

    def banner
      <<-EOS
Creates generic layout, stylesheet, and helper files.

USAGE: #{$0} #{spec.name} [layout_name]
EOS
    end
end
