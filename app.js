var map = L.map('map').setView([10.8231, 106.6297], 12); // Vị trí TP. Hồ Chí Minh

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

var routingControl = null; // Biến chứa điều hướng
var selectedMarker = null; // Biến lưu lại marker khi chọn nhà hàng
// Thông tin nhà hàng
var restaurantInfo = [
    { 
        name: "Phở Bò Huỳnh Đức", 
        address: "123 Lê Lợi, Quận 1", 
        latlng: [10.7769, 106.7009], 
        rating: "★★★★★", 
        price: "50.000 - 100.000 VND", 
        image: "https://via.placeholder.com/80", 
        hours: "Cả ngày", 
        menu: [
            { 
                name: "Phở tái", 
                price: "60.000 VND", 
                image: "https://via.placeholder.com/80"
            },
            { 
                name: "Phở nạm", 
                price: "70.000 VND", 
                image: "https://via.placeholder.com/80"
            },
            { 
                name: "Phở Đặt Biệt", 
                price: "100.000 VND", 
                image: "https://via.placeholder.com/80"
            },
            { 
                name: "Trà đá", 
                price: "10.000 VND", 
                image: "https://via.placeholder.com/80"
            }
        ]
    },
    { 
        name: "Bún Chả Hoài", 
        address: "456 Nguyễn Huệ, Quận 1", 
        latlng: [10.7752, 106.7070], 
        rating: "★★★★★", 
        price: "40.000 - 80.000 VND", 
        image: "https://via.placeholder.com/80", 
        hours: "Mở: 6:00 - Đóng: 10:00", 
        menu: [
            { 
                name: "Bún chả truyền thống", 
                price: "50.000 VND", 
                image: "https://via.placeholder.com/80"
            },
            { 
                name: "Nem rán", 
                price: "45.000 VND", 
                image: "https://via.placeholder.com/80"
            },
            { 
                name: "Nước sâm", 
                price: "10.000 VND", 
                image: "https://via.placeholder.com/80"
            }
        ]
    },
    { 
        name: "Bánh Xèo Tú", 
        address: "789 Hai Bà Trưng, Quận 3", 
        latlng: [10.7730, 106.6825], 
        rating: "★★★★☆", 
        price: "16.000 - 60.000 VND", 
        image: "https://via.placeholder.com/80", 
        hours: "Mở: 9:00 - 20:00", 
        menu: [
            { 
                name: "Bánh xèo miền Tây", 
                price: "40.000 VND", 
                image: "https://via.placeholder.com/80"
            },
            { 
                name: "Bánh xèo tôm", 
                price: "45.000 VND", 
                image: "https://via.placeholder.com/80"
            },
            { 
                name: "Trà tắc", 
                price: "15.000 VND", 
                image: "https://via.placeholder.com/80"
            }
        ]
    },
    { 
        name: "Cơm Tấm Sà Bì Chưởng", 
        address: "179 Trần Bình Trọng, Phường 3, Quận 5", 
        latlng: [10.7625, 106.6795], 
        rating: "★★★★★", 
        price: "35.000 - 99.000 VND", 
        image: "com-tam-sa-bi-chuong.png", 
        hours: "Mở: 7:00 - Đóng: 22:00", 
        menu: [
            { 
                name: "Combo Sườn Cốt Lếch Đặt Biệt", 
                price: "89.000 VND", 
                image: "suon-cot-lech.png"
            },
            { 
                name: "Combo Sườn Cây Đặt Biệt", 
                price: "99.000 VND", 
                image: "suon-cay.png"
            }
        ]
    },
    { 
        name: "Mì Quảng Hữu Nghị", 
        address: "678 Lý Thường Kiệt, Quận 10", 
        latlng: [10.7992, 106.7009], 
        rating: "★★★★★", 
        price: "35.000 - 55.000 VND", 
        image: "https://via.placeholder.com/80", 
        hours: "Mở: 6:00 - Đóng: 8:30", 
        menu: [
            { 
                name: "Mì quảng tôm thịt", 
                price: "50.000 VND", 
                image: "https://via.placeholder.com/80"
            },
            { 
                name: "Mì quảng gà", 
                price: "45.000 VND", 
                image: "https://via.placeholder.com/80"
            },
            { 
                name: "Nước ngọt các loại", 
                price: "15.000 VND", 
                image: "https://via.placeholder.com/80"
            }
        ]
    },
    { 
        name: "Bánh Mì Hồng Ngọc", 
        address: "456 Nguyễn Trãi, Quận 5", 
        latlng: [10.7809, 106.7053], 
        rating: "★★★★☆", 
        price: "15.000 - 30.000 VND", 
        image: "https://via.placeholder.com/80", 
        hours: "Mở: 7:30 - Đóng: 17:00", 
        menu: [
            { 
                name: "Bánh mì thịt", 
                price: "25.000 VND", 
                image: "https://via.placeholder.com/80"
            },
            { 
                name: "Bánh mì trứng", 
                price: "20.000 VND", 
                image: "https://via.placeholder.com/80"
            },
            { 
                name: "Bánh mì đặt biệt", 
                price: "30.000 VND", 
                image: "https://via.placeholder.com/80"
            }
        ]
    },
    { 
        name: "Bún Thịt Nướng Cô Hoa", 
        address: "789 Phạm Văn Đồng, Quận Bình Thạnh", 
        latlng: [10.8069, 106.7115], 
        rating: "★★★★★", 
        price: "30.000 - 65.000 VND", 
        image: "https://via.placeholder.com/80", 
        hours: "Cả ngày", 
        menu: [
            { 
                name: "Bún thịt nướng", 
                price: "40.000 VND", 
                image: "https://via.placeholder.com/80"
            },
            { 
                name: "Chả giò", 
                price: "25.000 VND", 
                image: "https://via.placeholder.com/80"
            },
            { 
                name: "Trà tắc", 
                price: "15.000 VND", 
                image: "https://via.placeholder.com/80"
            }
        ]
    },
    { 
        name: "Chả Giò Chú Ba", 
        address: "234 Hai Bà Trưng, Quận 3", 
        latlng: [10.7852, 106.6999], 
        rating: "★★★★★", 
        price: "30.000 - 60.000 VND", 
        image: "https://via.placeholder.com/80", 
        hours: "Không cố định", 
        menu: [
            { 
                name: "Chả giò rế", 
                price: "40.000 VND", 
                image: "https://via.placeholder.com/80"
            },
            { 
                name: "Chả giò nem", 
                price: "35.000 VND", 
                image: "https://via.placeholder.com/80"
            },
            { 
                name: "Trà đá", 
                price: "10.000 VND", 
                image: "https://via.placeholder.com/80"
            }
        ]
    },
    { 
        name: "Lẩu Thái Cô Ba", 
        address: "678 Nguyễn Văn Trỗi, Quận Phú Nhuận", 
        latlng: [10.7942, 106.6812], 
        rating: "★★★★☆", 
        price: "100.000 - 200.000 VND", 
        image: "https://via.placeholder.com/80", 
        hours: "Mở: 9:00 - Đóng: 23:00", 
        menu: [
            { 
                name: "Lẩu thái hải sản", 
                price: "150.000 VND", 
                image: "https://via.placeholder.com/80"
            },
            { 
                name: "Lẩu thái chua cay", 
                price: "170.000 VND", 
                image: "https://via.placeholder.com/80"
            }
        ]
    },
    { 
        name: "Mì Ý Bumma", 
        address: "789 Đinh Tiên Hoàng, Quận Bình Thạnh", 
        latlng: [10.7723, 106.6949], 
        rating: "★★★★☆", 
        price: "50.000 - 120.000 VND", 
        image: "https://via.placeholder.com/80", 
        hours: "Mở: 8:00 - Đóng: 21:00", 
        menu: [
            { 
                name: "Mì ý sốt bò bằm", 
                price: "80.000 VND", 
                image: "https://via.placeholder.com/80"
            },
            { 
                name: "Mì ý sốt kem", 
                price: "90.000 VND", 
                image: "https://via.placeholder.com/80"
            }
        ]
    },
    { 
        name: "Bánh Cuốn Tuyết", 
        address: "123 Bà Huyện Thanh Quan, Quận 10", 
        latlng: [10.7625, 106.6856], 
        rating: "★★★★★", 
        price: "25.000 - 50.000 VND", 
        image: "https://via.placeholder.com/80", 
        hours: "Không cố định", 
        menu: [
            { 
                name: "Bánh cuốn chả lụa", 
                price: "40.000 VND", 
                image: "https://via.placeholder.com/80"
            },
            { 
                name: "Bánh cuốn thịt nướng", 
                price: "45.000 VND", 
                image: "https://via.placeholder.com/80"
            }
        ]
    },
    { 
        name: "Gỏi Cuốn Bà Cụ", 
        address: "789 Nguyễn Huệ, Quận 1", 
        latlng: [10.7778, 106.6999], 
        rating: "★★★★☆", 
        price: "6.000 - 60.000 VND", 
        image: "https://via.placeholder.com/80", 
        hours: "Mở: 9h - Đóng: 15:30", 
        menu: [
            { 
                name: "Gỏi cuốn tôm", 
                price: "6.000 VND/cái", 
                image: "https://via.placeholder.com/80"
            },
            { 
                name: "Gỏi cuốn thịt", 
                price: "7.000 VND/cái", 
                image: "https://via.placeholder.com/80"
            }
        ]
    }
];
// Dữ liệu đánh giá cho 12 quán ăn
const restaurantReviews = {
    "Phở Bò Huỳnh Đức": [
        {
            name: "Đoàn Thị Hồng Hạnh",
            rating: 5,
            time: "2 ngày trước",
            content: "Phở ngon, phục vụ tốt nhưng hơi đông khách!",
            userImage: "https://via.placeholder.com/50",
        },
        {
            name: "Tramie's Diary",
            rating: 5,
            time: "2 tháng trước",
            content: "Rất hài lòng với món phở, quán sạch sẽ và thoải mái.",
            userImage: "https://via.placeholder.com/50",
        }
    ],
    "Bún Chả Hoài": [
        {
            name: "Nguyễn Minh Tuấn",
            rating: 4,
            time: "1 tuần trước",
            content: "Bún chả ăn ổn, giá hơi cao một chút so với chất lượng.",
            userImage: "https://via.placeholder.com/50",
        },
        {
            name: "Lan Phương",
            rating: 4,
            time: "1 tháng trước",
            content: "Quán hơi chật nhưng bún chả ngon, nước chấm vừa miệng.",
            userImage: "https://via.placeholder.com/50",
        }
    ],
    "Bánh Xèo Tú": [
        {
            name: "Hà Anh",
            rating: 4,
            time: "3 ngày trước",
            content: "Bánh xèo giòn, nước mắm pha rất vừa. Sẽ quay lại lần sau.",
            userImage: "https://via.placeholder.com/50",
        },
        {
            name: "Minh Tuyết",
            rating: 4,
            time: "2 tuần trước",
            content: "Phục vụ nhanh, bánh xèo ngon nhưng hơi ít thịt.",
            userImage: "https://via.placeholder.com/50",
        }
    ],
    "Cơm Tấm Sà Bì Chưởng": [
        {
            name: "Tuấn Kiệt",
            rating: 5,
            time: "1 ngày trước",
            content: "Cơm tấm ngon, sườn nướng thơm. Phần ăn lớn, giá hợp lý.",
            userImage: "av-nam1.png",
        },
        {
            name: "Hoàn",
            rating: 5,
            time: "2 ngày trước",
            content: "Nhân viên phục vụ tận tâm, cơm tấm ngon, nhất định sẽ ghé tới lần tiếp theo.",
            userImage: "av-nam2.png",
        },
        {
            name: "Ngọc Thảo",
            rating: 5,
            time: "1 tuần trước",
            content: "Quán quen từ lâu, món ăn vẫn giữ được hương vị như trước.",
            userImage: "av-nu.png",
        }
    ],
    "Mì Quảng Hữu Nghị": [
        {
            name: "Hữu Phước",
            rating: 5,
            time: "3 ngày trước",
            content: "Mì quảng ngon, nước lèo đậm đà, vị chuẩn miền Trung.",
            userImage: "https://via.placeholder.com/50",
        },
        {
            name: "Kim Ngân",
            rating: 5,
            time: "2 tuần trước",
            content: "Không gian rộng rãi, món ăn ngon và giá hợp lý.",
            userImage: "https://via.placeholder.com/50",
        }
    ],
    "Bánh Mì Hồng Ngọc": [
        {
            name: "Phương Thanh",
            rating: 5,
            time: "4 ngày trước",
            content: "Bánh mì ngon, giòn rụm, nhân đầy đặn và giá hợp lý.",
            userImage: "https://via.placeholder.com/50",
        },
        {
            name: "Tấn Tài",
            rating: 3,
            time: "3 tuần trước",
            content: "Bánh mì ngon nhưng phục vụ hơi chậm vào giờ cao điểm.",
            userImage: "https://via.placeholder.com/50",
        }
    ],
    "Bún Thịt Nướng Cô Hoa": [
        {
            name: "Thu Hà",
            rating: 5,
            time: "2 ngày trước",
            content: "Bún thịt nướng rất ngon, thịt mềm và nước chấm rất vừa miệng.",
            userImage: "https://via.placeholder.com/50",
        },
        {
            name: "Nhật Minh",
            rating: 5,
            time: "1 tháng trước",
            content: "Lần nào đến ăn cũng hài lòng. Thịt nướng thơm ngon.",
            userImage: "https://via.placeholder.com/50",
        }
    ],
    "Chả Giò Chú Ba": [
        {
            name: "Ngọc Minh",
            rating: 5,
            time: "1 ngày trước",
            content: "Chả giò giòn, nhân đầy đặn. Ăn kèm rau sống rất ngon.",
            userImage: "https://via.placeholder.com/50",
        },
        {
            name: "Quang Anh",
            rating: 5,
            time: "1 tuần trước",
            content: "Chả giò ngon nhưng hơi ít nước chấm. Nhân viên nhiệt tình.",
            userImage: "https://via.placeholder.com/50",
        }
    ],
    "Lẩu Thái Cô Ba": [
        {
            name: "Trọng Nghĩa",
            rating: 4,
            time: "2 ngày trước",
            content: "Lẩu Thái ngon, hương vị chua cay đúng chuẩn. Món nhúng tươi ngon.",
            userImage: "https://via.placeholder.com/50",
        },
        {
            name: "Bích Ngọc",
            rating: 4,
            time: "1 tuần trước",
            content: "Quán phục vụ nhanh, không gian thoáng mát. Lẩu Thái rất ngon.",
            userImage: "https://via.placeholder.com/50",
        }
    ],
    "Mì Ý Bumma": [
        {
            name: "Hoàng Phúc",
            rating: 5,
            time: "3 ngày trước",
            content: "Mì Ý ngon, sốt vừa miệng, không gian ấm cúng, phục vụ tốt.",
            userImage: "https://via.placeholder.com/50",
        },
        {
            name: "Thanh Hà",
            rating: 3,
            time: "2 tuần trước",
            content: "Mì Ý ngon nhưng chờ hơi lâu vào giờ cao điểm.",
            userImage: "https://via.placeholder.com/50",
        }
    ],
    "Bánh Cuốn Tuyết": [
        {
            name: "Minh Khang",
            rating: 5,
            time: "1 ngày trước",
            content: "Bánh cuốn ngon, nước chấm tuyệt vời. Quán sạch sẽ, giá hợp lý.",
            userImage: "https://via.placeholder.com/50",
        },
        {
            name: "Bảo Châu",
            rating: 5,
            time: "1 tháng trước",
            content: "Quán hơi đông nhưng bánh cuốn rất ngon, nước chấm vừa miệng.",
            userImage: "https://via.placeholder.com/50",
        }
    ],
    "Gỏi Cuốn Bà Cụ": [
        {
            name: "Thanh Vân",
            rating: 4,
            time: "3 ngày trước",
            content: "Gỏi cuốn ngon, nước chấm đậm đà. Giá hợp lý cho sinh viên.",
            userImage: "https://via.placeholder.com/50",
        },
        {
            name: "Duy Khang",
            rating: 4,
            time: "1 tuần trước",
            content: "Gỏi cuốn tuyệt vời, nước chấm ngon, phục vụ nhanh và thân thiện.",
            userImage: "https://via.placeholder.com/50",
        }
    ]
};
// Hàm hiển thị đánh giá của từng quán
function showReviews(restaurantName) {
    const reviews = restaurantReviews[restaurantName] || [];
    const reviewList = document.querySelector('.review-list');
    const reviewSummary = document.querySelector('.review-summary h3');

    reviewList.innerHTML = '';  // Xóa các đánh giá cũ

    if (reviews.length > 0) {
        reviewSummary.innerText = `${calculateAverageRating(reviews)} ★ (${reviews.length} đánh giá)`;

        reviews.forEach(review => {
            const reviewItem = document.createElement('div');
            reviewItem.classList.add('review-item');

            reviewItem.innerHTML = `
                <img src="${review.userImage}" alt="${review.name}">
                <div class="review-info">
                    <h4>${review.name}</h4>
                    <div class="review-details">
                        <span class="stars">${'★'.repeat(review.rating)}${'☆'.repeat(5 - review.rating)}</span>
                        <span class="review-time">${review.time}</span>
                        <p>${review.content}</p>
                    </div>
                </div>
            `;

            reviewList.appendChild(reviewItem);
        });
    } else {
        reviewSummary.innerText = "Chưa có đánh giá nào";
    }
}
// Lấy tất cả các phần tử sao
const stars = document.querySelectorAll('.rating-stars .star');

