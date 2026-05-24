// Định nghĩa hàm togglePass có nhiệm vụ ẩn hoặc hiện ký tự mật khẩu khi bấm nút
function togglePass() {
  // Tóm lấy phần tử ô nhập liệu mật khẩu thông qua ID duy nhất của nó
  let passField = document.getElementById("password");

  // Kiểm tra tính hợp lệ: Chỉ chạy lệnh nếu phần tử này thực sự tồn tại trên trang hiện tại
  if (passField) {
    // ĐÃ SỬA LỖI: Sử dụng toán tử so sánh nghiêm ngặt '===' để kiểm tra kiểu loại dữ liệu
    // (Thay thế cho lỗi dùng dấu '=' đơn của đề bài - vốn là phép gán trị khiến code sai logic)
    if (passField.type === "password") {
      // Nếu đang ẩn (kiểu password), tiến hành đổi thuộc tính sang dạng văn bản thường 'text' để hiện chữ
      passField.type = "text";
    } else {
      // Ngược lại, nếu đang hiện chữ, tiến hành đổi ngược về dạng 'password' để ẩn ký tự đi
      passField.type = "password";
    }
  }
}

// Khởi tạo một biến toàn cục dùng để đếm tổng số buổi tập luyện được người dùng ghi nhận thành công
let totalSessions = 0;
// Tóm lấy phần tử thẻ biểu mẫu Form thông qua ID 'workoutForm'
const workoutForm = document.getElementById("workoutForm");

// Chỉ kích hoạt toàn bộ logic xử lý sự kiện nếu tìm thấy Form này trên trang hiện hành (Tránh lỗi đa trang)
if (workoutForm) {
  // Đăng ký sự kiện lắng nghe hành vi gửi dữ liệu (submit) của người dùng lên Form này
  workoutForm.addEventListener("submit", function (e) {
    // Lệnh cực kỳ quan trọng ngăn chặn hành vi tải lại trang (reload) mặc định của trình duyệt để giữ lại dữ liệu
    e.preventDefault();

    // 1. Tiến hành thu thập toàn bộ dữ liệu người dùng vừa nhập vào các ô input trong form
    const studentId = document.getElementById("studentId").value.trim(); // Lấy mã số sinh viên và cắt bỏ khoảng trắng thừa
    const exercise = document.getElementById("exercise").value; // Lấy tên bài tập được chọn (Xà đơn hoặc Xà kép)
    const hours = document.getElementById("hours").value; // Lấy lượng thời gian số giờ tập
    const minutes = document.getElementById("minutes").value; // Lấy lượng thời gian số phút tập
    const calories = document.getElementById("calories").value; // Lấy chỉ số năng lượng Calo tiêu thụ

    // 2. Định dạng chuỗi ghép ghép nối dữ liệu số giờ và số phút thành chuỗi văn bản hoàn chỉnh
    const timeString = `${hours} giờ ${minutes} phút`;

    // 3. Khởi tạo một phần tử hàng mới (thẻ <tr>) trống trong bộ nhớ để chuẩn bị nạp dữ liệu vào bảng
    const newRow = document.createElement("tr");
    // Sử dụng Template Literal điền chuỗi HTML cấu trúc các ô dữ liệu (<td>) chứa các biến thu thập được ở trên
    newRow.innerHTML = `
            <td><strong>${studentId}</strong></td>
            <td>${exercise}</td>
            <td>${timeString}</td>
            <td>${calories}</td>
        `;

    // Lấy phần tử thân bảng dữ liệu nơi sẽ tiếp nhận hàng thông tin mới
    const tableBody = document.getElementById("tableBody");
    // Sử dụng hàm hàm .slice(-1) để cắt lấy duy nhất một ký tự cuối cùng của chuỗi mã số sinh viên vừa nhập
    const lastChar = studentId.slice(-1);
    // Chuyển đổi ký tự cắt được từ dạng chuỗi văn bản sang định dạng số nguyên cơ số 10 (parseInt)
    const lastDigit = parseInt(lastChar, 10);

    // Kiểm tra xem ký tự cuối cùng có thực sự là một con số hợp lệ hay không (tránh lỗi người dùng nhập chữ cái)
    if (!isNaN(lastDigit)) {
      // Sử dụng phép chia lấy dư (%) cho 2 để kiểm tra tính chẵn lẻ của số cuối mã sinh viên
      if (lastDigit % 2 !== 0) {
        // Thuật toán Đề bài: Nếu là số LẺ -> Sử dụng hàm .prepend() để chèn đẩy dòng dữ liệu lên ĐẦU bảng
        tableBody.prepend(newRow);
      } else {
        // Thuật toán Đề bài: Nếu là số CHẴN -> Sử dụng hàm .append() để chèn nối dòng dữ liệu vào CUỐI bảng
        tableBody.append(newRow);
      }
    } else {
      // Trường hợp dự phòng nếu ký tự cuối không phải là số, hệ thống tự động đẩy xuống cuối bảng để tránh lỗi mạch code
      tableBody.append(newRow);
    }

    totalSessions++; // Tăng biến đếm tổng số buổi tập luyện lên thêm 1 đơn vị sau mỗi lần nạp thành công

    // Điều kiện rà soát nếu tổng số buổi tập vượt ngưỡng 15 buổi theo đề bài yêu cầu
    if (totalSessions > 15) {
      // Sử dụng hàm hẹn giờ thiết lập độ trễ siêu nhỏ (100ms) giúp trình duyệt có thời gian vẽ (render) dòng mới lên bảng giao diện xong xuôi rồi mới nổ hộp thoại thông báo chặn màn hình
      setTimeout(() => {
        // Hiển thị hộp thoại cảnh báo ra màn hình người dùng
        alert("Cơ thể đang ở trạng thái xuất sắc");
      }, 100); // 100 miligiây độ trễ
    }

    // 6. Làm sạch toàn bộ các ô nhập liệu của form (reset về trạng thái trống ban đầu) chuẩn bị đón lượt nhập tiếp theo
    this.reset();
  });
}

