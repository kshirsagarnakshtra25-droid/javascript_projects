

function billCalculation(units) {

    let bill = 0;

    if (units <= 100) {

        bill = units * 5;

    } else if (units <= 200) {

        bill = units * 7;

    } else if (units <= 300) {

        bill = units * 10;

    } else {

        bill = units * 15;
    }

   
    bill = bill + 100;

    return bill;
}


function discountCalculation(bill) {

    let discount = 0;

    if (bill > 5000) {

        discount = bill * 10 / 100;
    }

    return discount;
}



function billCategory(units) {

    if (units <= 100) {

        return "low category";

    } else if (units <= 200) {

        return "medium category";

    } else if (units <= 300) {

        return "high category";

    } else {

        return "very high" ;
    }
}



function calculateBill() {

    let customers = Number(
        prompt("Enter number of customers:")
    );

   
    if (isNaN(customers) || customers <= 0) {

        alert("Please enter a valid number of customers.");

        return;
    }


    let totalCollection = 0;

    let highestBill = 0;

    let highestCustomer = "";


    let output = `
        <table>

            <tr>
                <th>Customer Name</th>
                <th>Units</th>
                <th>Category</th>
                <th>Original Bill</th>
                <th>Discount</th>
                <th>Final Bill</th>
            </tr>
    `;


    

    for (let i = 1; i <= customers; i++) {

        let customerName = prompt(
            "Enter customer name " + i + ":"
        );


        let units = Number(
            prompt(
                "Enter units consumed by " + customerName + ":"
            )
        );


        
        if (isNaN(units) || units < 0) {

            alert("Please enter valid units.");

            return;
        }
        let originalBill =
            billCalculation(units);

            let discount =
            discountCalculation(originalBill);
            
            let finalBill =
            originalBill - discount;


        
            let category =
            billCategory(units);


                totalCollection =
            totalCollection + finalBill;


    
        if (finalBill > highestBill) {

            highestBill = finalBill;

            highestCustomer = customerName;
        }


      
        output += `
            <tr>

                <td>${customerName}</td>

                <td>${units}</td>

                <td>${category}</td>

                <td>₹${originalBill.toFixed(2)}</td>

                <td>₹${discount.toFixed(2)}</td>

                <td>₹${finalBill.toFixed(2)}</td>

            </tr>
        `;
    }


    output += `
        </table>

        <div class="summary">

            <p>
                Total Collection:
                ₹${totalCollection.toFixed(2)}
            </p>

            <p>
                Highest Bill Customer:
                ${highestCustomer}
            </p>

            <p>
                Highest Final Bill:
                ₹${highestBill.toFixed(2)}
            </p>

        </div>
    `;


  
    document.getElementById("result").innerHTML = output;
}