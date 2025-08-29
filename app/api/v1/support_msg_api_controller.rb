module V1
  class SupportMsgApiController < ActionController::API
    rescue_from ActionController::ParameterMissing, with: :handle_parameter_missing

    def index
      items = SupportMsg.where(sort_key: "support_msg")
      render json: items
    end

    # def show
    #   post = Post.find(params[:id])
    #   render json: post
    # end

    def create
      SupportMsg.create(
        p_key: SecureRandom.uuid,
        value: post_params[:value],
        expire_date: (Time.current + 7.days).to_i
      )
      # post = Post.create(post_params)
      render json: {"result": "success"}
    end

    private

    def post_params
      params.require(:post).permit(:value)
    end

    def handle_parameter_missing(exception)
      render json: { result: "error", message: "エラー：不正なパラメータ", detail: exception.message }, status: :bad_request
    end
  end
end