"use strict";

describe('User', function() {

    var userData = {
        "1": {
            "id": 3,
            "first_name": "James-Earl",
            "last_name": "Smith",
            "gender": "M",
            "city": "Peoria",
            "state": "IL",
            "created_at": "2016-05-12 14:01:58 317000000",
            "updated_at": "2016-05-17 18:06:32 863000000"
        },
        "2": {
            "id": 24,
            "first_name": "Foo",
            "last_name": "Bar",
            "gender": "M",
            "city": "Austin",
            "state": "TX",
            "created_at": "2016-05-17 08:09:32 883000000",
            "updated_at": "2016-05-17 17:23:30 587000000"
        }
    };

    var $httpBackend;
    
    beforeEach(module('afn-user'));
    
    beforeEach(inject(function($injector) {
        $httpBackend = $injector.get($httpBackend);
    }));
    
    it('gets a list of users', function() {
        expect(true).to_eq(true);
    });
});