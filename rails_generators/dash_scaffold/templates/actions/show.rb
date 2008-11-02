  def show
    @<%= singular_name %> = <%= class_name %>.find(params[:id])
    session[:look] = 'show'
  end
