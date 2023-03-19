"use strict";

const tbody = document.getElementById("tbody");

// GET request, that fills the tbody
fetch("http://localhost:3000/pizza")
  .then((response) => response.json())
  .then((data) => {
    for (let i = 0; i < data.length; i++) {
      tbody.append(fillTable(data[i].id, data[i].name, data[i].diameter, data[i].price, data[i].payment));
    }
  });

/**
 * Fills the table with extracted data
 * @param {*} id
 * @param {*} name
 * @param {*} diameter
 * @param {*} price
 * @param {*} payment
 * @returns
 */
const fillTable = (id, name, diameter, price, payment) => {
  let tr = document.createElement("tr");
  tr.innerHTML = `
    <tr>
        <td>${id}</td>
        <td>${name}</td>
        <td>${diameter} cm</td>
        <td>${price} Ft</td>
        <td>${payment}</td>
    </tr>
  `;
  return tr;
};

const createUpdate = document.getElementById("createUpdate");
const deleteData = document.getElementById("deleteData");

// Adds event to the createUpdate button
createUpdate.addEventListener("click", () => {
  createUpdateMethod();
});

/**
 * If idInput is empty,
 * performs the POST request with autoincrement,
 * else performs the PUT request
 */
const createUpdateMethod = () => {
  const idInput = document.getElementById("idInput").value;
  const nameInput = document.getElementById("nameInput").value;
  const diameterInput = document.getElementById("diameterInput").value;
  const priceInput = document.getElementById("priceInput").value;

  const paymentInput = document.getElementById("paymentInput");
  const paymentValue = paymentInput.options[paymentInput.selectedIndex].text;

  const inputData = {
    id: idInput,
    name: nameInput,
    diameter: diameterInput,
    price: priceInput,
    payment: paymentValue,
  };

  if (idInput === "") {
    fetch("http://localhost:3000/pizza", {
      method: "POST",
      body: JSON.stringify(inputData),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    }).then((response) => response.json());
  } else {
    fetch(`http://localhost:3000/pizza/${idInput}`, {
      method: "PUT",
      body: JSON.stringify(inputData),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    }).then((response) => response.json());
  }
};

// Adds event to the delete button
deleteData.addEventListener("click", () => {
  deleteMethod();
});

/**
 * Perfors the DELETE request
 */
const deleteMethod = () => {
  const idInput = document.getElementById("idInput").value;
  fetch(`http://localhost:3000/pizza/${idInput}`, {
    method: "DELETE",
  });
};
