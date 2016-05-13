# require 'rspec'
require_relative '../myapp'
# require 'rack/test'

set :environment, :test

def app
  Sinatra::Application
end

describe 'User endpoint behaviour' do

  it 'call GET' do
    get '/user'
    expect(last_response).to be_ok
  end

  it 'call GET with id' do
    get '/user/2'
    expect(last_response).to be_ok
  end

  xit 'call PUT' do
    put '/user'
    expect(last_response).to be_ok
  end

  xit 'call POST without payload' do
    post '/user'
    expect(last_response).to be_
  end

  xit 'call DELETE with id' do
    delete '/user/1'
    expect(last_response).to be_ok
  end
end