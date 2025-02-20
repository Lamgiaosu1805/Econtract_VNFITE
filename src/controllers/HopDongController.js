const fs = require("fs-extra");
const path = require("path");
const puppeteer = require("puppeteer");
const nodemailer = require("nodemailer");

const HopDongController = {
    testKyHopDong: async (req, res) => {
        const {body} = req
        try {
            const now = new Date();
            const day = String(now.getDate()).padStart(2, "0");
            const month = String(now.getMonth() + 1).padStart(2, "0"); // Tháng bắt đầu từ 0
            const year = now.getFullYear();
            const hours = String(now.getHours()).padStart(2, "0");
            const minutes = String(now.getMinutes()).padStart(2, "0");
            const recipientEmail = body.mail;

            const inputHtmlPath = path.join(__dirname, "../../Hợp-đồng-TIKLUY-ONLINE-_1__1.html"); // Đường dẫn file HTML gốc
            const outputPdfPath = path.join(__dirname, "../../output.pdf");
    
            // Đọc nội dung HTML
            let htmlContent = await fs.readFile(inputHtmlPath, "utf-8");
    
            htmlContent = htmlContent
            .replace(/{fullname}/g, body.fullname)
            .replace(/{soHopDong}/g, "03/2025/HĐHTKD-VNFC/E")
            .replace(/{dd}/g, day)
            .replace(/{mo}/g, month)
            .replace(/{yyyy}/g, year)
            .replace(/{cccd}/g, body.cccd)
            .replace(/{hoKhauThuongTru}/g, body.hoKhauThuongTru)
            .replace(/{diaChiHienTai}/g, body.diaChiHienTai)
            .replace(/{sdt}/g, body.sdt)
            .replace(/{hh}/g, hours)
            .replace(/{mi}/g, minutes)
    
            // Dùng Puppeteer để chuyển HTML thành PDF
            const browser = await puppeteer.launch();
            const page = await browser.newPage();
            await page.setContent(htmlContent, { waitUntil: "domcontentloaded" });
            await page.pdf({ path: outputPdfPath, format: "A4", printBackground: true });
            await browser.close();
            
            await sendEmailWithAttachment(recipientEmail, outputPdfPath);

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

async function sendEmailWithAttachment(toEmail, pdfPath) {
    let transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: process.env.MAIL,
            pass: process.env.USER_PASS
        }
    });

    let mailOptions = {
        from: '"Công ty VNIFTE - VNFITE CAPITAL"<thunderbrucelee@gmail.com>',
        to: toEmail,
        subject: "Hợp đồng hợp tác kinh doanh",
        text: "Gửi bạn hợp đồng hợp tác kinh doanh đính kèm.",
        attachments: [
            {
                filename: "HopDongHTKD.pdf",
                path: pdfPath
            }
        ]
    };

    await transporter.sendMail(mailOptions);
    console.log(`📧 Email đã được gửi đến ${toEmail}`);
}

module.exports = HopDongController;
