class Api::NotesController < Api::ApiController

  def index
    render json: Note.all.map{|note| {id: note.id, title: note.title, description: note.description.to_s, tags: note.tags.to_a }}
  end

  def create
    render json: Note.create(note_params)
  end

  def show
    render json: note
  end

  def update
    render json: note.update_attributes(note_params)
  end

  private

  def note
    @note ||= Note.find(params[:id])
  end

  def note_params
    params.permit(:title, :description, tags: [:id, :text])
  end

end
