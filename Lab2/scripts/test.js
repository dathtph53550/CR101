// 1. Tạo hàm XepLoai bằng hàm mũi tên
const XepLoai = (tongKet) => {
    if (tongKet >= 9) return 'Xuat sac';
    if (tongKet >= 8) return 'Gioi';
    if (tongKet >= 6.5) return 'Kha';
    if (tongKet >= 5) return 'Trung binh';
    return 'Yeu';
};

// 2. Khai báo mảng danh sách sinh viên và tính xếp loại
let danhSachSv = [
    { msv: 'Ph12345', hoten: 'Nguyen Anh Duc', tongKet: 5.5 },
    { msv: 'Ph33456', hoten: 'Do Minh Chi', tongKet: 6.5 },
    { msv: 'Ph125325', hoten: 'Pham Tu Tai', tongKet: 8.5 },
    { msv: 'Ph1234532', hoten: 'Tran Dinh Dung', tongKet: 7.5 },
    { msv: 'Ph1234522', hoten: 'Nguyen Van Nam', tongKet: 9.5 },
];

// Cập nhật `xepLoai` cho từng sinh viên
danhSachSv.forEach((sv) => {
    sv.xepLoai = XepLoai(sv.tongKet);
});