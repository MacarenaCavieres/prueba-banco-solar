// $(document).ready(() => {
//     const setInfoModal = (nombre, balance, id) => {
//         $("#nombreEdit").val(nombre);
//         $("#balanceEdit").val(balance);
//         $("#editButton").attr("onclick", `editUsuario('${id}')`);
//     };

//     const editUsuario = async (id) => {
//         const name = $("#nombreEdit").val();
//         const balance = $("#balanceEdit").val();
//         try {
//             const { data } = await axios.put(`http://localhost:3000/usuario?id=${id}`, {
//                 name,
//                 balance,
//             });
//             $("#exampleModal").modal("hide");
//             location.reload();
//         } catch (e) {
//             alert("Algo salió mal..." + e);
//         }
//     };

//     $("form:first").submit(async (e) => {
//         e.preventDefault();
//         let nombre = $("form:first input:first").val();
//         let balance = Number($("form:first input:nth-child(2)").val());
//         console.log(nombre);

//         try {
//             const response = await fetch("http://localhost:3000/api/v1/usuarios", {
//                 method: "post",
//                 headers: {
//                     "Content-Type": "application/json",
//                 },
//                 body: JSON.stringify({
//                     nombre,
//                     balance,
//                 }),
//             });
//             $("form:first input:first").val("");
//             $("form:first input:nth-child(2)").val("");
//             location.reload();
//         } catch (e) {
//             alert("Algo salió mal ..." + e);
//         }
//     });

//     $("form:last").submit(async (e) => {
//         e.preventDefault();
//         let emisor = $("form:last select:first").val();
//         let receptor = $("form:last select:last").val();
//         let monto = $("#monto").val();
//         if (!monto || !emisor || !receptor) {
//             alert("Debe seleccionar un emisor, receptor y monto a transferir");
//             return false;
//         }
//         try {
//             const response = await fetch("http://localhost:3000/api/v1/transferencias", {
//                 method: "post",
//                 body: JSON.stringify({
//                     emisor,
//                     receptor,
//                     monto,
//                 }),
//             });
//             const data = await response.json();
//             location.reload();
//         } catch (e) {
//             console.log(e);
//             alert("Algo salió mal..." + e);
//         }
//     });

//     const getUsuarios = async () => {
//         const response = await fetch("http://localhost:3000/api/v1/usuarios");
//         let data = await response.json();
//         $(".usuarios").html("");

//         $.each(data, (i, c) => {
//             $(".usuarios").append(`
//               <tr>
//                 <td>${c.nombre}</td>
//                 <td>${c.balance}</td>
//                 <td>
//                   <button
//                     class="btn btn-warning mr-2"
//                     data-toggle="modal"
//                     data-target="#exampleModal"
//                     onclick="setInfoModal('${c.nombre}', '${c.balance}', '${c.id}')"
//                   >
//                     Editar</button
//                   ><button class="btn btn-danger" onclick="eliminarUsuario('${c.id}')">Eliminar</button>
//                 </td>
//               </tr>
//          `);

//             $("#emisor").append(`<option value="${c.nombre}">${c.nombre}</option>`);
//             $("#receptor").append(`<option value="${c.nombre}">${c.nombre}</option>`);
//         });
//     };

//     const eliminarUsuario = async (id) => {
//         const response = await fetch(`http://localhost:3000/usuario?id=${id}`, {
//             method: "DELETE",
//         });
//         getUsuarios();
//     };

//     const getTransferencias = async () => {
//         const { data } = await axios.get("http://localhost:3000/api/v1/transferencias");
//         $(".transferencias").html("");

//         data.forEach((t) => {
//             $(".transferencias").append(`
//        <tr>
//          <td> ${formatDate(t[4])} </td>
//          <td> ${t[1]} </td>
//          <td> ${t[2]} </td>
//          <td> ${t[3]} </td>
//        </tr>
//      `);
//         });
//     };

//     getUsuarios();
//     // getTransferencias();

//     const formatDate = (date) => {
//         const dateFormat = moment(date).format("L");
//         const timeFormat = moment(date).format("LTS");
//         return `${dateFormat} ${timeFormat}`;
//     };
//     formatDate();
// });

const url = "/api/v1";
const tBody = document.querySelector("#tBody");
const tBodyTrans = document.querySelector("#tBodyTrans");
const formUser = document.querySelector("#formUser");
const formEdit = document.querySelector("#formEdit");
const formTrans = document.querySelector("#formTrans");

const myModal = new bootstrap.Modal(document.getElementById("modal"));

const getUsers = async () => {
    try {
        const { data } = await axios.get(url + "/usuarios");

        printUsers(data);
    } catch (error) {
        console.error("Error front===> ", error);
        return alert("Ups... algo salio mal");
    }
};