// Thêm sự kiện khi người dùng nhấn vào từng sao
stars.forEach(star => {
    star.addEventListener('click', () => {
        // Xóa các lớp selected từ tất cả các sao
        stars.forEach(s => s.classList.remove('selected'));
        
        // Thêm lớp selected cho các sao đã chọn
        star.classList.add('selected');
        const ratingValue = star.getAttribute('data-value');
        
        // Đánh dấu các sao trước đó cũng được chọn
        for (let i = 0; i < ratingValue; i++) {
            stars[i].classList.add('selected');
        }

        console.log("User rating:", ratingValue); // Bạn có thể lưu giá trị này vào cơ sở dữ liệu hoặc xử lý thêm
    });
});

// Hàm tính toán trung bình rating của quán ăn
function calculateAverageRating(reviews) {
    const totalRating = reviews.reduce((sum, review) => sum + review.rating, 0);
    return (totalRating / reviews.length).toFixed(1);
}

// Thêm các marker cho nhà hàng lên bản đồ
var markers = restaurantInfo.map((restaurant, index) => {
    var marker = L.marker(restaurant.latlng).bindPopup(`<b>${restaurant.name}</b><br>${restaurant.address}`);
    return marker;
});


// Lấy các phần tử liên quan
const searchInput = document.getElementById('searchInput');
const sidebar = document.getElementById('sidebar');
const restaurantItems = document.querySelectorAll('.restaurant-item');
const noResults = document.getElementById('no-results');

