function isURL(str) {
    // Biểu thức chính quy kiểm tra chuỗi có khớp với định dạng URL không
    var urlPattern = /^(http?|https?|ftp):\/\/[^\s/$.?#].[^\s]*$/i;
    return urlPattern.test(str);
  }
  
  // Sử dụng hàm isURL để kiểm tra chuỗi
  var input = "http://sadasd";
  if (isURL(input)) {
    console.log("Đây là một URL hợp lệ.");
  } else {
    console.log("Đây không phải là một URL hợp lệ.");
  }