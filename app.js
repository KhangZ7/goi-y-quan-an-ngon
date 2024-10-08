var map = L.map('map').setView([10.8231, 106.6297], 12); // Vị trí TP. Hồ Chí Minh

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

var routingControl = null; // Biến chứa điều hướng
var selectedMarker = null; // Biến lưu lại marker khi chọn nhà hàng
// Thông tin nhà hàng
var restaurantInfo = [
    { name: "Phở Bò - Quán A", address: "123 Lê Lợi, Quận 1", latlng: [10.7769, 106.7009], rating: "★★★★★", price: "50.000 - 100.000 VND", image: "https://via.placeholder.com/80" },
    { name: "Bún Chả - Quán B", address: "456 Nguyễn Huệ, Quận 1", latlng: [10.7752, 106.7070], rating: "★★★★★", price: "40.000 - 80.000 VND", image: "https://via.placeholder.com/80" },
    { name: "Bánh Xèo - Quán C", address: "789 Hai Bà Trưng, Quận 3", latlng: [10.7730, 106.6825], rating: "★★★★☆", price: "30.000 - 60.000 VND", image: "https://via.placeholder.com/80" },
    { name: "Cơm Tấm - Quán E", address: "234 Phan Xích Long, Quận Phú Nhuận", latlng: [10.7992, 106.6805], rating: "★★★★☆", price: "35.000 - 70.000 VND", image: "https://via.placeholder.com/80" },
    { name: "Mì Quảng - Quán D", address: "678 Lý Thường Kiệt, Quận 10", latlng: [10.7992, 106.7009], rating: "★★★★★", price: "45.000 - 90.000 VND", image: "https://via.placeholder.com/80" },
    { name: "Bánh Mì - Quán F", address: "456 Nguyễn Trãi, Quận 5", latlng: [10.7809, 106.7053], rating: "★★★★☆", price: "15.000 - 30.000 VND", image: "https://via.placeholder.com/80" },
    { name: "Bún Thịt Nướng - Quán G", address: "789 Phạm Văn Đồng, Quận Bình Thạnh", latlng: [10.8069, 106.7115], rating: "★★★★★", price: "50.000 - 100.000 VND", image: "https://via.placeholder.com/80" },
    { name: "Chả Giò - Quán H", address: "234 Hai Bà Trưng, Quận 3", latlng: [10.7852, 106.6999], rating: "★★★★★", price: "30.000 - 60.000 VND", image: "https://via.placeholder.com/80" },
    { name: "Lẩu Thái - Quán I", address: "678 Nguyễn Văn Trỗi, Quận Phú Nhuận", latlng: [10.7942, 106.6812], rating: "★★★★☆", price: "100.000 - 200.000 VND", image: "https://via.placeholder.com/80" },
    { name: "Mì Ý - Quán J", address: "789 Đinh Tiên Hoàng, Quận Bình Thạnh", latlng: [10.7723, 106.6949], rating: "★★★★☆", price: "50.000 - 120.000 VND", image: "https://via.placeholder.com/80" },
    { name: "Bánh Cuốn - Quán K", address: "123 Bà Huyện Thanh Quan, Quận 10", latlng: [10.7625, 106.6856], rating: "★★★★★", price: "20.000 - 50.000 VND", image: "https://via.placeholder.com/80" },
    { name: "Gỏi Cuốn - Quán L", address: "789 Nguyễn Huệ, Quận 1", latlng: [10.7778, 106.6999], rating: "★★★★☆", price: "30.000 - 60.000 VND", image: "https://via.placeholder.com/80" }
];

// Thêm các marker cho nhà hàng lên bản đồ
var markers = restaurantInfo.map((restaurant, index) => {
    var marker = L.marker(restaurant.latlng).bindPopup(`<b>${restaurant.name}</b><br>${restaurant.address}`);
    return marker;
});

// Xử lý sự kiện tìm kiếm nhà hàng
document.querySelector('.sidebar input').addEventListener('input', function() {
    const query = this.value.toLowerCase().trim();
    const restaurantItems = document.querySelectorAll('.restaurant-item');
    let results = 0;

    restaurantItems.forEach((item, index) => {
        const restaurantText = restaurantInfo[index].name.toLowerCase();
        if (restaurantText.includes(query)) {
            item.style.display = 'flex';
            results++;
        } else {
            item.style.display = 'none';
        }
    });

    document.getElementById('no-results').style.display = results === 0 ? 'block' : 'none';
});

// Xử lý sự kiện chọn nhà hàng từ danh sách
document.querySelectorAll('.restaurant-item').forEach(item => {
    item.addEventListener('click', function() {
        const index = this.getAttribute('data-index');
        
        // Xóa marker cũ nếu đã có
        if (selectedMarker) {
            map.removeLayer(selectedMarker);
        }
        
        // Tạo một marker mới cho vị trí nhà hàng được chọn
        selectedMarker = L.marker(restaurantInfo[index].latlng).addTo(map)
            .bindPopup(`<b>${restaurantInfo[index].name}</b><br>${restaurantInfo[index].address}`)
            .openPopup();
        
        map.setView(restaurantInfo[index].latlng, 15);
        showDetails(index); // Hiển thị chi tiết nhà hàng
    });
});

// Hiển thị chi tiết nhà hàng
function showDetails(index) {
    const restaurant = restaurantInfo[index];
    document.getElementById('restaurantImage').src = restaurant.image;
    document.getElementById('restaurantName').innerText = restaurant.name;
    document.getElementById('restaurantAddress').innerText = restaurant.address;
    document.getElementById('restaurantRating').innerText = restaurant.rating;
    document.getElementById('restaurantPrice').innerText = "Giá: " + restaurant.price;

    document.getElementById('detailPanel').style.display = 'block';
    document.getElementById('modalOverlay').style.display = 'block';

    // Tính toán đường đi từ vị trí hiện tại đến nhà hàng
    document.getElementById('directionButton').onclick = function() {
        calculateRoute(restaurant.latlng);
    };
}

document.getElementById('modalOverlay').addEventListener('click', function () {
    document.getElementById('detailPanel').style.display = 'none';
    document.getElementById('modalOverlay').style.display = 'none';
});

// Tính toán đường đi từ vị trí hiện tại
function calculateRoute(destinationLatLng) {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function(position) {
            const currentLatLng = [position.coords.latitude, position.coords.longitude];

            if (routingControl) {
                map.removeControl(routingControl);
            }

            routingControl = L.Routing.control({
                waypoints: [
                    L.latLng(currentLatLng),
                    L.latLng(destinationLatLng)
                ],
                routeWhileDragging: true
            }).addTo(map);

        }, function() {
            alert('Không thể xác định vị trí của bạn.');
        });
    } else {
        alert('Trình duyệt không hỗ trợ Geolocation');
    }
}

// Hiển thị vị trí hiện tại của người dùng trên bản đồ
map.locate({ setView: true, maxZoom: 16 });

document.getElementById('currentLocationButton').addEventListener('click', function () {
    map.locate({ setView: true, maxZoom: 16 });
});

map.on('locationfound', function (e) {
    L.marker(e.latlng).addTo(map).bindPopup("Bạn đang ở đây").openPopup();
});

map.on('locationerror', function () {
    alert("Không thể xác định vị trí của bạn.");
});