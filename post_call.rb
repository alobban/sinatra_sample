require 'rubygems' if RUBY_VERSION < '1.9'
require 'rest-client'

values ={
        "first_name": "Foo",
        "last_name": "Bar",
        "gender": "M",
        "city": "Austin",
        "state": "Texas",
    }


headers = {
    :content_type => 'application/json'
}

# response = RestClient.get 'http://localhost:9393/user'
response = RestClient.post 'http://localhost:9393/user', values, headers
puts response
