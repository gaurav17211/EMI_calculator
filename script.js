document.addEventListener("DOMContentLoaded", function(){
    const loanAmountInput = document.getElementById("loan-amount");
    const interestRateInput = document.getElementById("loan-rate");
    const loanTenureInput = document.getElementById("loan-tenure");

    const loanAmountDisplay = document.getElementById("loan-amount-display");
    const interestRateDisplay = document.getElementById("loan-rate-display");
    const loadTenureDisplay = document.getElementById("loan-tenure-display");

    const emiResult=document.getElementById("emi-result");

    // Add styles for animations
    const style = document.createElement("style");
    style.textContent = `
        * {
            transition: all 0.3s ease;
        }
        
        .emi.calculator {
            max-width: 500px;
            margin: 50px auto;
            padding: 30px;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            border-radius: 15px;
            box-shadow: 0 10px 30px rgba(0,0,0,0.3);
            color: white;
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
        }

        .emi.calculator h2 {
            text-align: center;
            margin-bottom: 30px;
            font-size: 28px;
            text-shadow: 2px 2px 4px rgba(0,0,0,0.2);
        }

        .input.group {
            margin-bottom: 25px;
            background: rgba(255,255,255,0.1);
            padding: 15px;
            border-radius: 10px;
            backdrop-filter: blur(10px);
        }

        .input.group label {
            display: block;
            margin-bottom: 10px;
            font-weight: 600;
            font-size: 14px;
            text-transform: uppercase;
            letter-spacing: 1px;
        }

        .input.group input[type="range"] {
            width: 100%;
            height: 8px;
            border-radius: 5px;
            background: rgba(255,255,255,0.2);
            outline: none;
            -webkit-appearance: none;
        }

        .input.group input[type="range"]::-webkit-slider-thumb {
            -webkit-appearance: none;
            appearance: none;
            width: 20px;
            height: 20px;
            border-radius: 50%;
            background: #fff;
            cursor: pointer;
            box-shadow: 0 2px 8px rgba(0,0,0,0.3);
        }

        .input.group input[type="range"]::-moz-range-thumb {
            width: 20px;
            height: 20px;
            border-radius: 50%;
            background: #fff;
            cursor: pointer;
            border: none;
            box-shadow: 0 2px 8px rgba(0,0,0,0.3);
        }

        .input.group span {
            display: inline-block;
            background: rgba(255,255,255,0.2);
            padding: 8px 15px;
            border-radius: 20px;
            margin-top: 10px;
            font-weight: 700;
            font-size: 16px;
        }

        .result {
            background: rgba(255,255,255,0.15);
            padding: 25px;
            border-radius: 10px;
            text-align: center;
            margin-top: 30px;
            border: 2px solid rgba(255,255,255,0.3);
        }

        .result h3 {
            margin: 0;
            font-size: 20px;
            margin-bottom: 15px;
        }

        #emi-result {
            display: inline-block;
            background: #fff;
            color: #667eea;
            padding: 12px 20px;
            border-radius: 25px;
            font-size: 28px;
            font-weight: 700;
            box-shadow: 0 5px 15px rgba(0,0,0,0.2);
            animation: pulse 1s ease-in-out infinite;
        }

        @keyframes pulse {
            0%, 100% { transform: scale(1); }
            50% { transform: scale(1.05); }
        }

        .breakdown {
            background: rgba(255,255,255,0.1);
            padding: 15px;
            border-radius: 10px;
            margin-top: 20px;
            font-size: 14px;
        }

        .breakdown-item {
            display: flex;
            justify-content: space-between;
            margin: 8px 0;
            padding: 8px 0;
        }

        .breakdown-item:not(:last-child) {
            border-bottom: 1px solid rgba(255,255,255,0.2);
        }
    `;
    document.head.appendChild(style);

    function updateEMI(){
        const loanAmount = parseFloat(loanAmountInput.value);
        const annualInterestRate = parseFloat(interestRateInput.value);
        const loanTenure = parseInt(loanTenureInput.value);

        const monthlyInterestRate = annualInterestRate / (12 * 100);
        const numberOfMonths = loanTenure * 12;

        const emi = (loanAmount * monthlyInterestRate * Math.pow(1 + monthlyInterestRate, numberOfMonths)) /
                    (Math.pow(1 + monthlyInterestRate, numberOfMonths) - 1);

        const totalPayment = emi * numberOfMonths;
        const totalInterest = totalPayment - loanAmount;

        // Update display with animations
        loanAmountDisplay.textContent = `₹ ${loanAmount.toLocaleString()}`;
        interestRateDisplay.textContent = `${annualInterestRate}%`;
        loadTenureDisplay.textContent = `${loanTenure} Yr`;
        emiResult.textContent = `₹ ${emi.toFixed(2)}`;

        // Add breakdown in result section
        const resultDiv = document.querySelector(".result");
        let breakdownDiv = document.querySelector(".breakdown");
        
        if (!breakdownDiv) {
            breakdownDiv = document.createElement("div");
            breakdownDiv.className = "breakdown";
            resultDiv.appendChild(breakdownDiv);
        }

        breakdownDiv.innerHTML = `
            <div class="breakdown-item">
                <span>Principal Amount:</span>
                <strong>₹ ${loanAmount.toLocaleString()}</strong>
            </div>
            <div class="breakdown-item">
                <span>Total Interest:</span>
                <strong>₹ ${totalInterest.toFixed(2)}</strong>
            </div>
            <div class="breakdown-item">
                <span>Total Payment:</span>
                <strong>₹ ${totalPayment.toFixed(2)}</strong>
            </div>
        `;
    }

    // Add event listeners with smooth transitions
    loanAmountInput.addEventListener("input", updateEMI);
    interestRateInput.addEventListener("input", updateEMI);
    loanTenureInput.addEventListener("input", updateEMI);

    // Initial calculation
    updateEMI();
})