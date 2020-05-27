const chai = require('chai');
const sinon = require('sinon');

const { expect } = chai;
chai.should();

describe('sinon test', () => {
  let student;
  let schedule;
  beforeEach(() => {
    student = {
      dropClass(classId, cb) {
        if (cb.dropClass) {
          cb.dropClass();
        } else {
          cb();
        }
      },
      addClass(sch) {
        if (sch.classIsFull() === true) return false;
        // add class
        return true;
      }
    };

    schedule = {
      dropClass() {
        console.log('class dropped');
      },
      classIsFull() {
        return true;
      }
    };
  });

  describe('student dropClass', () => {
    it('should call the callback', () => {
      const spy = sinon.spy();
      spy.called.should.be.false;
      student.dropClass(1, spy);
      spy.called.should.be.true;
    });

    it('should call the callback and log to the console', () => {
      function onClassDropped() {
        console.log('CONSOLE LOG onClassDropped was called');
      }
      const spy = sinon.spy(onClassDropped);
      student.dropClass(1, spy);
      spy.called.should.be.true;
    });

    it('should call the callback and even if it\'s a method of an object', () => {
      sinon.spy(schedule, 'dropClass');
      student.dropClass(1, schedule);
      schedule.dropClass.called.should.be.true;
    });

    it('student w/stub', () => {
      const stub = sinon.stub(schedule);
      student.dropClass(1, stub.dropClass);
      // student.dropClass(1, stub.dropClass); /* This could also be done */
      stub.dropClass.called.should.be.true;
      /*
      note that sub doesn't call the inner implementation of dropClass()
      so "class dropped" message won't appear
       */
    });

    it('should return true when class is full', () => {
      console.log(schedule.classIsFull());
      const stub = sinon.stub(schedule);
      console.log(schedule.classIsFull());
      stub.classIsFull.returns.false;
      console.log(schedule.classIsFull());
      const ret = student.addClass(stub);
      ret.should.be.true;
    });
  });

  describe.only('student w/ mock', () => {
    it('mock schedule', () => {
      const mockObj = sinon.mock(schedule);
      const expectation = mockObj.expects('classIsFull').once();
      student.addClass(schedule);
      expectation.verify();
    });
  });

  xdescribe(' old student dropClass', () => {
    it('should call the callback', () => {
      let called = false;
      function cb() {
        called = true;
      }
      student.dropClass(1, cb);
      expect(called).to.be.true;
    });
  });
});
