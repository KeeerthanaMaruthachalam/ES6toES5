'use strict';

var calculateMonthlyPayment = function calculateMonthlyPayment(principal, years, rate) {
    if (rate) {
        var monthlyRate = rate / 100 / 12;
    }
    var monthlyPayment = principal * monthlyRate / (1 - Math.pow(1 / (1 + monthlyRate), years * 12));
    return monthlyPayment;
};

document.getElementById('calcBtn').addEventListener('click', function () {
    var principal = document.getElementById("principal").value;
    var years = document.getElementById("years").value;
    var rate = document.getElementById("rate").value;
    var monthlyPayment = calculateMonthlyPayment(principal, years, rate);
    document.getElementById("monthlyPayment").innerHTML = monthlyPayment.toFixed(2);

    var a = 'the momthly payment when ' + principal + ' ,' + years + ' and ' + rate + ' is ' + monthlyPayment;
    console.log(a);

    function msgAfterTimeout(msg, who, timeout) {
        return new Promise(function (resolve, reject) {
            setTimeout(function () {
                return resolve(msg + ' Hello ' + who + '!');
            }, timeout);
        });
    }

    msgAfterTimeout("", "monthlypayment", 100).then(function (msg) {
        return msgAfterTimeout(msg, '' + monthlyPayment, 200);
    } //Promises
    ).then(function (msg) {
        console.log('done after 300ms:' + msg);
    });
});

var parser = function parser(input, match) {
    for (var pos = 0, lastPos = input.length; pos < lastPos;) {
        for (var i = 0; i < match.length; i++) {
            match[i].pattern.lastIndex = pos;
            var found = void 0;
            if ((found = match[i].pattern.exec(input)) !== null) {
                match[i].action(found);
                pos = match[i].pattern.lastIndex;
                break;
            }
        }
    }
};

var report = function report(match) {
    console.log(JSON.stringify(match));
};
parser("Foo 1 Bar 7 Baz 42", [{ pattern: new RegExp('Foo\\s+(\\d+)', 'y'), action: function action(match) {
        return report(match);
    } }, { pattern: new RegExp('Bar\\s+(\\d+)', 'y'), action: function action(match) {
        return report(match);
    } }, { pattern: new RegExp('Baz\\s+(\\d+)', 'y'), action: function action(match) {
        return report(match);
    } }, { pattern: new RegExp('\\s*', 'y'), action: function action(match) {} }]);
