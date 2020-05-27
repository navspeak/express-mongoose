/* eslint-env mocha */
const chai = require('chai');

const { expect } = chai;
chai.should();

const isEven = (num) => num % 2 === 0;
const add = (a, b) => a + b;

xdescribe('Any Number', () => { // xdescribe or describe.skip or add .only to run only that describe or it
  it('should return true when number is even', () => {
    // eslint-disable-next-line no-unused-expressions
    isEven(4).should.be.true;
  });

  it('should return false when number is odd', () => {
    expect(isEven(5)).to.be.false;
  });
});

describe('Add without setup/tear down', () => {
  let num = 5;
  it.skip('should be 10 when adding 5', () => {
    num = add(num, 5);
    num.should.equal(10);
  });
  xit('should be 12 when adding 7', () => { // another way to skip the test
    num = add(num, 7);
    num.should.not.equal(12);
  });
});

describe('Add with setup/tear down', () => {
  let num;
  beforeEach(() => { num = 5; });
  after(() => console.log('Done'));
  it('should be 10 when adding 5', () => {
    num = add(num, 5);
    num.should.equal(10);
  });
  it('should be 12 when adding 7', () => {
    num = add(num, 7);
    num.should.equal(12);
  });
});
