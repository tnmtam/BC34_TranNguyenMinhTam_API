function Service() {
    this.getListProduct = function () {
        return axios({
            url: "https://62ff79619350a1e548df7941.mockapi.io/API/Product_api",
            method: "GET",
        });
    };

    this.deleteProductApi = function (id) {
        return axios({
            url: `https://62ff79619350a1e548df7941.mockapi.io/API/Product_api/${id}`,
            method: "DELETE",
        });
    };

    this.addProductApi = function (product) {
        return axios({
            url: "https://62ff79619350a1e548df7941.mockapi.io/API/Product_api",
            method: "POST",
            data: product,
        });
    };

    this.getProductById = function (id) {
        return axios({
            url: `https://62ff79619350a1e548df7941.mockapi.io/API/Product_api/${id}`,
            method: "GET",
        });
    };

    this.updateProductApi = function (product) {
        return axios({
            url: `https://62ff79619350a1e548df7941.mockapi.io/API/Product_api/${product.id}`,
            method: "PUT",
            data: product,
        });
    };
}