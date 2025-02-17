const express = require("express");
const fs = require("fs-extra");
const path = require("path");
const puppeteer = require("puppeteer");

const HopDongController = {
    testKyHopDong: async (req, res) => {
        try {
            const inputHtmlPath = path.join(__dirname, "../../FileHopDong.html"); // Đường dẫn file HTML gốc
            const outputPdfPath = path.join(__dirname, "../../output.pdf");
    
            // Đọc nội dung HTML
            let htmlContent = await fs.readFile(inputHtmlPath, "utf-8");
    
            // Thay thế biến {fullname} bằng "Nguyễn Văn A"
            htmlContent = htmlContent
            .replace(/{fullname}/g, "Nguyễn Văn A")
            .replace(/{soHopDong}/g, "VNC 01/2024")
            .replace(/{ngayKy}/g, "15")
            .replace(/{thangKy}/g, "02")
            .replace(/{namKy}/g, "2025")
            .replace(/{cccd}/g, "001099015069")
            .replace(/{hoKhauThuongTru}/g, "Khôn Thôn, Minh Cường, Thường Tín, Hà Nội")
            .replace(/{sdt}/g, "0379137857")
            .replace(/{gioKy}/g, "13")
            .replace(/{phutKy}/g, "40")
    
            // Dùng Puppeteer để chuyển HTML thành PDF
            const browser = await puppeteer.launch();
            const page = await browser.newPage();
            await page.setContent(htmlContent, { waitUntil: "domcontentloaded" });
            await page.pdf({ path: outputPdfPath, format: "A4", printBackground: true });
            await browser.close();
    
            // Gửi file PDF về client
            res.download(outputPdfPath, "hop-dong.pdf", () => {
                fs.unlinkSync(outputPdfPath); // Xoá file sau khi tải xong
            });
    
        } catch (error) {
            console.error("❌ Lỗi khi xử lý file:", error);
            res.status(500).send("Lỗi khi tạo PDF");
        }
    }
}

module.exports = HopDongController;
