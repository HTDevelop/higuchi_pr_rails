class SupportMsg
  include Dynamoid::Document

  table name: "higuchi-pr", key: :p_key
  range :sort_key, :string, default: 'support_msg'
  field :value, :string
  field :expire_date, :integer

  global_secondary_index hash_key: :sort_key,
                         projected_attributes: :all,
                         name: 'sort-key-index'
end