/* 

1. function togglePass(): Hàm tự định nghĩa dùng để thực thi đóng/mở ẩn hiện dữ liệu ô mật khẩu.
2. document.getElementById(): Phương thức cốt lõi giúp JS tìm và truy cập vào một phần tử HTML cụ thể thông qua ID của nó.
3. addEventListener('submit', ...): Lắng nghe hành vi bấm nút gửi form của người dùng để kích hoạt khối lệnh xử lý.
4. e.preventDefault(): Phương thức vô hiệu hóa cơ chế nạp lại trang mặc định, giữ cho ứng dụng chạy mượt mà không mất dữ liệu bảng.
5. value.trim(): Thuộc tính lấy văn bản trong ô nhập và hàm cắt bỏ các khoảng cách phím cách trống dư thừa ở đầu và cuối chuỗi chữ.
6. document.createElement('tr'): Tạo lập một thẻ hàng bảng HTML mới hoàn toàn bằng lệnh script.
7. innerHTML: Thuộc tính cho phép đọc hoặc ghi đè nội dung cấu trúc HTML vào bên trong một phần tử.
8. slice(-1): Hàm cắt chuỗi lấy phần tử từ vị trí đếm ngược (lấy ký tự cuối cùng).
9. parseInt(..., 10): Hàm ép kiểu dữ liệu từ chuỗi chữ sang định dạng số nguyên (hệ thập phân cơ số 10).
10. isNaN(): Hàm kiểm tra xem một giá trị có phải là 'Không phải là số' (Not a Number) hay không.
11. Toán tử % 2 !== 0: Phép toán chia lấy số dư cho 2, nếu số dư khác số 0 thì kết luận số đó là SỐ LẺ.
12. prepend() và append(): Hai phương thức chèn phần tử (prepend: đẩy lên vị trí đầu tiên, append: gắn xuống vị trí cuối cùng).
13. totalSessions++: Phép toán tăng giá trị của biến đếm lên thêm 1 đơn vị (Toán tử tăng dần).
14. Con số '15': Ngưỡng mốc số buổi tập quy định trong đề bài để kích hoạt thông báo khen thưởng trạng thái cơ thể.
15. setTimeout(..., 100): Hàm hẹn giờ bất đồng bộ, trì hoãn chạy một khối lệnh sau một khoảng thời gian tính bằng miligiây (100ms = 0.1 giây).
==========================================================================================
*/