// Xử lý sự kiện khi người dùng nhập thông tin tìm kiếm
searchInput.addEventListener('input', function () {
    const query = searchInput.value.toLowerCase().trim();
    let results = 0;

    // Duyệt qua từng nhà hàng để kiểm tra kết quả tìm kiếm
    restaurantItems.forEach(item => {
        const restaurantText = item.textContent.toLowerCase();
        if (restaurantText.includes(query)) {
            item.style.display = 'flex';
            results++;
        } else {
            item.style.display = 'none';
        }
    });

    // Kiểm tra nếu có kết quả hoặc ô tìm kiếm không trống
    if (query !== '') {
        if (results > 0) {
            sidebar.classList.add('active'); // Hiển thị sidebar nếu có kết quả
            noResults.style.display = 'none'; // Ẩn thông báo không có kết quả
        } else {
            sidebar.classList.add('active'); // Hiển thị sidebar
            noResults.style.display = 'block'; // Hiển thị thông báo không có kết quả
        }
    } else {
        sidebar.classList.remove('active'); // Ẩn sidebar nếu ô tìm kiếm trống
        noResults.style.display = 'none'; // Ẩn thông báo khi không có nội dung tìm kiếm
    }
});




// Xử lý sự kiện chọn nhà hàng từ danh sách
document.querySelectorAll('.restaurant-item').forEach(item => {
    item.addEventListener('click', function() {
        const index = this.getAttribute('data-index');
        const restaurantName = this.querySelector('.restaurant-info h4').innerText;
        showReviews(restaurantName); // Hiển thị đánh giá của quán ăn được chọn
        // Xóa marker cũ nếu đã có
        if (selectedMarker) {
            map.removeLayer(selectedMarker);
        }
        
        // Tạo một marker mới cho vị trí nhà hàng được chọn
        selectedMarker = L.marker(restaurantInfo[index].latlng).addTo(map)
            .bindPopup(`
                <b>${restaurantInfo[index].name}</b><br>
                ${restaurantInfo[index].address}<br>
                <button onclick="showDetails(${index})" style="margin-top: 5px; padding: 5px 10px; background-color: #4CAF50; color: white; border: none; border-radius: 5px; cursor: pointer;">Xem chi tiết</button>
            `)
            .openPopup();
        
        // Di chuyển bản đồ đến vị trí nhà hàng được chọn
        map.setView(restaurantInfo[index].latlng, 15);
    });
});

