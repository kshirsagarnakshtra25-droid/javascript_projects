/* =====================================================
   EMPLOYEE SALARY CALCULATOR
=====================================================*/

/* =====================================================
   EMPLOYEE ARRAY
===================================================== */

let employees =
    JSON.parse(
        localStorage.getItem("employees")
    ) || [];


/* =====================================================
   TAX CALCULATION
===================================================== */

function calculateTax(salary) {

    let taxRate;

    if (salary >= 100000) {

        taxRate = 0.20;

    } else if (salary >= 50000) {

        taxRate = 0.10;

    } else {

        taxRate = 0.05;
    }

    return salary * taxRate;
}


/* =====================================================
   EMPLOYEE CLASSIFICATION
===================================================== */

function classifyEmployee(salary) {

    if (salary >= 100000) {

        return "High Salary";

    } else if (salary >= 50000) {

        return "Medium Salary";

    } else {

        return "Low Salary";
    }
}


/* =====================================================
   SALARY CALCULATION
===================================================== */

function calculateEmployeeSalary(basicSalary) {

    // HRA = 20%
    let hra =
        basicSalary * 0.20;


    // DA = 10%
    let da =
        basicSalary * 0.10;


    // Gross Salary
    let grossSalary =
        basicSalary + hra + da;


    // Tax
    let tax =
        calculateTax(grossSalary);


    // Final Salary
    let finalSalary =
        grossSalary - tax;


    // Classification
    let category =
        classifyEmployee(grossSalary);


    return {
        hra: hra,
        da: da,
        tax: tax,
        finalSalary: finalSalary,
        category: category
    };
}


/* =====================================================
   ADD EMPLOYEE
===================================================== */

function addEmployee() {

    /* ---------------------------------------------
       GET INPUT VALUES
    --------------------------------------------- */

    let employeeId =
        document
            .getElementById("employeeId")
            .value
            .trim();


    let employeeName =
        document
            .getElementById("employeeName")
            .value
            .trim();


    let basicSalary =
        Number(
            document
                .getElementById("basicSalary")
                .value
        );


    /* ---------------------------------------------
       VALIDATE INPUT
    --------------------------------------------- */

    if (employeeId === "") {

        showMessage(
            "Please enter Employee ID.",
            "error"
        );

        return;
    }


    if (employeeName === "") {

        showMessage(
            "Please enter Employee Name.",
            "error"
        );

        return;
    }


    if (
        basicSalary <= 0 ||
        isNaN(basicSalary)
    ) {

        showMessage(
            "Please enter a valid salary.",
            "error"
        );

        return;
    }


    /* ---------------------------------------------
       CHECK DUPLICATE ID
    --------------------------------------------- */

    let duplicate =
        employees.some(function(employee) {

            return employee.id === employeeId;

        });


    if (duplicate) {

        showMessage(
            "Employee ID already exists.",
            "error"
        );

        return;
    }


    /* ---------------------------------------------
       CALCULATE SALARY
    --------------------------------------------- */

    let salary =
        calculateEmployeeSalary(
            basicSalary
        );


    /* ---------------------------------------------
       CREATE EMPLOYEE OBJECT
    --------------------------------------------- */

    let employee = {

        id: employeeId,

        name: employeeName,

        basicSalary: basicSalary,

        hra: salary.hra,

        da: salary.da,

        tax: salary.tax,

        finalSalary: salary.finalSalary,

        category: salary.category

    };


    /* ---------------------------------------------
       ADD EMPLOYEE TO ARRAY
    --------------------------------------------- */

    employees.push(employee);


    /* ---------------------------------------------
       SAVE DATA
    --------------------------------------------- */

    saveEmployees();


    /* ---------------------------------------------
       DISPLAY TABLE
    --------------------------------------------- */

    displayResults(employees);


    /* ---------------------------------------------
       CLEAR INPUTS
    --------------------------------------------- */

    document.getElementById(
        "employeeId"
    ).value = "";

    document.getElementById(
        "employeeName"
    ).value = "";

    document.getElementById(
        "basicSalary"
    ).value = "";


    /* ---------------------------------------------
       SUCCESS MESSAGE
    --------------------------------------------- */

    showMessage(
        "Employee added successfully!",
        "success"
    );
}


/* =====================================================
   SAVE EMPLOYEES
===================================================== */

function saveEmployees() {

    localStorage.setItem(
        "employees",
        JSON.stringify(employees)
    );
}


/* =====================================================
   DISPLAY EMPLOYEES
===================================================== */

