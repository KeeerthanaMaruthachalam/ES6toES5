var calculateMonthlyPayment = (principal, years, rate)=> {
    if (rate) {
        var monthlyRate = rate / 100 / 12;
    }
    var monthlyPayment = principal * monthlyRate / (1 - (Math.pow(1 / (1 + monthlyRate), years * 12)));
    return monthlyPayment;
};

document.getElementById('calcBtn').addEventListener('click', function () {
    var principal = document.getElementById("principal").value;
    var years = document.getElementById("years").value;
    var rate = document.getElementById("rate").value;
    var monthlyPayment = calculateMonthlyPayment(principal, years, rate);
    document.getElementById("monthlyPayment").innerHTML = monthlyPayment.toFixed(2);

    var a=`the momthly payment when ${principal} ,${years} and ${rate} is ${monthlyPayment}`;
    console.log(a);
    

    function msgAfterTimeout (msg, who, timeout) {
        return new Promise((resolve, reject) => {
            setTimeout(() => resolve(`${msg} Hello ${who}!`), timeout)
        })
    }
   
    msgAfterTimeout("", "monthlypayment", 100).then((msg) =>
        msgAfterTimeout(msg, `${monthlyPayment}`, 200)  //Promises
    ).then((msg) => {
        console.log(`done after 300ms:${msg}`)
    })
    
});



let parser = (input, match) => {
    for (let pos = 0, lastPos = input.length; pos < lastPos; ) {
        for (let i = 0; i < match.length; i++) {
            match[i].pattern.lastIndex = pos
            let found
            if ((found = match[i].pattern.exec(input)) !== null) {
                match[i].action(found)
                pos = match[i].pattern.lastIndex
                break
            }
        }
    }
}

let report = (match) => {
    console.log(JSON.stringify(match))
}
parser("Foo 1 Bar 7 Baz 42", [
    { pattern: /Foo\s+(\d+)/y, action: (match) => report(match) },
    { pattern: /Bar\s+(\d+)/y, action: (match) => report(match) },
    { pattern: /Baz\s+(\d+)/y, action: (match) => report(match) },
    { pattern: /\s*/y,         action: (match) => {}            }
])
