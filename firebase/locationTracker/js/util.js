const utilFunctions = {
    /**
     * @description Función que retorna un UUID (Identificador Unico Universal)
     * @returns Un string del UUID recién generado
     */
    uuid: function () {
        function hex4() {
            return Math.floor(Math.random() * 65535).toString(16).padStart(4, '0');
        }

        return `${hex4()}${hex4()}-${hex4()}-${hex4()}-${hex4()}-${hex4()}${hex4()}${hex4()}`;
    }
};

export default utilFunctions;