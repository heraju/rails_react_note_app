class Api::NotesController < Api::ApiController

  def index
    render json: Note.all.map{|note| {id: note.id, title: note.title, description: note.description.to_s, tags: note.tags.to_a }}
  end

  def create
    Note.create(note_params)
    render json: Note.all.map{|note| {id: note.id, title: note.title, description: note.description.to_s, tags: note.tags.to_a }}
  end

  def show
    render json: note
  end

  def update
    render json: note.update_attributes(note_params)
  end

  def destroy
    render json: note.destroy
  end

  private

  def note
    @note ||= Note.find(params[:id])
  end

  def note_params
    params.permit(:title, :description, tags: [:id, :text])
  end

end