function displayResults(employeeList) {

    let tableBody =
        document.getElementById(
            "salaryTableBody"
        );


    tableBody.innerHTML = "";


    /* ---------------------------------------------
       NO EMPLOYEE
    --------------------------------------------- */

    if (employeeList.length === 0) {

        tableBody.innerHTML = `

            <tr>

                <td
                    colspan="9"
                    class="no-data"
                >

                    No employees added yet.

                </td>

            </tr>

        `;

        updateTotalSalary([]);

        return;
    }


    /* ---------------------------------------------
       LOOP THROUGH EMPLOYEES
    --------------------------------------------- */

    for (
        let i = 0;
        i < employeeList.length;
        i++
    ) {

        let employee =
            employeeList[i];


        let badgeClass;


        /* -----------------------------------------
           CATEGORY
        ----------------------------------------- */

        if (
            employee.category ===
            "High Salary"
        ) {

            badgeClass =
                "badge-high";

        } else if (
            employee.category ===
            "Medium Salary"
        ) {

            badgeClass =
                "badge-medium";

        } else {

            badgeClass =
                "badge-low";
        }


        /* -----------------------------------------
           TABLE ROW
        ----------------------------------------- */

        let row =
            document.createElement("tr");


        row.innerHTML = `

            <td>
                ${employee.id}
            </td>

            <td>
                <span class="employee-name">
                    ${employee.name}
                </span>
            </td>

            <td>
                ${formatCurrency(
                    employee.basicSalary
                )}
            </td>

            <td>
                ${formatCurrency(
                    employee.hra
                )}
            </td>

            <td>
                ${formatCurrency(
                    employee.da
                )}
            </td>

            <td>
                ${formatCurrency(
                    employee.tax
                )}
            </td>

            <td>
                <strong>
                    ${formatCurrency(
                        employee.finalSalary
                    )}
                </strong>
            </td>

            <td>
                <span
                    class="badge ${badgeClass}"
                >
                    ${employee.category}
                </span>
            </td>

            <td>

                <button
                    class="delete-btn"
                    onclick="deleteEmployee('${employee.id}')"
                >

                    <i class="fa-solid fa-trash"></i>

                </button>

            </td>

        `;


        tableBody.appendChild(row);
    }


    /* ---------------------------------------------
       TOTAL
    --------------------------------------------- */

    updateTotalSalary(employeeList);


    /* ---------------------------------------------
       SHOW RESULTS
    --------------------------------------------- */

    document
        .getElementById("resultsSection")
        .classList.remove("hidden");
}


/* =====================================================
   TOTAL SALARY
===================================================== */

function updateTotalSalary(employeeList) {

    let totalSalary = 0;


    for (
        let i = 0;
        i < employeeList.length;
        i++
    ) {

        totalSalary =
            totalSalary +
            employeeList[i].finalSalary;
    }


    document.getElementById(
        "totalSalary"
    ).textContent =
        formatCurrency(totalSalary);
}


/* =====================================================
   SEARCH EMPLOYEE
===================================================== */

function searchEmployee() {

    let searchText =
        document
            .getElementById(
                "searchEmployee"
            )
            .value
            .toLowerCase()
            .trim();


    if (searchText === "") {

        displayResults(employees);

        return;
    }


    let filteredEmployees =
        employees.filter(
            function(employee) {

                return (
                    employee.id
                        .toLowerCase()
                        .includes(searchText)
                    ||
                    employee.name
                        .toLowerCase()
                        .includes(searchText)
                );

            }
        );


    displayResults(
        filteredEmployees
    );
}


/* =====================================================
   DELETE ONE EMPLOYEE
===================================================== */

function deleteEmployee(employeeId) {

    employees =
        employees.filter(
            function(employee) {

                return employee.id !== employeeId;

            }
        );


    saveEmployees();

    displayResults(employees);
}


/* =====================================================
   CLEAR ALL EMPLOYEES
===================================================== */

function clearAllEmployees() {

    employees = [];

    localStorage.removeItem(
        "employees"
    );

    displayResults([]);

}


/* =====================================================
   FORMAT CURRENCY
===================================================== */

function formatCurrency(amount) {

    return "₹" +
        amount.toLocaleString(
            "en-IN",
            {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2
            }
        );
}


/* =====================================================
   MESSAGE
===================================================== */

function showMessage(
    message,
    type
) {

    let messageBox =
        document.getElementById(
            "messageBox"
        );


    messageBox.textContent =
        message;


    messageBox.className =
        "message-box " + type;


    setTimeout(
        function() {

            messageBox.className =
                "message-box";

            messageBox.textContent = "";

        },
        2500
    );
}


/* =====================================================
   LOAD DATA WHEN PAGE OPENS
===================================================== */

window.addEventListener(
    "DOMContentLoaded",
    function() {

        displayResults(
            employees
        );

    }
);

