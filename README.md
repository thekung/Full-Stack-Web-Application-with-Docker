# Full Stack Web Application with Docker
> Note: เอกสารประกอบการ Training \
> ขั้นตอนการทำ LAB เป็นไปตามเอกสารคู่มือในชั้นเรียน
>

> เอกสารอ้างอิงคู่มือ LAB: `Full Stack Web Application with Docker.pdf` \
> เป็นขั้นตอนการทำ LAB โดยละเอียด ผู้สอนเผยแพร่ในห้องเรียน

## เป้าหมาย
ได้เรียนรู้การใช้งาน Docker และเข้าใจการทำงานของ Container รวมถึงเข้าใจวิธีการทำงานของ Web Application ซึ่งในการเรียนรู้การใช้งาน Docker Container ที่ดีที่สุดเราควรเรียนรู้จากการสร้างงานขึ้นมาสักชิ้นเพื่อให้เห็นถึงกระบวนการและขั้นตอนการทำงานของสิ่งที่เราจะเรียนรู้ ตัวอย่างนี้เป็นตัวอย่างการพัฒนา Web Application ขึ้นมาหนึ่งตัวโดยเลือกใช้เครื่องมือในการพัฒนาดังนี้ ซึ่งในแต่ละส่วนจะทำงานอยู่บน Container

| Section | Tools |
| -------- | ------- |
| Database | MySQL |
| Backend | NodeJS, Express, MySQL2 |
| Frontend | React |
| Database Management | phpMyAdmin |

## สิ่งที่ต้องจัดเตรียม
- ติดตั้ง Docker ให้เรียบร้อย จะเลือกใช้ Docker Desktop หรือติดตั้งใน Linux ผ่านทาง Command line ก็ได้
- ติดตั้ง NodeJS

## แนวคิดสำหรับการพัฒนานี้
ในการเรียนรู้สำหรับการพัฒนานี้เราจะแบ่งการทำงานออกเป็น สามส่วนหลักก็คือ
- Database เราเลือกใช้งานเป็นฐานข้อมูล MySQL และเลือกเวอร์ชันที่จะใช้งานเป็น MySQL 8.0.39 เราไม่เลือกเวอร์ชันล่าสุดเพราะเราจะได้หัดใช้คำสั่งสำหรับการนำ Image ของ Docker มาใช้งานแบบระบุเวอร์ชัน
- Database Management เครื่องมือที่จะใช้จัดการฐานข้อมูลจะเลือกใช้เป็น phpMyAdmin ซึ่งเป็น GUI Tool ที่ง่ายและสะดวกต่อการใช้งานฐานข้อมูล MySQL ในส่วนนี้เราจะไม่ใช้งานก็ได้เพราะสามารถใช้คำสั่งผ่านทาง Command line เพื่อนำเข้าฐานข้อมูลและจัดการข้อมูลได้เช่นกัน
- Backend API เราเลือกพัฒนาด้วย NodeJS และ Express framework พร้อมทั้งตัวช่วยในการเชื่อมค่อฐานข้อมูลด้วย MySQL2
- Frontend เลือกพัฒนาด้วย React Framework ส่วนของการพัฒนาจะเขียนโต้ดที่เครื่องเราเองพร้อมทั้ง Build และนำเฉพาะ Production code ขึ้นทำงานใน Container จะไม่เลือกใช้วิธีเอาโค้ดใส่ไปใน Container เพื่อให้ได้เรียนรู้การ Build Code สำหรับ Production

## คำสั่งในการทำ LAB นี้
> คำอธิบายและขั้นตอนการทำ LAB โดยละเอียดอ้างอิงได้จากเอกสารประกอบการเรียนรู้ที่แจกในห้องเรียน หาก Copy คำสั่งจากเอกสาร PDF ไม่ได้ให้อ้างอิงคำสั่งจากใน GitHub นี้แทน ส่วนคำสั่งอื่นที่ไม่ได้ยาวมากให้ผู้เรียนฝึกพิมพ์เพื่อการจดจำและเข้าใจ

สร้าง Docker Network สำหรับการสื่อสารระหว่าง Container ที่จะใช้งานใน Application ในที่นี้เราจะใช้ชื่อ  `backend-network`
```bash
docker network create backend-network
```
Pull เอา Image ที่จำเป็นต้องใช้ลงมาเพื่อใช้งาน
```bash
docker pull mysql:8.0.39
docker pull phpmyadmin
```
Start container ของฐานข้อมูล
```bash
docker run --name mysql-server --network backend-network -v /tutor/mysqldata:/var/lib/mysql -p 3307:3306 -e MYSQL_ROOT_PASSWORD=1234 -d mysql:8.0.39 --character-set-server=utf8mb4 --collation-server=utf8mb4_unicode_ci
```
Start container ของ phpMyAdmin
```bash
docker run --name phpmyadmin-server --network backend-network -d --link mysql-server:db -p 8080:80 phpmyadmin
```
ในส่วนคำสั่งอื่นๆ ในการสร้าง Backend และ Frontend จะไม่ยาวมาก ให้ผู้เรียนหัดพิมพ์ตามจากเอกสารคู่มือ
