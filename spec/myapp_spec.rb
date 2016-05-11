# require 'rspec'
require_relative '../myapp'
# require 'rack/test'

set :environment, :test

def app
  Sinatra::Application
end

describe 'myapp service' do
  # include Rack::Test::Methods

  it 'loads home page' do
    get '/'
    expect(last_response).to be_ok
  end
end