import { Container, Grid, Paper, TextField, Typography } from "@mui/material";
import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import { getDetallePresupuesto } from "../../api/presupuestos";

export const DetallePresupuestoPage: React.FC<{}> = () => {
    const location = useLocation();
    const numeroPresupuesto = location.state?.numeroPresupuesto;
    const [presupuesto, setPresupuesto] = useState({
        id: 0,
        numero_presupuesto: 0,
        cliente: "",
        fecha: "",
        vencimiento: "",
        moneda: "",
        cantidad: 0,
        precio: 0,
        observaciones: "",
        producto: "",
    });

    const detallePresupuesto = async () => {
        const data = await getDetallePresupuesto(numeroPresupuesto);
        setPresupuesto(data);
    }

    React.useEffect(() => {
        detallePresupuesto();
    }, []);

    return (
        <Container sx={{ mt: 9 }} maxWidth="xl">
            <Paper sx={{ padding: "1.2em", borderRadius: "0.5em", display: 'flex', flexDirection: 'column' }}>
                <Grid container direction="column" alignItems="center" justifyContent="center" spacing={2}>
                    <Typography sx={{ mt: 2 }} variant="h4">Detalle del presupuesto nro. {numeroPresupuesto}</Typography>
                </Grid>
                <Grid container direction="row" alignItems="left" justifyContent="left" spacing={2} sx={{ mt: 2 }}>
                    <TextField disabled fullWidth label="Cliente" value={presupuesto.cliente} InputProps={{ readOnly: true }} />
                </Grid>
                <Grid container direction="row" alignItems="left" justifyContent="left" spacing={2} sx={{ mt: 2 }}>
                    <TextField disabled label="Fecha" value={presupuesto.fecha} InputProps={{ readOnly: true }} />
                    <TextField disabled label="Vencimiento" value={presupuesto.vencimiento} InputProps={{ readOnly: true }} />
                </Grid>
                <Grid container direction="row" alignItems="left" justifyContent="left" spacing={2} sx={{ mt: 2 }}>
                    <TextField disabled fullWidth label="Producto" value={presupuesto.producto} InputProps={{ readOnly: true }} />
                </Grid>
                <Grid container direction="row" alignItems="left" justifyContent="left" spacing={2} sx={{ mt: 2 }}>
                    <TextField disabled label="Cantidad" value={presupuesto.cantidad} InputProps={{ readOnly: true }} />
                    <TextField disabled label="Precio" value={presupuesto.precio} InputProps={{ readOnly: true }} />
                    <TextField disabled label="Moneda" value={presupuesto.moneda} InputProps={{ readOnly: true }} />
                </Grid>
                <Grid container direction="row" alignItems="left" justifyContent="left" spacing={2} sx={{ mt: 2 }}>
                    <TextField
                        disabled 
                        fullWidth
                        multiline
                        rows={4}
                        label="Observaciones"
                        value={presupuesto.observaciones}
                        InputProps={{ readOnly: true }}
                    />
                </Grid>
            </Paper>
        </Container>
    );
}