export const handleErrors = async (error) => {
    if (error.code) {
        switch (error.code) {
            case "23502":
                return {
                    code: 400,
                    msg: "Campo obligatorio",
                };
            case "23505":
                return {
                    code: 400,
                    msg: "el registro ya existe",
                };
            case "22P02":
                return {
                    code: 400,
                    msg: "dato no compatible",
                };
            case "23514":
                return {
                    code: 400,
                    msg: "Libro sin stock",
                };
            case "42601":
                return {
                    code: 400,
                    msg: "Error de sintaxis",
                };

            default:
                return {
                    code: 500,
                    msg: "Falló postgres",
                };
        }
    }
    return {
        code: 500,
        msg: "Error del servidor",
    };
};
