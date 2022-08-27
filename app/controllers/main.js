var service = new Service();
var validation = new Validation();

function getEle(id) {
    return document.getElementById(id);
};

function fetchData() {
    service
        .getListProduct()
        .then(function (result) {
            renderHTML(result.data);
        })
        .catch(function (error) {
            console.log(error);
        });
}

fetchData();

function renderHTML(data) {
    var content = ``;

    data.forEach(function (product, index) {
        content += `
            <tr>
                <td>${index + 1}</td>
                <td>${product.taiKhoan}</td>
                <td>${product.matKhau}</td>
                <td>${product.hoTen}</td>
                <td>${product.email}</td>
                <td>${product.ngonNgu}</td>
                <td>${product.loaiND}</td>
                <td>
                    <button class="btn btn-info" data-toggle="modal"
                    data-target="#myModal" onclick="editProduct(${product.id})">Edit</button>

                    <button class="btn btn-danger" onclick="deleteProduct(${product.id})">Delete</button>
                </td>
            </tr>
        `;
    });

    getEle("tblDanhSachNguoiDung").innerHTML = content;
}

/**
 * DELETE
 */

function deleteProduct(id) {
    service
        .deleteProductApi(id)
        .then(function() {
            fetchData();
        })
        .catch(function(error) {
            console.log(error);
        });
};

getEle("btnThemNguoiDung").addEventListener("click", function () {
    //Sửa Title
    document.getElementsByClassName("modal-title")[0].innerHTML = "Thêm Người Dùng";
  
    //Tạo nút "Add"
    var btnAdd = `<button class="btn btn-success" onclick="addProduct()">Add</button>`;
    document.getElementsByClassName("modal-footer")[0].innerHTML = btnAdd;
});

/**
 * Add product
 */

function addProduct() {
    var taiKhoan = getEle("TaiKhoan").value;
    var hoTen = getEle("HoTen").value;
    var matKhau = getEle("MatKhau").value;
    var email = getEle("Email").value;
    var ngonNgu = getEle("loaiNgonNgu").value;
    var loaiND = getEle("loaiNguoiDung").value;

    var isValid = true;
    //taiKhoan
    isValid &= validation.kiemTraRong(
        taiKhoan,
        "tbTK",
        "Vui lòng không để trống!"
    )
        && validation.kiemTraTaiKhoanTonTai(
            taiKhoan,
            "tbTK",
            "Tài khoản đã tồn tại ! Vui lòng nhập tài khoản mới !"
        );
    //hoTen
    isValid &= validation.kiemTraRong(
        hoTen,
        "tbHoten",
        "Vui lòng không để trống!"
    ) && validation.kiemTraKiTuChuoi(
        hoTen,
        "tbHoten",
        "Vui lòng không nhập số và kí tự đặc biệt !"
    );
    //matKhau
    isValid &= validation.kiemTraRong(
        matKhau,
        "tbMatKhau",
        "Vui lòng không để trống!"
    )
        && validation.kiemTraMatKhau(
            matKhau,
            "tbMatKhau",
            "Vui lòng nhập ít nhất 1 ký tự hoa, 1 ký tự đặc biệt, một kí tự số "
        )
        && validation.kiemTraDoDaiKiTu(
            matKhau,
            "tbMatKhau",
            "Vui lòng nhập 6-8 ký tự !",
            6,
            8
        );
    //email
    isValid &= validation.kiemTraRong(
        email,
        "tbEmail",
        "Vui lòng không để trống!"
    )
        && validation.kiemTraEmail(
            email,
            "tbEmail",
            "Vui lòng nhập đúng kiểu định dạng email! Vd: email@gmail.com"
        );
    //ngonNgu
    isValid &= validation.kiemTraLoaiNguoiDung(
        "loaiNgonNgu",
        "tbLoaiNgonNgu",
        "Vui lòng chọn ngôn ngữ !"
    );
    //nguoiDung
    isValid &= validation.kiemTraLoaiNguoiDung(
        "loaiNguoiDung",
        "tbLoaiNd",
        "Vui lòng chọn loại người dùng !"
    )
        && validation.kiemTraDoDaiKiTu(
            matKhau,
            "tbMatKhau",
            "Vui lòng nhập không quá 60 ký tự !",
            1,
            60
        );
    
   
    if (!isValid) return null;

    var product = new Product("", taiKhoan, hoTen, matKhau, email, ngonNgu, loaiND);

    service
        .addProductApi(product)
        .then(function() {
            fetchData();
        //Tắt hộp thoại modal
        document.getElementsByClassName("close")[0].click();
        })
        .catch(function(error) {
            console.log(error);
        });
};

/**
 * Edit product
 */

 function editProduct(id) {
    document.getElementsByClassName("modal-title")[0].innerHTML = "Update user";
  
    var btnUpdate = `<button class="btn btn-success" onclick="updateProduct(${id})">Update</button>`;
    document.getElementsByClassName("modal-footer")[0].innerHTML = btnUpdate;
  
    service.getProductById(id)
      .then(function(result){
        getEle("TaiKhoan").value = result.data.taiKhoan;
        getEle("HoTen").value = result.data.hoTen;
        getEle("MatKhau").value = result.data.matKhau;
        getEle("Email").value = result.data.email;
        getEle("loaiNgonNgu").value = result.data.ngonNgu;
        getEle("loaiNguoiDung").value = result.data.loaiND;
      })  
      .catch(function(error){
        console.log(error);
      });
  };
  
/**
 * Update Product
 */

 function updateProduct(id){
    var taiKhoan = getEle("TaiKhoan").value;
    var matKhau = getEle("MatKhau").value;
    var hoTen = getEle("HoTen").value;
    var email = getEle("Email").value;
    var ngonNgu = getEle("loaiNgonNgu").value;
    var loaiND = getEle("loaiNguoiDung").value;
  
    var product = new Product(id, taiKhoan, matKhau, hoTen, email, ngonNgu, loaiND);
  
    service.updateProductApi(product)
      .then(function() {
        fetchData();
        //Tắt hộp thoại modal
        document.getElementsByClassName("close")[0].click();
      })
      .catch(function(error){
        console.log(error);
      });
  }
