  def index
    @<%= plural_name %> = <%= class_name %>.find(:all)
    session[:look] = 'index'
  end
