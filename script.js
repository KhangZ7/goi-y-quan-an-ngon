// Chuyển đổi giữa form đăng nhập và đăng ký
function showForm(formId) {
    document.querySelectorAll('.form').forEach(form => form.classList.remove('active'));
    document.getElementById(formId).classList.add('active');

    document.querySelectorAll('.tab-button').forEach(button => button.classList.remove('active'));
    document.querySelector(`button[onclick="showForm('${formId}')"]`).classList.add('active');
}

// Kiểm tra và tạo tài khoản admin nếu chưa tồn tại
function createAdminAccount() {
    let users = JSON.parse(localStorage.getItem('users')) || [];

    // Kiểm tra xem admin đã tồn tại chưa
    const adminExists = users.find(user => user.username === 'User');

    if (!adminExists) {
        // Thêm tài khoản admin
        const adminUser = {
            username: 'Trịnh Vỹ Khang',
            email: 'khang@123.com',
            phone: '1234567890',  // Số điện thoại ví dụ
            password: 'admin123'  // Mật khẩu đã đặt sẵn
        };

        users.push(adminUser);
        localStorage.setItem('users', JSON.stringify(users));
        console.log('Tài khoản admin đã được tạo!');
    }
}

// Tạo tài khoản admin khi khởi chạy
createAdminAccount();

// Đăng ký tài khoản
document.getElementById('signupForm').addEventListener('submit', function(e) {
    e.preventDefault(); // Ngăn không cho form tải lại trang

    // Lấy giá trị từ các trường trong form đăng ký
    const username = document.querySelector('#signup-form input[placeholder="Tên tài khoản"]').value;
    const email = document.querySelector('#signup-form input[placeholder="Email"]').value;
    const phone = document.querySelector('#signup-form input[placeholder="Số điện thoại"]').value;
    const password = document.querySelector('#signup-form input[placeholder="Mật khẩu"]').value;
    const confirmPassword = document.querySelector('#signup-form input[placeholder="Xác nhận mật khẩu"]').value;

    // Kiểm tra mật khẩu xác nhận
    if (password !== confirmPassword) {
        alert("Mật khẩu xác nhận không khớp.");
        return;
    }

    // Kiểm tra xem email hoặc số điện thoại đã tồn tại chưa
    let users = JSON.parse(localStorage.getItem('users')) || [];
    const existingUser = users.find(u => u.email === email || u.phone === phone);
    if (existingUser) {
        alert("Email hoặc số điện thoại đã được sử dụng. Vui lòng sử dụng thông tin khác.");
        return;
    }

    // Tạo người dùng mới
    const newUser = {
        username: username,
        email: email,
        phone: phone,
        password: password
    };

    // Lưu người dùng mới vào localStorage
    users.push(newUser);
    localStorage.setItem('users', JSON.stringify(users));

    alert("Đăng ký thành công! Bạn có thể đăng nhập bằng tài khoản của mình.");
    window.location.href = "login.html"; // Chuyển hướng sau khi đăng ký thành công
});

// Đăng nhập tài khoản
document.getElementById('loginForm').addEventListener('submit', function(e) {
    e.preventDefault(); // Ngăn không cho form tải lại trang

    // Lấy giá trị từ form đăng nhập
    const loginInput = document.querySelector('#login-form input[placeholder="Email hoặc số điện thoại"]').value;
    const password = document.querySelector('#login-form input[placeholder="Mật khẩu"]').value;

    // Lấy danh sách người dùng từ localStorage
    let users = JSON.parse(localStorage.getItem('users')) || [];

    // Tìm người dùng bằng email hoặc số điện thoại và mật khẩu
    const user = users.find(u => (u.email === loginInput || u.phone === loginInput) && u.password === password);

    if (user) {
        // Đăng nhập thành công
        alert("Đăng nhập thành công!");

        // Lưu trạng thái đăng nhập và tên người dùng vào sessionStorage
        sessionStorage.setItem('loggedIn', true);
        sessionStorage.setItem('username', user.username);

        window.location.href = "index.html"; // Chuyển hướng đến trang bản đồ
    } else {
        // Đăng nhập thất bại
        alert("Email, số điện thoại hoặc mật khẩu không chính xác.");
    }
});
