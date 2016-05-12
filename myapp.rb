require 'sinatra'
require 'json'
require 'odbc_utf8'

source = "POWERBROKER_FORCEDEV"

client = ODBC.connect(source, "afnappsdbuser", "Afn@2014")

# rendering json for everything (except /)
before do
  content_type 'application/json'
end

# send the frontend
# This is the only actual html served.
# Everything else is json

get '/user' do
  sql = "SELECT * FROM afnapp.dev_user_test"
  statement = client.prepare(sql)
  statement.execute
  rows = []
  while r = statement.fetch
    rows.push(r)
  end
  rows.to_json
end

put '/user' do
  "Some users"
end

post '/user' do
  "Some users"
end

delete '/user/:id' do
  "Deleting User: #{:id}"
end

get '/' do
  content_type 'html'
  send_file 'public/index.html'
end

get '/new' do
  "This is the New User page"
end

get '/edit' do
  "This is the Edit User page"
end

get '/show' do
  "This is the Show User page"
end

get '/delete' do
  "This is the Delete User page"
end