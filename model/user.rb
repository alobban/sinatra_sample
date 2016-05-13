require 'json'

class User

  def initialize id, first_name, last_name, gender, city, state, created_at, updated_at
    @id = id
    @first_name = first_name
    @last_name = last_name
    @gender = gender
    @city = city
    @state = state
    @created_at = created_at
    @updated_at = updated_at
  end

  def to_json(*a)
    serialized = {:id => @id,:first_name => @first_name,:last_name => @last_name,:gender => @gender,:city => @city,:state => @state,:created_at => @created_at,:updated_at => @updated_at}
    serialized.to_json(*a)
  end

end