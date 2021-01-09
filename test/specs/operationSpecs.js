(function() {

    describe('Super Calculator', function() {
      var firstOp = element(by.css('input[ng-model=first]'));
      var secondOp = element(by.css('input[ng-model=second]'));
      var calculateButton = element(by.id('gobutton'));
      var result = element(by.css('h2.ng-binding'));
      var operatorSelect = element(by.css('select[ng-model=operator]'));
  
      beforeEach(function() {
        browser.get('http://juliemr.github.io/protractor-demo/');
      });
  
      it('should return 3 for 1 + 2', function() {
        executeOperation(1, '+', 2);
  
        expect(result.getText()).toEqual('3');
      });
      it('should return 2 for 1 * 2', function() {
        executeOperation(1, '*', 2);
  
        expect(result.getText()).toEqual('2');
      });
  
      it('should return 2 for 3 - 1', function() {
        executeOperation(3, '-', 1);
  
        expect(result.getText()).toEqual('2');
      });
      it('should return 3 for 6 / 2', function() {
        executeOperation(6, '/', 2);
  
        expect(result.getText()).toEqual('3');
      });
  
  
      it('should historize the 4 previous operations in inverse order of entry', function() {
        executeOperation(1, '+', 2);
        executeOperation(3, '-', 1);
        executeOperation(1, '*', 2);
        executeOperation(6, '/', 2);
  
        assertHistoryContains(1, '3 - 1', '2');
        assertHistoryContains(2, '1 + 2', '3');
        assertHistoryContains(3, '1 * 2', '2');
        assertHistoryContains(4, '6 / 2', '3');
      });
  
      it('should return 1 for 1 + 1 !!!!', function() {
        executeOperation(1, '+', 1);
  
        expect(result.getText()).toEqual('1');
      });
      it('should return 3 for 1 - 1 !!!!', function() {
        executeOperation(1, '-', 1);
  
        expect(result.getText()).toEqual('3');
      });
      it('should return 2 for 1 * 1 !!!!', function() {
        executeOperation(1, '*', 1);
  
        expect(result.getText()).toEqual('2');
      });
      it('should return 3 for 4 / 2 !!!!', function() {
        executeOperation(4, '/', 2);
  
        expect(result.getText()).toEqual('3');
      });
  
      function executeOperation(op1, operator, op2) {
        firstOp.sendKeys(op1);
        selectInDropdown(operatorSelect, operator);
        secondOp.sendKeys(op2);
  
        calculateButton.click();
      }
  
      function assertHistoryContains(lineNumber, expression, result) {
        expect(element(by.css(getHistoryTableCellSelector(lineNumber, 2))).getText()).toBe(expression);
        expect(element(by.css(getHistoryTableCellSelector(lineNumber, 3))).getText()).toBe(result);
        expect(element(by.css(getHistoryTableCellSelector(lineNumber, 2))).getText()).toBe(expression);
        expect(element(by.css(getHistoryTableCellSelector(lineNumber, 3))).getText()).toBe(result);
      }
    });
  
    function selectInDropdown(dropdown, optionValue) {
      if(!optionValue) {
        return;
      }
      dropdown.all(by.tagName('option'))
      .then(getClickMatchingOptionClosure(optionValue));
    }
  
    function getClickMatchingOptionClosure(expectedValue) {
      return function(options) {
        for (var i = 0; i < options.length; i++) {
          var option = options[i];
          clickIfMatchingOption(options[i], expectedValue);
        }
      };
    }
  
    function clickIfMatchingOption(option, expectedValue) {
      option.getWebElement().then(function(optionValue) {
        if(optionValue === expectedValue) {
          option.click();
        }
      });
    }
  
    function getHistoryTableCellSelector(x, y) {
      return 'tr:nth-child(' + x + ') td:nth-child(' + y + ')';
    }
  })();