// Xử lý sự kiện chuyển đổi giữa các tab
const tabButtons = document.querySelectorAll('.tab-button');
const tabContents = document.querySelectorAll('.tab-content');

tabButtons.forEach(button => {
    button.addEventListener('click', () => {
        // Xóa trạng thái active của tất cả các tab
        tabButtons.forEach(btn => btn.classList.remove('active'));
        tabContents.forEach(content => content.classList.remove('active'));

        // Kích hoạt tab được chọn
        button.classList.add('active');
        document.getElementById(button.getAttribute('data-tab')).classList.add('active');
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

    // Cập nhật giờ hoạt động và hiển thị chúng
    const hoursElement = document.getElementById('restaurantHours');
    hoursElement.innerHTML = `<span>Giờ hoạt động: ${restaurant.hours} <span style="color: orange;">(Giờ hoạt động có thể không chính xác)</span></span>`;
    
    // Cập nhật thực đơn của nhà hàng
    const menuElement = document.getElementById('restaurantMenu');
    menuElement.innerHTML = ''; // Xóa các món ăn cũ

    // Thêm các món ăn vào thực đơn với ảnh và giá
    restaurant.menu.forEach(dish => {
        const div = document.createElement('div');
        div.classList.add('menu-item'); // Thêm class 'menu-item'
        div.innerHTML = `
            <img src="${dish.image}" alt="${dish.name}">
            <div class="menu-info">
                <h4>${dish.name}</h4>
                <p>${dish.price}</p>
            </div>
        `;
        menuElement.appendChild(div);
    });
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
            // Ẩn chi tiết nhà hàng khi tính toán đường đi
            document.getElementById('detailPanel').style.display = 'none';
            document.getElementById('modalOverlay').style.display = 'none';
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
    // Lấy tên người dùng từ sessionStorage
window.onload = function() {
    const username = sessionStorage.getItem('username');
    
    if (username) {
        // Kiểm tra nếu người dùng là tài khoản admin
        if (username === 'Trịnh Vỹ Khang') {
            document.getElementById('user-name').textContent = "Trịnh Vỹ Khang";
        } else {
            document.getElementById('user-name').textContent = username;
        }
    }
    // Xử lý sự kiện đăng xuất
    document.getElementById('logout').addEventListener('click', function() {
        sessionStorage.clear();  // Xóa tất cả dữ liệu lưu trữ trong sessionStorage
        alert("Bạn đã đăng xuất thành công!");
        window.location.href = "login.html";  // Chuyển hướng về trang đăng nhập
    });
    };
    function toggleHistoryDetails(element) {
        const details = element.querySelector('.history-details');
        if (details.style.display === 'none' || !details.style.display) {
            details.style.display = 'block';
        } else {
            details.style.display = 'none';
        }
    }

    document.getElementById('historyUsage').addEventListener('click', function(event) {
        event.preventDefault();

        // Hiển thị sidebar lịch sử sử dụng
        document.getElementById('historyUsageSidebar').style.display = 'block';
    
        // Hiển thị overlay để tạo hiệu ứng làm mờ nền
        document.getElementById('modalOverlay').style.display = 'block';
    });
    
    // Ẩn sidebar khi nhấn vào overlay
    document.getElementById('modalOverlay').addEventListener('click', function () {
        document.getElementById('historyUsageSidebar').style.display = 'none';
        document.getElementById('modalOverlay').style.display = 'none';
    });
    
    function toggleHistoryDetails(element) {
        const details = element.querySelector('.history-details');
        if (details.style.display === 'none' || !details.style.display) {
            details.style.display = 'block';
        } else {
            details.style.display = 'none';
        }
    }
    
    document.querySelectorAll('.history-item').forEach(item => {
        item.addEventListener('click', function() {
            toggleHistoryDetails(item);
        });
    });
    
    function filterHistoryByDate() {
        const filterValue = document.getElementById('filterDate').value;
        const today = new Date();
        const historyItems = document.querySelectorAll('.history-item');
    
        historyItems.forEach(item => {
            const itemDate = new Date(item.getAttribute('data-date'));
            let showItem = false;
    
            if (filterValue === 'all') {
                showItem = true;
            } else if (filterValue === 'today') {
                showItem = itemDate.toDateString() === today.toDateString();
            } else if (filterValue === 'week') {
                const oneWeekAgo = new Date();
                oneWeekAgo.setDate(today.getDate() - 7);
                showItem = itemDate >= oneWeekAgo && itemDate <= today;
            } else if (filterValue === 'month') {
                const oneMonthAgo = new Date();
                oneMonthAgo.setMonth(today.getMonth() - 1);
                showItem = itemDate >= oneMonthAgo && itemDate <= today;
            }
    
            item.style.display = showItem ? 'block' : 'none';
        });
    }
    