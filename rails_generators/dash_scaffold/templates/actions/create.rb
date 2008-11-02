  def create
    @<%= singular_name %> = <%= class_name %>.new(params[:<%= singular_name %>])
    if @<%= singular_name %>.save
      flash[:notice] = "Successfully created <%= name.humanize.downcase %>."
      redirect_to <%= plural_name %>_url and return if params[:commit] == "Save"
      redirect_to new_<%= singular_name %>_url
    else
      render :action => 'new'
    end
  end