const printUsers = (data) => {
    tBody.textContent = "";

    data.forEach((item) => {
        const tr = document.createElement("tr");
        const tdName = document.createElement("td");
        const tdBalance = document.createElement("td");
        const tdbtnes = document.createElement("td");
        const btnEdit = document.createElement("button");
        const btnDelete = document.createElement("button");

        tdName.textContent = item.nombre;
        tdBalance.textContent = item.balance;

        btnEdit.textContent = "Editar";
        btnDelete.textContent = "Eliminar";

        btnEdit.classList.add("btn", "btn-warning", "btn-editar", "me-2");
        btnDelete.classList.add("btn", "btn-danger", "btn-eliminar");

        btnDelete.addEventListener("click", (e) => {
            if (confirm("¿Seguro quieres eliminar este usuario?")) {
                removeOne(e.target.dataset.email);
            }
        });

        btnEdit.addEventListener("click", (e) => {
            myModal.show();

            formEdit.first_name.value = item.first_name;
            formEdit.saldo.value = item.saldo;
        });

        tdbtnes.appendChild(btnEdit);
        tdbtnes.appendChild(btnDelete);

        tr.appendChild(tdName);
        tr.appendChild(tdBalance);
        tr.appendChild(tdbtnes);

        tBody.appendChild(tr);
    });
};

formUser.addEventListener("submit", async (e) => {
    e.preventDefault();
    const nombre = e.target.nombre.value;
    const balance = e.target.balance.value;

    if (!nombre.trim() || !balance.trim()) return alert("Todos los campos obligatorios");

    try {
        await axios.post(url + "/usuarios", {
            nombre,
            balance,
        });
        alert("Usuario agregado");
        getUsers();
    } catch (error) {
        console.error("Error front===> ", error);
        return alert("Ups... algo salio mal");
    }
});

// formOne.addEventListener("submit", async (e) => {
//     e.preventDefault();

//     const email = e.target.email.value;
//     if (!email) return alert("Campo obligatorio");

//     try {
//         const { data } = await axios.get(url + `/usuarios/${email}`);

//         printUsers(data);
//     } catch (error) {
//         console.error("Error front===> ", error);
//         return alert("Ups... algo salio mal");
//     }
// });

// const removeOne = async (email) => {
//     try {
//         await axios.delete(url + `/usuarios/${email}`);
//         getUsers();
//         alert("Usuario eliminado");
//     } catch (error) {
//         console.error("Error front===> ", error);
//         return alert("Ups... algo salio mal");
//     }
// };

// formEdit.addEventListener("submit", (e) => {
//     e.preventDefault();
//     updateOne(formEdit.dataset.email);
// });

// const updateOne = async (email) => {
//     try {
//         const first_name = formEdit.first_name.value;
//         const last_name = formEdit.last_name.value;
//         const email_user = formEdit.email.value;
//         const saldo = formEdit.saldo.value;

//         if (!first_name || !last_name || !email_user || !saldo) return alert("Todos los campos obligatorios");

//         const { data } = await axios.put(url + `/usuarios/${email}`, {
//             first_name,
//             last_name,
//             email: email_user,
//             saldo,
//         });

//         printUsers(data);
//         myModal.hide();
//         alert("Usuario editado");
//     } catch (error) {
//         console.error("Error front===> ", error);
//         return alert("Ups... algo salio mal");
//     }
// };

getUsers();

// -----------------------transacciones-----------------------

// const getTrans = async () => {
//     try {
//         const { data } = await axios.get(url + "/transacciones");
//         printTrans(data);
//     } catch (error) {
//         console.error("Error front===> ", error);
//         return alert("Ups... algo salio mal");
//     }
// };

// const printTrans = (data) => {
//     tBodyTrans.textContent = "";

//     data.forEach((item) => {
//         const tr = document.createElement("tr");
//         const tdID = document.createElement("td");
//         const tdOrigin = document.createElement("td");
//         const tdAmount = document.createElement("td");
//         const tdDestination = document.createElement("td");

//         tdID.textContent = item.id;
//         tdOrigin.textContent = item.email_origen;
//         tdAmount.textContent = item.monto_transferencia;
//         tdDestination.textContent = item.email_destino;

//         tr.appendChild(tdID);
//         tr.appendChild(tdOrigin);
//         tr.appendChild(tdAmount);
//         tr.appendChild(tdDestination);

//         tBodyTrans.appendChild(tr);
//     });
// };

// formTrans.addEventListener("submit", async (e) => {
//     e.preventDefault();

//     const email_origen = e.target.email_origen.value;
//     const monto_transferencia = e.target.monto_transferencia.value;
//     const email_destino = e.target.email_destino.value;

//     if (!email_origen.trim() || !monto_transferencia.trim() || !email_destino.trim())
//         return alert("Todos los campos obligatorios");

//     try {
//         await axios.post(url + "/transacciones", {
//             email_origen,
//             monto_transferencia,
//             email_destino,
//         });

//         getTrans();
//     } catch (error) {
//         console.error("Error front===> ", error);
//         return alert("Ups... algo salio mal");
//     }
// });

// formOneTrans.addEventListener("submit", async (e) => {
//     e.preventDefault();

//     const email = e.target.email.value;

//     if (!email.trim()) return alert("Campo obligatorio");

//     try {
//         const { data } = await axios.get(url + `/transacciones/${email}`);

//         printTrans(data);
//     } catch (error) {
//         console.error("Error front===> ", error);
//         return alert("Ups... algo salio mal");
//     }
// });

// getTrans();