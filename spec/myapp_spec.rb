# require 'rspec'
require_relative '../myapp'
# require 'rack/test'

set :environment, :test

def app
  Sinatra::Application
end

describe 'myapp service' do
  # include Rack::Test::Methods

  it 'loads User Index page' do
    get '/'
    expect(last_response).to be_ok
  end

  it 'loads New User page' do
    get '/new'
    expect(last_response).to be_ok
  end

  it 'loads Edit User page' do
    get '/edit'
    expect(last_response).to be_ok
  end

  it 'loads Show User page' do
    get '/show'
    expect(last_response).to be_ok
  end

  it 'loads Delete User page' do
    get '/delete'
    expect(last_response).to be_ok
  end
end