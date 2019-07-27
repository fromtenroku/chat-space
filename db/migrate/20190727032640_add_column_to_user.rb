class AddColumnToUser < ActiveRecord::Migration[5.0]
  def change
    add_column :users, :name, :string, null: false, unique: true, index: true
  end
end
