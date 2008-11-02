  def update
    @<%= singular_name %> = <%= class_name %>.find(params[:id])
    if @<%= singular_name %>.update_attributes(params[:<%= singular_name %>])
      flash[:notice] = "Successfully updated <%= name.humanize.downcase %>."
      redirect_to <%= item_path('url') %> if session[:look] == 'show'
      redirect_to <%= plural_name %>_url if session[:look] == 'index'
    else
      render :action => 'edit'
    end
  end
