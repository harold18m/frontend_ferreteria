<template>
    <div>
        <p>FERRETERIA VIRGEN DE GUADALUPE</p>
        <p> Telf: 975 495 081 / 943 367 808</p>
        <p> PROFORMA:   { numero_proforma }</p>
        <p> FECHA:   { fecha }</p>
        <p> CLIENTE: { cliente}  </p>
        <p> DIRE: { direccion }</p>
        <table>
            <tr>
                <th>CANT</th>
                <th>DESCRIPCION</th>
                <th>P. UNIT</th>
                <th>IMPORTE</th>
            </tr>
        <tbody>
            <tr>
                <td>{ cantidad }</td>
                <td>{ descripcion }</td>
                <td>{ precio_unitario }</td>
                <td>{ importe }</td>
            </tr>
            </tbody>
        </table> 
        <p> Total a pagar : { importe_total }</p>
        <p> GRACIAS POR SU PREFERENCIA !! </p>
        <p> No hay devoluciones</p>
    </div>
</template>
