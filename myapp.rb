require 'sinatra'
require 'json'
require 'odbc_utf8'
require 'dotenv'
require_relative 'model/user'
Dotenv.load!

data_source = ENV['PB_DB_ODBC_SOURCE']
user        = ENV['PB_DB_USER']
password    = ENV['PB_DB_USER_PWD']

client = ODBC.connect(data_source, user, password)

# rendering json for everything (except /)
before do
  content_type 'application/json'
  request.body.rewind
  @request_payload = JSON.parse(request.body.read,:symbolize_names => true) rescue {}
end

# send the frontend
# This is the only actual html served.
# Everything else is json

get '/user' do
  sql = "SELECT * FROM afnapp.dev_user_test"
  statement = client.prepare(sql)
  statement.execute
  users = Hash.new
  i = 0
  while r = statement.fetch
    i+=1
     user = {:id => r[0], :first_name => r[1], :last_name => r[2], :gender => r[3], :city => r[4], :state => r[5], :created_at => r[6], :updated_at => r[7]}
    #user = User.new(r[0],r[1],r[2],r[3],r[4],r[5],r[6],r[7])
    users[i] = user
  end
  statement.drop
  status 200
  users.to_json
end


get '/user/:id' do
  sql = "SELECT * FROM afnapp.dev_user_test WHERE id = ?"
  statement = client.prepare(sql)
  statement.execute(params[:id])
  user = nil
  while r = statement.fetch
    # user = {:id => r[0], :first_name => r[1], :last_name => r[2], :gender => r[3], :city => r[4], :state => r[5], :created_at => r[6], :updated_at => r[7]}
    user = User.new(r[0],r[1],r[2],r[3],r[4],r[5],r[6],r[7])
  end
  statement.drop
  user.to_json
end

put '/user/:id' do
  sql = 'UPDATE [afnapp].[dev_user_test]
      SET [first_name] = ISNULL(?,first_name)
      ,[last_name] = ISNULL(?,last_name)
      ,[gender] = ISNULL(?,gender)
      ,[city] = ISNULL(?,city)
      ,[state] = ISNULL(?,state)
      ,[updated_at] = GETDATE()
      WHERE id = ?'
  statement = client.prepare(sql)
  statement.execute(@request_payload[:first_name],@request_payload[:last_name],@request_payload[:gender],@request_payload[:city], @request_payload[:state], params[:id])
  statement.drop
  status 202
  body "Content successfully updated"
end

post '/user' do
  sql = 'INSERT INTO [afnapp].[dev_user_test]
           ([first_name]
           ,[last_name]
           ,[gender]
           ,[city]
           ,[state]
           ,[created_at]
           ,[updated_at])
          VALUES
           (?,?,?,?,?,GETDATE(),GETDATE())'
  statement = client.prepare(sql)
  statement.execute(@request_payload[:first_name],@request_payload[:last_name],@request_payload[:gender],@request_payload[:city], @request_payload[:state])
  statement.drop
  status 201
  body "Content successfully created"
end

delete '/user/:id' do
  sql = 'DELETE FROM [afnapp].[dev_user_test]
        WHERE id = ?'
  statement = client.prepare(sql)
  statement.execute(params[:id])
  statement.drop
  status 202
  body "Content successfully deleted"
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