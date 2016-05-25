'use strict';

describe('AfnUserController', function () {

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
    var $rootScope;
    var $state;
    var $scope;
    var AfnUserCtrl;
    var apiUrl = 'http://localhost:9393/user';

    beforeEach(module('afnUser'));
    beforeEach(module('ui.router'));

    beforeEach(function () {

        inject(function ($injector) {
            $httpBackend = $injector.get('$httpBackend');
            $rootScope = $injector.get('$rootScope');
            $scope = $rootScope.$new();
            $state = $injector.get('$state');
            AfnUserCtrl = $injector.get('$controller')('AfnUserController', {
                $scope: $scope
            });
        });
    });

    beforeEach(function () {

        $httpBackend
            .whenGET(apiUrl)
            .respond(userData)
        ;
        spyOn($state, 'go');
        
        $httpBackend.flush();
    });

    it('returns a list of users', function () {
        expect($scope.users).toEqual(userData);
    });
    
    describe('when create method is called', function () {
        it('routes to edit page', function () {
            $scope.create();
            
            expect($state.go).toHaveBeenCalled();
        });
    });
    
    describe('when showUser method is called', function () {
        var item;
        beforeEach( function () {
            item = userData["1"]; 
        });
        
        it('routes to edit page', function () {
            $scope.show(item);
            
            expect($state.go).toHaveBeenCalledWith('viewUser', {id: item.id});
        });
    });
    
    describe('when edit method is called', function () {
        var item;
        beforeEach( function () {
            item = userData["1"]; 
        });
        
        it('routes to edit page', function () {
            $scope.edit(item);
            
            expect($state.go).toHaveBeenCalledWith('editUser', {id: item.id});
        });
    });
    
    describe('when deleteUser method is called', function () {
        var item;
        beforeEach( function () {
            item = userData["1"]; 
        });
        
        it('routes to edit page', function () {
            $scope.delete(item);
            
            expect($state.go).toHaveBeenCalledWith('deleteUser', {id: item.id});
        });
    });
});