import { assert, expect, should } from 'chai';

class Asserts {

    //Throw a failure
    fail(errorMessage = 'Test Case Failed') {
        assert.fail(errorMessage);
    }

    //Asserts non-strict equality (==) of actual and expected assert(3,'3')
    equal(actual, expected, messageOnError = 'Actual and Expected Values do not match.') {
        assert.equal(actual, expected, messageOnError + ` Actual = ${actual} And Expected = ${expected}`);
    }

    //expect([1, 2, 3]).to.have.members([2, 1, 3]);
    isArrayEqual(actual, expected) {
        expect(actual).to.have.members(expected);
    }

    //deep equal checks 2 unordered objects data and gets the results if the values are same
    deepEqual(actual, expected){
        expect(actual).to.deep.equal(expected);
    }

    //exg: expect({b: 2}).to.have.a.property('b'); Another: expect(holistListResponse).to.have.a.property('clientName');
    expectPropery(object, property){
        expect(object).to.have.a.property(property);
    }

    expectToInclude(parent, child){
        expect(parent).to.include(child);
    }
    
}

export default new Asserts();